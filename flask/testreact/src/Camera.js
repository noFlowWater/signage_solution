import React, { useEffect, useRef, useState } from 'react';
import { SERVER_URL } from './constants';
import io from 'socket.io-client';
import './Camera.css';

const Camera = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [photoSrc, setPhotoSrc] = useState('');

  useEffect(() => {
    // 소켓 연결 설정
    const newSocket = io(SERVER_URL, {
      transports: ['websocket'],
      secure: false,
      rejectUnauthorized: false
    });
    setSocket(newSocket);

    // 비디오 스트림 설정
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          console.log("<<<< 웹캠 스트림 설정 완료 >>>>")
        })
        .catch((error) => {
          console.error('Error accessing the camera:', error);
        });
    } else {
      console.error('getUserMedia is not supported in this browser.');
    }

    // 소켓 이벤트 핸들러
    newSocket.on('connect', () => {
      console.log('Connected...!', newSocket.connected);
    });

    newSocket.on('processed_image', (image) => {
      setPhotoSrc(image);
    });

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    const FPS = 10;
    const interval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d');
        const width = videoRef.current.videoWidth;
        const height = videoRef.current.videoHeight;

        canvasRef.current.width = width;
        canvasRef.current.height = height;
        context.drawImage(videoRef.current, 0, 0, width, height);
        const data = canvasRef.current.toDataURL('image/jpeg', 0.5);
        context.clearRect(0, 0, width, height);
        socket.emit('image', data);
      }
    }, 1000 / FPS);

    return () => clearInterval(interval);
  }, [socket]);

  return (
    <div id="container">
      <video ref={videoRef} autoPlay playsInline width="400" height="300" style={{ transform: 'rotateY(180deg)' }}></video>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
      <div className='video'>
        <img id="photo" src={photoSrc} width="400" height="300" alt="Processed" />
      </div>
    </div>
  );
};

export default Camera;
