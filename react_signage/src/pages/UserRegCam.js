import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { flask } from '../constants';
import { useLocation } from 'react-router-dom';
import shortUUID from 'short-uuid';
import FaceRegNavBar from '../components/FaceRegNavBar';
import UserAllergyModal from '../components/UserAllergyModal';

const CLIENT_ID = shortUUID.generate();

const LoadingBar = ({ progress }) => {
    const barStyle = {
      width: `${progress * 1}%`, // 10% 단위로 게이지 증가
      height: '30px',
      backgroundColor: 'rgb(255, 75, 75,1)',
      maxWidth: '800px', // 가로 폭의 최대값 설정
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)",
    };
  
    return (
      <div style={{ width: '800px', height: '30px', border: '1px solid gray', maxWidth: '800px',boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)", }}>
        <div style={barStyle}></div>
      </div>
    );
  };

const UserRegCam = () => {
    const location = useLocation();
    const { name, phoneNumber } = location.state || {};
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [processedImage, setProcessedImage] = useState('');
    const [isCollectionComplete, setIsCollectionComplete] = useState(false);
    const [isRegCompleteResult, setIsRegCompleteResult] = useState('');
    const [userAllergyModalOpen, setUserAllergyModalOpen] = useState(false);
    const [complete,setComplete] = useState(0);
    const [userId,setUserId] = useState('');
    const [loadingProgress, setLoadingProgress] = useState(0);

    // 웹캠 스트림 설정
    useEffect(() => {
        const newSocket = io(flask, {
            transports: ['websocket'],
            secure: false,
            rejectUnauthorized: false,
            query: { client_id: CLIENT_ID }
        });
        setSocket(newSocket)

        newSocket.on('processed_image', (image) => {
            setProcessedImage(image);
            setLoadingProgress(prevProgress => prevProgress + 1);
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
        });

        newSocket.on('registration_result', (data) => {
            if (data.status === "success") {
                setIsRegCompleteResult("success");
                console.log("Registration successful!");
                console.log("User ID:", data.user_id);
                console.log("Name:", data.name);
                console.log("Phone Number:", data.phone_number);
                // 추가적인 성공 로직 처리
                setUserId(data.user_id);
            } else if (data.status === "failed") {
                setIsRegCompleteResult("failed");
                console.error("Registration failed:", data.error);
                // 추가적인 실패 로직 처리
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
            console.log('Connected...!', CLIENT_ID,);
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
    }, []);
    
    useEffect(() => {
        if (isRegCompleteResult === "success") {
            setUserAllergyModalOpen(true);
        } else if (isRegCompleteResult === "failed") {
            console.error("<< 서버 측 등록 과정 중 실패..! >>");
        }
    }, [isRegCompleteResult]);
    
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
                // 서버로 데이터를 emit하면서 CLIENT_ID를 인자로 전달
                socket.emit('data_for_storage', CLIENT_ID, dataToSend);
                console.log("Data sent...");
            }
        }, 1000 / FPS);

        return () => clearInterval(interval);
    }, [complete]);

    return (
        <div>
            <FaceRegNavBar />
            <div className="container d-flex align-items-center justify-content-center vh-50" style={{paddingTop:'50px'}}>
                <div className="d-flex flex-column align-items-center">
                    <div style={{ fontFamily: 'SansM',fontSize: '30px' }}>카메라를 응시해주세요</div>
                    <div id="container">
                        {isCollectionComplete ? (
                                <div>Collection complete! All images have been saved.</div>
                            ) : (
                                <div className="camera-container" >
                                    <div className="camera-info">
                                        <p style={{ fontFamily: 'SansM',fontSize: '20px' }}>이름: {name}</p>
                                        <p style={{ fontFamily: 'SansM',fontSize: '20px' }}>전화번호: {phoneNumber}</p>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                                </div>                                
                            )}
                            <div style={{ display: "flex", justifyContent: "center",paddingTop:'50px' }}>
                                <LoadingBar progress={loadingProgress} />
                            </div>
                        {/* The canvas is used for capturing frames but is not displayed */}
                        <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                    </div>
                    <UserAllergyModal
                        content="알러지를 선택하세요"
                        isOpen={userAllergyModalOpen}
                        setIsOpen={setUserAllergyModalOpen}
                        userId = {userId}
                    />
                </div>
            </div>
        </div>
    );
};

export default UserRegCam;
