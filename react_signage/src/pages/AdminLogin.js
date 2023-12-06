import {useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { kiosk } from '../constants';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [pwd,setPwd] = useState('');

    const onSubmit = () => {
        const data = {
            user_id: '1',
            password: pwd
        };
      
        axios.post(`${kiosk}/admin/login`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            const data = res.data;
            if (data.status === 'success') { // 조건문의 괄호 위치와 중괄호 위치 수정
                navigate('/admin/menu');
            }
            else{
                alert('비밀번호가 다릅니다');
            }
        })
        .catch(error => {
            console.error(error);
        });
    };

    return (
        <div style = {{padding: '100px'}}>
            <div className="container d-flex align-items-center justify-content-center vh-50">
                <div className="d-flex flex-column align-items-center">
                    <h1 style = {{fontFamily: 'SansM', fontSize:'30px'}}>관리자 로그인</h1>
                    <div>
                        <div className="mb-3">
                            <label className="from-label" style = {{fontFamily: 'SansM', fontSize:'14px'}}>관리자 비밀번호를 입력하세요</label>
                                <div>
                                <input
                                    className="form-login"
                                    type="password"
                                    value={pwd}
                                    onChange={(e) => {
                                        setPwd(e.target.value);
                                    }}
                                />
                                </div>
                        </div>
                    </div>
                
                    <button
                        className="btn btn-primary mb-2 ms-2"
                        onClick ={onSubmit}
                        style={{ textDecoration: 'none', fontFamily: 'SansM', fontSize:'15px' }}
                        >
                        입력 완료
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AdminLogin;