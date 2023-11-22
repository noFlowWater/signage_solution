import React, {useState } from 'react';
import axios from 'axios';
import { kiosk } from '../kiosk';
import { Link, useNavigate } from 'react-router-dom';
import FaceRegNavBar from '../components/FaceRegNavBar';

const UserRegPage = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const navigate = useNavigate(); 

    const handleSubmit = async (event) => { // async 키워드를 추가합니다.
        event.preventDefault();
        try {
        // Flask 서버로 POST 요청을 보냅니다.
        const response = await axios.post(`${kiosk}/register`, {
            name: name,
            phoneNumber: phoneNumber
        });
        console.log(response.data); // 응답 데이터를 콘솔에 출력
        // 성공적으로 데이터를 전송한 후, /webcam 경로로 이동합니다.
        navigate('/user/reg/cam', { state: { name, phoneNumber } });
        } catch (error) {
            if (error.response) {
            // 서버로부터 응답을 받았으나, 요청이 2xx 범위를 벗어났을 경우
            console.error('Registration failed:', error.response.data.error || error.response.data.message);
            // 사용자에게 오류 메시지 표시
            alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
            // 요청이 이루어졌으나 응답을 받지 못했을 경우
            console.error('Registration failed: No response', error.request);
            } else {
            // 요청을 설정하는 중에 문제가 발생했을 경우
            console.error('Registration failed:', error.message);
            }
        }
    };

    return (
        <div>
            <FaceRegNavBar />
            <div style={{ maxWidth: '300px', margin: 'auto', paddingTop: '150px' }}>
                <div style={{ fontFamily: 'SansM',fontSize: '24px' }}>이름과 연락처를 입력하세요</div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <input
                        style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="이름"
                        required
                    />
                    <input
                        style={{ padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        placeholder="010-XXXX-XXXX"
                        required
                    />
                    <button
                        style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '5px', cursor: 'pointer', backgroundColor: '#007bff', color: 'white', border: 'none' }}
                        type="submit"
                    >
                        등록
                    </button>

                    <Link to='/user/reg/cam'>일단 캠으로 보내</Link>
                </form>
            </div>
        </div>
    );
}

export default UserRegPage;