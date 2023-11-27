import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { flask } from '../constants';
import { useLocation } from 'react-router-dom';

const WebcamStreamCapture = () => {
    
    const location = useLocation();
    const { name, phoneNumber } = location.state || {};
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [processedImage, setProcessedImage] = useState('');
    const [isCollectionComplete, setIsCollectionComplete] = useState(false);
    const [complete,setComplete] = useState(0);

    // 웹캠 스트림 설정
    useEffect(() => {
        const newSocket = io(flask, {
            transports: ['websocket'],
            secure: false,
            rejectUnauthorized: false
        });
        setSocket(newSocket)

        newSocket.on('processed_image', (image) => {
            setProcessedImage(image);
            console.log('!!!');
        });

        newSocket.on('stop_sending', () => {
            console.log("100 face images have been saved, stopping.");
            setIsCollectionComplete(true); // Indicate collection completion
            if (videoRef.current && videoRef.current.srcObject) {
                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                videoRef.current.srcObject = null;
            }
            if (socket) {
                socket.off('connect');
                socket.off('processed_image');
                socket.off('stop_sending');
                socket.close();
                setSocket(null); // Clear the socket state
            }
        });

        // 비디오 스트림 설정
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            if (videoRef.current && videoRef.current.srcObject == null) {
                videoRef.current.srcObject = stream;
                console.log("<<<< 웹캠 스트림 설정 완료 >>>>")
                setComplete(1);
                console.log("complete : ", complete)
            }
        })    
        .catch((error) => {
            console.error('Error accessing the media devices.', error);
        });


        // 소켓 이벤트 핸들러
        newSocket.on('connect', () => {
            console.log('Connected...!', newSocket.connected);
        });

        return () => {
            newSocket.close();
            // 스트림이 열려있으면 닫기
            if (videoRef.current && videoRef.current.srcObject) {

                const tracks = videoRef.current.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                console.log("스트림이 열려있으면 닫기")
            }
        }
    },[]);
    
    
    
    // 클라이언트의 캠화면 전송
    useEffect(() => {
        const FPS = 10;
        const interval = setInterval(() => {
            if (socket && videoRef.current && canvasRef.current) {
                const videoElement = videoRef.current;
                const canvasElement = canvasRef.current;
                const context = canvasElement.getContext('2d');
                
                const width = videoElement.videoWidth;
                const height = videoElement.videoHeight;

                canvasElement.width = width;
                canvasElement.height = height;
                context.drawImage(videoElement, 0, 0, width, height);
                const data = canvasElement.toDataURL('image/jpeg', 0.5);
                context.clearRect(0, 0, width, height);

                // 전화번호와 이미지 데이터를 함께 보내는 객체 생성
                const dataToSend = {
                    name: name,
                    phoneNumber: phoneNumber, // phoneNumber 변수는 이미 존재해야 함
                    image: data
                };

                // 서버로 데이터를 emit
                socket.emit('data_for_storage', dataToSend);
                console.log("Data sent...");
            }
        }, 1000 / FPS);

        return () => clearInterval(interval);
    }, [complete]);

    // useEffect(() => {
    //     const handleBeforeUnload = (e) => {
    //         e.preventDefault();
    //         e.returnValue = ''; 
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, []);


  return (
      <div id="container">
            {isCollectionComplete ? (
                    <div>Collection complete! All images have been saved.</div>
                ) : (
                    <div className="camera-container">
                        <div className="camera-info">
                            <p>Name: {name}</p>
                            <p>Phone Number: {phoneNumber}</p>
                        </div>
                        <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            width="400" 
                            height="300" 
                            style={{ transform: 'rotateY(180deg)' }} 
                        />
                        <img 
                            id="photo" 
                            src={processedImage} 
                            width="400" 
                            height="300" 
                            alt="Processed" 
                            style={{
                                display: processedImage ? 'block' : 'none',
                                transform: 'rotateY(180deg)'
                            }}
                        />
                    </div>
                )}
            {/* The canvas is used for capturing frames but is not displayed */}
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
        </div>
    );
};

export default WebcamStreamCapture;
