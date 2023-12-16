import React, {useState, useEffect } from 'react';
import axios from 'axios';
import { flask, kiosk } from '../constants';
import { useNavigate } from 'react-router-dom';
import AltCertNavBar from '../components/AltCertNavBar'
import AltCertResultModal from '../components/AltCertResultModal'

const UserAltCertPage = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState({ name: '', id: '' });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalControl, setModalControl] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => { // async 키워드를 추가합니다.
        event.preventDefault();
        setUserData(null);
        try {
            const response = await axios.post(`${flask}/alternative`, {
                phoneNumber: phoneNumber
            });

            // 서버 응답이 성공한 경우
            console.log("받아온 유저 아이디:",response.data); // 응답 데이터를 콘솔에 출력
            setUserData(response.data);
            console.log("SUCCESS!!!")

            localStorage.setItem('userId',response.data.user_id);
            const userId = localStorage.getItem('userId');
            if (userId) {
                const data = {
                    user_id:userId
                };
    
                axios.post(`${kiosk}/users/all`, JSON.stringify(data),{
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then(response => {
                    localStorage.setItem('userAl',JSON.stringify(response.data));
                    console.log("받아온 알러지 타입",typeof(JSON.stringify(response.data)));
                    console.log(response.data)
                    navigate('/user/menu/0') 
                })
                .catch(error => {
                    console.error(error);
                });
            }
        } catch (error) {
            // 서버 응답이 실패한 경우
            setModalControl(!modalControl);
            let errorMsg = "An error occurred while making the request.";
            if (error.response && error.response.data && error.response.data.error) {
                errorMsg = error.response.data.error;
            }
            setErrorMessage(errorMsg);
            console.error(errorMsg);
        }
    }

    const handleHome = () => {
        navigate('/');
        console.log("HOME 클릭");
        // HOME 버튼 로직 구현
    };

    useEffect(() => {
        if (userData == null) {
            setModalOpen(true);
        }
    }, [modalControl]);

    const closeMethod = () => {
        setModalOpen(false);
    };

    return (
        <div>
            <AltCertNavBar />
            <div style={{ maxWidth: '300px', margin: 'auto', paddingTop: '70px' }}>
                <div style={{ fontFamily: 'SansM',fontSize: '30px' }}>전화번호를 입력하세요</div>
                <div style = {{paddingTop : '30px'}}>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        style={{ padding: '20px', fontFamily: 'SansM',fontSize: '20px', borderRadius: '5px', border: '1px solid #ccc' }}
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="010-XXXX-XXXX"
                        required
                    />
                    <div style = {{paddingTop : '20px'}} />
                    <button
                        style={{ fontFamily: 'SansM',padding: '10px', fontSize: '25px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#FF4B4B', color: 'white', border: 'none',boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)" }}
                        type="submit"
                    >
                        확인
                    </button>
                </form>
                </div>
            </div>
            <AltCertResultModal 
                content={errorMessage}
                isOpen={modalOpen}
                setIsOpen={setModalOpen}
                onHome={handleHome}
                closeMethod={closeMethod}
            />
        </div>
    );
}

export default UserAltCertPage;