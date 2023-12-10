import base64
from dotenv import load_dotenv
import sys
import os
from os import listdir
from os.path import isfile, join
import cv2
import shutil
import numpy as np
import uuid
from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, join_room
from flask_cors import CORS
import mysql.connector
from mysql.connector import errorcode
from PIL import Image, ImageDraw, ImageFont
from collections import Counter
import numpy as np

os.chdir(os.path.dirname(os.path.abspath(__file__)))

TEMP_IMAGE_DIR = "temp_images"

# .env 파일 불러오기
load_dotenv()

user = os.getenv('user')
password = os.getenv('password')
host = os.getenv('host')
database_name = os.getenv('database_name')
korean_font_path = os.getenv('korean_font_path')

# ------------------------ ------- Database 유저 세팅 ------- ------------------------

# root계정 연결 -> flask 전용 유저 생성 및 연결

try:
    # MySQL 서버에 연결
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password,  # 여기에 MySQL root 계정의 비밀번호를 입력하세요.
        database= database_name
    )
    print(f"{database_name} CONNECT 성공!")

    cursor = conn.cursor()

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("이름 또는 비밀번호가 잘못되었습니다.")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("데이터베이스가 존재하지 않습니다.")
    else:
        print("연결에 실패하였습니다: {}".format(err))

# ------------------------ ------- 얼굴 인식 ------- ------------------------
# 얼굴 인식 모델
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
# 검색 결과 처리
users_models = []
# 유저별 face_detected_count 딕셔너리 초기화    
user_counts = {}
# 전역 변수로 클라이언트별 얼굴 인식 횟수를 저장하는 딕셔너리
client_face_counts = {}



def createFolder(directory):
    try:
        if not os.path.exists(directory):
            os.makedirs(directory)
    except OSError: 
        print ('Error: Creating directory. ' + directory)

def base64_to_image(base64_string):
    """
    The base64_to_image function accepts a base64 encoded string and returns an image.
    The function extracts the base64 binary data from the input string, decodes it, converts 
    the bytes to numpy array, and then decodes the numpy array as an image using OpenCV.
    
    :param base64_string: Pass the base64 encoded image string to the function
    :return: An image
    """
    base64_data = base64_string.split(",")[1]
    image_bytes = base64.b64decode(base64_data)
    image_array = np.frombuffer(image_bytes, dtype=np.uint8)
    image = cv2.imdecode(image_array, cv2.IMREAD_COLOR)
    return image

def face_detector(img, size = 0.5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray,1.3,5,minSize=(210,210)) #얼굴 최소 크기. 이것보다 작으면 무시

    if faces is():
        return img,[]

    for(x,y,w,h) in faces:
        cv2.rectangle(img, (x,y),(x+w,y+h),(0,255,255),2)
        roi = img[y:y+h, x:x+w]
        roi = cv2.resize(roi, (200,200))

    return img,roi

def recognize_face_in_image(image):
    """
    Recognizes a face in the given image using the users_models list.
    Returns the user ID, name, and confidence of the most recognized user.
    """
    highest_confidence = 0
    recognized_user_id = None
    recognized_user_name = ""

    for user_id, user_name, model in users_models:
        result = model.predict(image)
        confidence = int(100 * (1 - (result[1]) / 300))
        if confidence > highest_confidence:
            highest_confidence = confidence
            recognized_user_id = user_id
            recognized_user_name = user_name

    return recognized_user_id, recognized_user_name, highest_confidence

def load_user_models(cursor):
    """
    Load user models from the database and add them to the global users_models list.
    :param cursor: Database cursor to execute the query
    """
    global users_models

    try:
        # 모든 사용자의 모델 데이터와 이름 검색
        fetch_models_query = "SELECT user_id, user_name, user_face_model FROM User"
        cursor.execute(fetch_models_query)

        # 검색 결과 처리
        for (user_id, user_name, model_data) in cursor.fetchall():
            # 이미 리스트에 모델이 있는지 확인
            if any(user_id == loaded_id for loaded_id, _, _ in users_models):
                continue  # 이미 로드된 모델이면 건너뛰기
            
            temp_model_path = f"temp_model_{user_id}.yml"
            with open(temp_model_path, "wb") as file:
                file.write(model_data)

            # 모델 로드
            model = cv2.face.LBPHFaceRecognizer_create()
            model.read(temp_model_path)

            # 모델과 사용자 이름을 튜플로 묶어 리스트에 추가
            users_models.append((user_id, user_name, model))

            # 로드된 임시 파일 삭제
            os.remove(temp_model_path)

        # 사용자 모델 로드 확인
        for user_id, user_name, model in users_models:
            print(f"Model for {user_name} (ID: {user_id}) loaded.")
        return True

    except Exception as e:
        print(f"An error occurred while loading user models: {e}")
        return False

    
createFolder('./temp')

# ------------------------ ------- Flask서버 셋팅 ------- ------------------------

app = Flask(__name__)
CORS(app)

socketio = SocketIO(app, cors_allowed_origins="*")

def is_valid_phone_number(phone_number):
    # 전화번호 유효성 검사 로직 구현 (여기서는 간단한 형식 체크만 하겠습니다)
    import re
    pattern = re.compile(r'^01([0|1|6|7|8|9]?)-?([0-9]{4})-?([0-9]{4})$')
    return pattern.match(phone_number)

def putTextWithKorean(image, text, position, font_path, font_size, color):
    image_pil = Image.fromarray(image)
    draw = ImageDraw.Draw(image_pil)
    font = ImageFont.truetype(font_path, font_size)
    draw.text(position, text, font=font, fill=color)
    return np.array(image_pil)

@socketio.on("connect")
def handle_connect():
    client_id = request.args.get('client_id')
    join_room(client_id)
    print(f"Client {client_id} connected.")


@socketio.on("image")
def receive_image(image):
    # Decode the base64-encoded image data
    face = cv2.flip(base64_to_image(image), 1)
    image, face = face_detector(face)
    try:

        # 초기화: 가장 높은 예측값을 찾기 위한 변수들
        highest_confidence = 0
        recognized_user_name = ""

        # users_models 리스트를 순회하며 얼굴 인식 시도
        for _, user_name, model in users_models:
            result = model.predict(face)
            confidence = int(100 * (1 - (result[1]) / 300))

            # 가장 높은 예측값 찾기
            if confidence > highest_confidence:
                highest_confidence = confidence
                recognized_user_name = user_name

        # 가장 높은 예측값을 가진 사용자의 정보 표시
        if highest_confidence > 75:
            image = putTextWithKorean(image, f"Unlocked: {recognized_user_name} / {highest_confidence}", (75, 200), korean_font_path, 20, (0, 255, 0))
        else:
            image = putTextWithKorean(image, "Locked", (75, 200), korean_font_path, 20, (0, 0, 255))

    except:
        image = putTextWithKorean(image, "Face Not Found", (75, 200), korean_font_path, 20, (255, 0, 0))

    # 이미지 처리 및 송출
    frame_resized = cv2.resize(image, (640, 360))
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
    result, frame_encoded = cv2.imencode(".jpg", frame_resized, encode_param)
    processed_img_data = base64.b64encode(frame_encoded).decode()
    b64_src = "data:image/jpg;base64,"
    processed_img_data = b64_src + processed_img_data
    emit("processed_image", processed_img_data)

@socketio.on('upload_image')
def handle_image_upload(client_id, data):
    image_data = data['image']
    
    # 유저가 처음 데이터를 보내는 경우, 딕셔너리에 초기값 0 설정
    if client_id not in client_face_counts:
        client_face_counts[client_id] = 0

    face = base64_to_image(image_data)
    image, face = face_detector(face)
    try:
        if len(face) > 0:
            face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)

            recognized_user_id, recognized_user_name, highest_confidence = recognize_face_in_image(face)
            
            if highest_confidence > 75:
                # 30장의 사진이 모였는지 확인
                if client_face_counts[client_id] >= 30:
                    # 이미지가 30장 미만이면 함수를 종료합니다.
                    if not is_30_images_collected(client_id):
                        return
                    
                    emit("stop_sending", {"message": "30 face images have been saved"}, room=client_id)
                    
                    # 예측값 집계
                    most_common_user_id, most_common_user_name = determine_most_recognized_user(client_id)
                    
                    # 클라이언트에 결과 반환
                    emit('user_recognized', {
                                                'predicted_user_name': most_common_user_name, 
                                                'predicted_user_id':most_common_user_id
                                            }, room=client_id)
                    print(f">>> most_common_user : {most_common_user_name}")

                    # 임시 저장소 정리
                    clear_temp_storage(client_id)
                else:
                    image = putTextWithKorean(image, f"Unlocked: {recognized_user_name} / {highest_confidence}", (75, 200), korean_font_path, 20, (0, 255, 0))
                    # 얼굴 인식 횟수 증가 및 임시 이미지 저장
                    client_face_counts[client_id] += 1
                    emit("send_success", {"message": f"{client_face_counts[client_id]}send_success"}, room=client_id)
                    save_temp_image(client_id, face, recognized_user_id, recognized_user_name)
                    print("!", end="")
                    sys.stdout.flush()  # 수동으로 flush   
            else:
                image = putTextWithKorean(image, "Locked", (75, 200), korean_font_path, 20, (0, 0, 255))
        else:
            image = putTextWithKorean(image, "Face Not Found", (75, 200), korean_font_path, 20, (255, 0, 0))
        
        # 이미지 처리 및 송출
        frame_resized = cv2.resize(image, (640, 360))
        encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
        _, frame_encoded = cv2.imencode(".jpg", frame_resized, encode_param)
        processed_img_data = base64.b64encode(frame_encoded).decode()
        b64_src = "data:image/jpg;base64,"
        processed_img_data = b64_src + processed_img_data
        emit("image_processed", processed_img_data, room=client_id)
            
    except Exception as e:
        print(f"Error: {e}")

@socketio.on('load_model_request')
def handle_load_model_request():
    success = load_user_models(cursor)
    if success:
        socketio.emit('model_loaded', {'status': 'complete'})

def determine_most_recognized_user(client_id):
    client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
    user_predictions = Counter()

    if os.path.exists(client_dir):
        for filename in os.listdir(client_dir):
            # 파일 이름에서 인식된 사용자 ID와 이름 추출
            parts = filename.split('_')
            recognized_user_id = parts[0]
            recognized_user_name = parts[1]

            user_predictions[(recognized_user_id, recognized_user_name)] += 1

    # 가장 많이 예측된 사용자의 ID와 이름 찾기
    if user_predictions:
        (most_common_user_id, most_common_user_name), _ = user_predictions.most_common(1)[0]
        return most_common_user_id, most_common_user_name
    else:
        return None, None  # 예측된 사용자가 없는 경우

def create_user_temp_dir(client_id):
    client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
    if not os.path.exists(client_dir):
        os.makedirs(client_dir)

def save_temp_image(client_id, image, recognized_user_id, recognized_user_name):
    create_user_temp_dir(client_id)
    client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
    image_count = len(os.listdir(client_dir))
    filename = f"{recognized_user_id}_{recognized_user_name}_{image_count + 1}.jpg"
    cv2.imwrite(os.path.join(client_dir, filename), image)

def is_30_images_collected(client_id):
    client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
    return len(os.listdir(client_dir)) >= 30

def clear_temp_storage(client_id):
    client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
    if os.path.exists(client_dir):
        for file in os.listdir(client_dir):
            os.remove(os.path.join(client_dir, file))
        os.rmdir(client_dir)

def load_temp_images(client_id):
    client_dir = os.path.join(TEMP_IMAGE_DIR, client_id)
    images = []
    if os.path.exists(client_dir):
        for file in sorted(os.listdir(client_dir)):
            img_path = os.path.join(client_dir, file)
            img = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
            images.append(img)
    return images

@socketio.on("data_for_storage")
def receive_data(client_id,data):
    image = data.get("image")
    phone_number = data.get("phoneNumber")
    name = data.get("name")

    if phone_number not in user_counts:
        user_counts[phone_number] = 0

    # global face_detected_count
    try:
        # Decode the base64-encoded image data
        face = base64_to_image(image)
        image, roi = face_detector(face)  # roi는 사용하지 않으므로 무시합니다.
        if len(roi) > 0: #얼굴이 1개 이상 검출 시,
            # Face detected, increment the count
            # face_detected_count 증가
            user_counts[phone_number] += 1
            if user_counts[phone_number] <= 100:
                print(str(user_counts[phone_number]) +" / "+name +" / "+ phone_number +" / "+ client_id)
                # Optionally, emit the processed image with face boxes back to the client
                _, buffer = cv2.imencode('.jpg', image)
                processed_image = base64.b64encode(buffer).decode('utf-8')
                emit("processed_image", f"data:image/jpeg;base64,{processed_image}", room=client_id)
                # Save the image to the server
                createFolder(f'./temp/{phone_number}')
                cv2.imwrite(f'./temp/{phone_number}/{user_counts[phone_number]}.jpg', roi)
                # Optionally, emit a message indicating a successful save
                # emit("image_saved", {"count": face_detected_count})
            else:
                # If 100 images have been saved, you can emit a message to stop sending images
                emit("stop_sending", {"message": "100 face images have been saved"}, room=client_id)

                # 모델 100장 학습 시키고
                data_path = f'./temp/{phone_number}/'
                onlyfiles = [f for f in listdir(data_path) if isfile(join(data_path,f))]

                Training_Data, Labels = [], []

                for i, files in enumerate(onlyfiles):
                    image_path = data_path + onlyfiles[i]
                    images = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                    Training_Data.append(np.asarray(images, dtype=np.uint8))
                    Labels.append(i)
                try:
                    Labels = np.asarray(Labels, dtype=np.int32)
                    model = cv2.face.LBPHFaceRecognizer_create()
                    model.train(np.asarray(Training_Data), np.asarray(Labels))
                    # 모델 저장
                    model.save(f'./temp/{phone_number}/trained_model_{phone_number}.yml')
                    print(f"{phone_number}'s Model Training Complete!!!!!")

                    # 전달받은 유저 아이디에 매핑되게 디비에 저장
                    # 모델 파일을 이진 형식으로 읽기
                    with open(f'./temp/{phone_number}/trained_model_{phone_number}.yml', 'rb') as file:
                        model_data = file.read()
                    
                    userId = str(uuid.uuid4())
                    # 데이터베이스에 사용자 정보와 모델 데이터 저장
                    insert_user_query = "INSERT INTO User (user_id, user_name, phoneNumber, user_face_model) VALUES (%s, %s, %s, %s)"
                    cursor.execute(insert_user_query, (userId, name, phone_number, model_data))
                    conn.commit()

                    # 성공한 경우
                    print(f"> User {name} with phone number {phone_number} has been successfully registered.")
                    emit("registration_result", {"status": "success",
                                                "message": "registered successfully",
                                                "user_id": f"{userId}",
                                                "name": f"{name}",
                                                "phone_number": f"{phone_number}"}, room=client_id)
                except Exception as e:
                    # 실패한 경우
                    print(f"> An error occurred during user registration: {e}")
                    emit("registration_result", {"status": "failed",
                                 "error": str(e)}, room=client_id)
                    
                # 경로에 있는 이미지와 경로 삭제
                temp_path = f'./temp/{phone_number}'
                shutil.rmtree(temp_path)
                print(f"Images and directory {temp_path} have been deleted")
                # 등록완료!
                
        else:
            # No face detected, optionally emit a message indicating failure to detect a face
            emit("face_not_detected", {"message": "No face detected in the image"}, room=client_id)
    except Exception as e:
        print(f"An error occurred: {e}")

@app.route('/register', methods=['POST'])
def register_user():    
    data = request.get_json()
    name = data.get('name')
    phone_number = data.get('phoneNumber')

    print("> name : " + name)
    print("> phone_number : " + phone_number)

    # 전화번호 중복 체크
    query = "SELECT * FROM `User` WHERE `phoneNumber` = %s"
    cursor.execute(query, (phone_number,))
    result = cursor.fetchone()

    if result:
        return {"error": "Phone number already registered"}, 400

    # Your code to add the new user to the database goes here
    # ...

    # 유효성 검사 (예: 전화번호 형식 검사)
    if not is_valid_phone_number(phone_number):
        # 유효하지 않은 전화번호 형식이면 실패 응답을 보냅니다.
        return {"error": "Invalid phone number"}, 400

    # 성공 응답을 보냅니다.
    return jsonify({'status': 'success', 'name': name, 'phoneNumber': phone_number})


@app.route('/alternative', methods=['POST'])
def alternative_rec():
    data = request.get_json()
    phone_number = data.get('phoneNumber')

    print("alternative > phone_number : " + phone_number)
    
    if not is_valid_phone_number(phone_number):
        # 유효하지 않은 전화번호 형식이면 실패 응답을 보냅니다.
        return {"error": "유효하지 않은 전화번호 형식"}, 400

    # 전화번호 체크
    query = "SELECT * FROM `User` WHERE `phoneNumber` = %s"
    cursor.execute(query, (phone_number,))
    result = cursor.fetchone()

    if result:
        # result 튜플에서 필요한 값을 인덱스로 접근
        user_id = result[0]  # user_id는 첫 번째 열
        user_name = result[1]  # user_name은 두 번째 열
        return jsonify({'status': 'success', 'user_id': user_id, 'user_name': user_name})
    else:
        # 전화번호가 데이터베이스에 없는 경우 오류 메시지를 반환합니다.
        return {"error": "존재하지 않는 전화번호입니다. 다시 입력해주세요."}, 400


if __name__ == "__main__":
    try:
        socketio.run(app, debug=False, port=5001, host='0.0.0.0')
    except Exception as e:  # Catch all exceptions
        print(f"An error occurred: {e}")


