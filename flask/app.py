import base64
import os
from os import listdir
from os.path import isfile, join
import cv2
import shutil
import numpy as np
from flask import Flask, render_template, send_from_directory,request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS
import mysql.connector
from mysql.connector import errorcode
os.chdir(os.path.dirname(os.path.abspath(__file__)))


user = "root"
password = "8246"
host = "localhost"
database_name = "FLASK_BASIC"
flask_user = "flask_user"
flask_password = "8246"
sql_file_path = "./db.sql"

# ------------------------ ------- Database 유저 세팅 ------- ------------------------

# root계정 연결 -> flask 전용 유저 생성 및 연결

try:
    # MySQL 서버에 연결
    conn = mysql.connector.connect(
        host=host,
        user=user,
        password=password,  # 여기에 MySQL root 계정의 비밀번호를 입력하세요.
    )
    print("root 유저 연결 성공!")

    cursor = conn.cursor()
    cursor.execute("SHOW DATABASES")
    databases = [db[0] for db in cursor]

    if database_name in databases:
        print(f"{database_name} 데이터베이스가 이미 존재합니다.")
    else:
        cursor.execute(f"CREATE DATABASE {database_name}")
        print(f"{database_name} 데이터베이스를 생성하였습니다.")

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("이름 또는 비밀번호가 잘못되었습니다.")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("데이터베이스가 존재하지 않습니다.")
    else:
        print("연결에 실패하였습니다: {}".format(err))

try:
    cursor.execute(f"CREATE USER '{flask_user}'@'localhost' IDENTIFIED BY '{flask_password}'")
    print(f"새로운 사용자 {flask_user}를 생성하였습니다.")
    
    # 권한 부여
    try:
        cursor.execute(f"GRANT ALL PRIVILEGES ON {database_name}.* TO '{flask_user}'@'localhost'")
        print(f"{flask_user}에게 {database_name}의 모든 권한을 부여하였습니다.")
    except mysql.connector.Error as err:
        print("권한 부여 에러: {}".format(err))

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_CANNOT_USER:
        print(f"사용자 {flask_user}가 이미 존재합니다.")
    else:
        print("사용자 생성 에러: {}".format(err))
finally:
    try:
        # 연결 종료
        conn.close()
        print("root 유저 연결 종료되었습니다.")
    except mysql.connector.Error as err:
        print(f"연결 종료 중 에러 발생: {err}")

try:
    # MySQL 서버에 연결
    conn = mysql.connector.connect(
        host=host,
        user=flask_user,
        password=flask_password,
        database=database_name,
    )
    print(f"{flask_user} 연결 성공!")

    cursor = conn.cursor()

except mysql.connector.Error as err:
    if err.errno == errorcode.ER_ACCESS_DENIED_ERROR:
        print("이름 또는 비밀번호가 잘못되었습니다.")
    elif err.errno == errorcode.ER_BAD_DB_ERROR:
        print("데이터베이스가 존재하지 않습니다.")
    else:
        print("연결에 실패하였습니다: {}".format(err))
# ------------------------ ------- Database SQL생성 ------- ------------------------

def delete_all_tables_with_fk(cursor, conn):
    """
    외래 키 제약 조건을 비활성화하고 데이터베이스의 모든 테이블을 삭제한 후,
    외래 키 제약 조건을 다시 활성화하는 함수.

    :param cursor: MySQL 데이터베이스에 대한 커서 객체
    :param conn: MySQL 데이터베이스 연결 객체
    """
    try:
        # 외래 키 제약 조건 비활성화
        cursor.execute("SET FOREIGN_KEY_CHECKS=0")
        print("\n> Foreign key checks disabled.\n")

        # 데이터베이스의 모든 테이블 이름 가져오기
        cursor.execute("SHOW TABLES")
        tables = [table[0] for table in cursor.fetchall()]

        # 각 테이블 삭제
        for table_name in tables:
            cursor.execute(f"DROP TABLE {table_name}")
            print(f"> Table {table_name} deleted.")

        # 외래 키 제약 조건 다시 활성화
        cursor.execute("SET FOREIGN_KEY_CHECKS=1")
        print("\n> Foreign key checks re-enabled.\n")

        # 변경사항 적용
        conn.commit()

    except mysql.connector.Error as err:
        print(f"Error: {err}")
        conn.rollback()

# # 모든 모든 테이블 삭제 명령.
delete_all_tables_with_fk(cursor, conn)

# SQL 파일 읽기
with open(sql_file_path, 'r') as file:
    sql_script = file.read()

# SQL 명령문을 개별적으로 분할
sql_commands = sql_script.split(';')

# 각 SQL 명령문 실행
for command in sql_commands:
    try:
        # 빈 명령문은 건너뛰기
        if not command.strip():
            continue

        cursor.execute(command)
        # 결과 처리
        if cursor.with_rows:
            print("> SELECT / SQL문 실행. : \n> statement : \n{}".format(command))
            print(cursor.fetchall())
        else:
            print("> UPDATE / SQL문 실행. \n> statement : \n{} \n> rowcount : {}".format(
                command, cursor.rowcount))
        print("> Statement executed successfully :) \n")
    except mysql.connector.Error as err:
        print("> Error executing statement :\n{}\n> 에러메시지 : {}".format(command, err))

# 변경사항 적용
conn.commit()

print(">> Database schema setting complete! :) ")

# ------------------------ ------- 얼굴 인식 ------- ------------------------
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
# ------------------------ ------- Flask서버 셋팅 ------- ------------------------

app = Flask(__name__, static_folder="./templates/static")
# CORS(app, origins=["http://172.20.10.11:3000","http://172.20.10.11:3001"])
CORS(app, origins=["http://localhost:3000","http://localhost:3001"])

socketio = SocketIO(app, cors_allowed_origins="*")

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

def is_valid_phone_number(phone_number):
    # 전화번호 유효성 검사 로직 구현 (여기서는 간단한 형식 체크만 하겠습니다)
    import re
    pattern = re.compile(r'^01([0|1|6|7|8|9]?)-?([0-9]{4})-?([0-9]{4})$')
    return pattern.match(phone_number)

@app.route("/favicon.ico")
def favicon():
    """
    The favicon function serves the favicon.ico file from the static directory.
    
    :return: A favicon
    """
    return send_from_directory(
        os.path.join(app.root_path, "static"),
        "favicon.ico",
        mimetype="image/vnd.microsoft.icon",
    )

@socketio.on("connect")
def test_connect():
    """
    The test_connect function is used to test the connection between the client and server.
    It sends a message to the client letting it know that it has successfully connected.
    
    :return: A 'connected' string
    """
    print("Connected")
    # emit("my response", {"data": "Connected"})
    global face_detected_count
    face_detected_count=0


@socketio.on("image")
def receive_image(image):
    """
    The receive_image function takes in an image from the webcam, converts it to grayscale, and then emits
    the processed image back to the client.


    :param image: Pass the image data to the receive_image function
    :return: The image that was received from the client
    """
    # Decode the base64-encoded image data
    face = cv2.flip(base64_to_image(image), 1)
    image, face = face_detector(face)
    try:
        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)
        result = model.predict(face)

        if result[1] < 500:
            confidence = int(100*(1-(result[1])/300))
            display_string = str(confidence)+'% Confidence it is user'
        cv2.putText(image,display_string,(75,75), cv2.FONT_HERSHEY_COMPLEX,0.5,(0,0,0),1)
        
        if confidence > 75:
            cv2.putText(image, "Unlocked", (75, 200), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 255, 0), 2)

        else:
            cv2.putText(image, "Locked", (75, 200), cv2.FONT_HERSHEY_COMPLEX, 0.5, (0, 0, 255), 2)
    except:
        cv2.putText(image, "Face Not Found", (75, 200), cv2.FONT_HERSHEY_COMPLEX, 0.5, (255, 0, 0), 2)
        pass

    frame_resized = cv2.resize(image, (640, 360))
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 90]
    result, frame_encoded = cv2.imencode(".jpg", frame_resized, encode_param)
    processed_img_data = base64.b64encode(frame_encoded).decode()
    b64_src = "data:image/jpg;base64,"
    processed_img_data = b64_src + processed_img_data
    emit("processed_image", processed_img_data)


createFolder('./temp')

@socketio.on("data_for_storage")
def receive_data(data):
    image = data.get("image")
    phone_number = data.get("phoneNumber")
    name = data.get("name")

    # 유저가 처음 데이터를 보내는 경우, 딕셔너리에 초기값 0 설정
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
                print(str(user_counts[phone_number]) + " + " + phone_number)
                # Optionally, emit the processed image with face boxes back to the client
                _, buffer = cv2.imencode('.jpg', image)
                processed_image = base64.b64encode(buffer).decode('utf-8')
                emit("processed_image", f"data:image/jpeg;base64,{processed_image}")
                # Save the image to the server
                createFolder(f'./temp/{phone_number}')
                cv2.imwrite(f'./temp/{phone_number}/{user_counts[phone_number]}.jpg', roi)
                # Optionally, emit a message indicating a successful save
                # emit("image_saved", {"count": face_detected_count})
            else:
                # If 100 images have been saved, you can emit a message to stop sending images
                emit("stop_sending", {"message": "100 face images have been saved"})

                # 모델 100장 학습 시키고
                data_path = f'./temp/{phone_number}/'
                onlyfiles = [f for f in listdir(data_path) if isfile(join(data_path,f))]

                Training_Data, Labels = [], []

                for i, files in enumerate(onlyfiles):
                    image_path = data_path + onlyfiles[i]
                    images = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)
                    Training_Data.append(np.asarray(images, dtype=np.uint8))
                    Labels.append(i)

                Labels = np.asarray(Labels, dtype=np.int32)

                model = cv2.face.LBPHFaceRecognizer_create()

                model.train(np.asarray(Training_Data), np.asarray(Labels))
                # 모델 저장
                model.save(f'./temp/{phone_number}/trained_model_{phone_number}.yml')

                print(f"{phone_number}'s Model Training Complete!!!!!")

                # . . .
                # 전달받은 유저 아이디에 매핑되게 디비에 저장.)
                try:
                    # 모델 파일을 이진 형식으로 읽기
                    with open(f'./temp/{phone_number}/trained_model_{phone_number}.yml', 'rb') as file:
                        model_data = file.read()

                    # 데이터베이스에 사용자 정보와 모델 데이터 저장
                    insert_user_query = "INSERT INTO User (user_id, user_name, phoneNumber, user_face_model) VALUES (UUID(), %s, %s, %s)"
                    cursor.execute(insert_user_query, (name, phone_number, model_data))
                    conn.commit()

                    print(f"User {name} with phone number {phone_number} has been successfully registered.")
                    emit("registration_success", {"message": f"User {name} registered successfully"})

                except Exception as e:
                    print(f"An error occurred during user registration: {e}")
                    emit("registration_failed", {"error": str(e)})

                # 경로에 있는 이미지와 경로 삭제
                temp_path = f'./temp/{phone_number}'
                shutil.rmtree(temp_path)
                print(f"Images and directory {temp_path} have been deleted")
                # 등록완료!
                
        else:
            # No face detected, optionally emit a message indicating failure to detect a face
            emit("face_not_detected", {"message": "No face detected in the image"})
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

@app.route("/")
def index():
    """
    The index function returns the index.html template, which is a landing page for users.
    
    :return: The index
    """
    return render_template("index.html")


if __name__ == "__main__":
    try:
        socketio.run(app, debug=False, port=5001, host='0.0.0.0')
    except Exception as e:  # Catch all exceptions
        print(f"An error occurred: {e}")


