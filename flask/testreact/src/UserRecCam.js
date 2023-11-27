import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { SERVER_URL } from './constants';
import shortUUID from 'short-uuid';

const USER_ID = shortUUID.generate();

function UserRecCam() {
    const [webcamStream, setWebcamStream] = useState(null);
    const socket = useRef(null);
    const [processedImage, setProcessedImage] = useState(null);
    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        socket.current = io(SERVER_URL, {
            query: { user_id: USER_ID }
        });

        socket.current.on('connect', () => {
            console.log(`Connected to server with user_id: ${USER_ID}`);
        });

        socket.current.on('image_processed', (data) => {
            setProcessedImage(data.image);
            console.log("!!!");
        });

        return () => {
            if (socket.current) {
                socket.current.disconnect();
                socket.current = null;
            }
        };
    }, []);
    
    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                setWebcamStream(stream);
                console.log(`webcamStream: ${webcamStream}`)
            }
        }).catch(console.error);

        return () =>  webcamStream?.getTracks().forEach(track => track.stop());
    }, []);
        

    useEffect(() => {
        const interval = setInterval(() => {
            if (socket.current && videoRef.current && canvasRef.current) {
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

                socket.current.emit('upload_image', { user_id: USER_ID, image: data });
                console.log("Data sent...");
            }
        }, 100);

        return () => clearInterval(interval);
    }, [webcamStream]);


  return (
<div className="camera-container">
            <video ref={videoRef} autoPlay playsInline width="400" height="300" style={{ transform: 'rotateY(180deg)' }} />
            <img src={processedImage} width="400" height="300" alt="Processed" style={{ display: processedImage ? 'block' : 'none', transform: 'rotateY(180deg)' }} />
        </div>
  );
};

export default UserRecCam;
