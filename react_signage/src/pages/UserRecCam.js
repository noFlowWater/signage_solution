import React, { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { flask } from '../constants';
import { Link } from 'react-router-dom';
import shortUUID from 'short-uuid';
import UserRecResultModal from '../components/UserRecResultModal';
import FaceRecNavBar from '../components/FaceRecNavBar';

const CLIENT_ID = shortUUID.generate();

const UserRecCam = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [socket, setSocket] = useState(null);
    const [processedImage, setProcessedImage] = useState('');
    const [isCollectionComplete, setIsCollectionComplete] = useState(false);
    const [recognitionComplete, setRecognitionComplete] = useState(false);
    const [complete, setComplete] = useState(0);
    const [isModelLoaded, setIsModelLoaded] = useState(false);
    const [modalOpen, setModalOpen] = useState(false); // 모달 상태 관리
    const [recognizedUser, setRecognizedUser] = useState({ name: '', id: '' });
    


    // 웹캠 스트림 설정
    useEffect(() => {
        const newSocket = io(flask, {
            query: { client_id: CLIENT_ID }
        });

        // 모델 데이터 로드 요청을 서버에 전송
        newSocket.emit('load_model_request');

        // 서버로부터 모델 로딩 완료 메시지 수신
        newSocket.on('model_loaded', (data) => {
            if (data.status === 'complete') {
                console.log('모델 데이터 로딩 완료');
                setIsModelLoaded(true);
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
            }
        });

        setSocket(newSocket)

        newSocket.on('image_processed', (image) => {
            setProcessedImage(image);
            console.log('!!!');
        });

        newSocket.on('user_recognized', (data) => {
            setRecognizedUser({ name: data.predicted_user_name, id: data.predicted_user_id });
            console.log(`Recognized User: ${data.predicted_user_name} (ID: ${data.predicted_user_id})`);
            setRecognitionComplete(true); // 인식 완료 상태 설정
        });
        

        newSocket.on('stop_sending', () => {
        console.log("30 face images have been saved, stopping.");
        setIsCollectionComplete(true); // Indicate collection completion
        if (videoRef.current && videoRef.current.srcObject) {
            const tracks = videoRef.current.srcObject.getTracks();
            tracks.forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }});

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
    useEffect(() => {
        if (recognitionComplete) {
            // 인식이 완료된 후 소켓 연결 종료
            if (socket) {
                socket.off('connect');
                socket.off('image_processed');
                socket.off('stop_sending');
                socket.off('user_recognized');
                socket.close();
                setSocket(null); // Clear the socket state
            }
        }
    }, [recognitionComplete, socket]);
    
    
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

                // 서버로 데이터를 emit
                socket.emit('upload_image', { client_id: CLIENT_ID, image: data });
                console.log("Data sent...");
            }
        }, 1000 / FPS);

        return () => clearInterval(interval);
    }, [complete]);

    useEffect(() => {
        setModalOpen(recognitionComplete);
    }, [recognitionComplete]);


    // 버튼에 대한 이벤트 핸들러 정의
    const handleYes = () => {
        console.log("YES 클릭");
        // YES 버튼 로직 구현
    };

    const handleAlternative = () => {
        console.log("대체인증 클릭");
        // 대체인증 버튼 로직 구현
    };

    const handleHome = () => {
        console.log("HOME 클릭");
        // HOME 버튼 로직 구현
    };

    const handleRetry = () => {
        console.log("RETRY 클릭");
        // RETRY 버튼 로직 구현
    };

  return (
        <div>
            <FaceRecNavBar />
            <div className="container d-flex align-items-center justify-content-center vh-50" style={{paddingTop:'50px'}}>
                <div className="d-flex flex-column align-items-center">
                    <div style={{ fontFamily: 'SansM',fontSize: '30px' }}>카메라를 응시해주세요</div>
                    <div id="container">
                        {isModelLoaded ? 
                            <div>모델 로딩 완료</div> :
                            <div>모델 로딩 중...</div>
                        }
                        {isCollectionComplete ? (
                                <div>Collection complete! All images have been saved.</div>
                            ) : (
                                <div className="camera-container">
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
                    <Link to='/user/menu/1'>메뉴 보기</Link>
                    <UserRecResultModal 
                        content={`당신은 이름: ${recognizedUser.name} ID: ${recognizedUser.id}입니까?`}
                        isOpen={modalOpen}
                        setIsOpen={setModalOpen}
                        onYes={handleYes}
                        onAlternative={handleAlternative}
                        onHome={handleHome}
                        onRetry={handleRetry}
                    />
                </div>
                
            </div>
        </div>
    );
};

export default UserRecCam;