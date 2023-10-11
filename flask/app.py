import base64
import os
from os import listdir
from os.path import isfile, join
import cv2
import numpy as np
from flask import Flask, render_template, send_from_directory
from flask_socketio import SocketIO, emit

os.chdir(os.path.dirname(os.path.abspath(__file__)))
face_classifier = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
data_path = './faces/'
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

print("Model Training Complete!!!!!")

app = Flask(__name__, static_folder="./templates/static")
app.config["SECRET_KEY"] = "secret!"
socketio = SocketIO(app)

def face_detector(img, size = 0.5):
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_classifier.detectMultiScale(gray,1.3,5,minSize=(20,20)) #얼굴 최소 크기. 이것보다 작으면 무시

    if faces is():
        return img,[]

    for(x,y,w,h) in faces:
        cv2.rectangle(img, (x,y),(x+w,y+h),(0,255,255),2)
        roi = img[y:y+h, x:x+w]
        roi = cv2.resize(roi, (200,200))

    return img,roi

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


@socketio.on("connect")
def test_connect():
    """
    The test_connect function is used to test the connection between the client and server.
    It sends a message to the client letting it know that it has successfully connected.
    
    :return: A 'connected' string
    """
    print("Connected")
    emit("my response", {"data": "Connected"})




@socketio.on("image")
def receive_image(image):
    """
    The receive_image function takes in an image from the webcam, converts it to grayscale, and then emits
    the processed image back to the client.


    :param image: Pass the image data to the receive_image function
    :return: The image that was received from the client
    """
    # Decode the base64-encoded image data
    face = base64_to_image(image)
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


@app.route("/")
def index():
    """
    The index function returns the index.html template, which is a landing page for users.
    
    :return: The index
    """
    return render_template("index.html")


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5001, host='0.0.0.0', certfile="./cert.pem", keyfile="./key.pem")
