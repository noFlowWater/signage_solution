import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { kiosk } from '../constants';
import axios from 'axios';

const AdminChangePw= () => {
    const[beforepw, setBeforepw] = useState();
    const[afterpw, setAfterpw] = useState();
    const navigate = useNavigate();
    const goBack=()=>{
        navigate(`/admin/menu`)
    }
    const [pwMessage, setPwMessage] = useState(""); // 메시지 상태 변수 추가

    const handleBeforePwChange = (e) => {
        setBeforepw(e.target.value);
        if (!e.target.value || !afterpw) { // 두 입력 필드 모두 비어있는 경우
            setPwMessage({ text: "변경할 비밀번호를 입력해주세요", color: "red" });
        } else {
            setPwMessage({
            text : e.target.value === afterpw ? "비밀번호가 같습니다" : "비밀번호가 다릅니다", // 비밀번호 일치 여부에 따른 메시지 업데이트
            color: afterpw === e.target.value ? "green" : "red"
            });
        }
    };
    
    const handleAfterPwChange = (e) => {
        setAfterpw(e.target.value);
        if (!e.target.value || !beforepw) { // 두 입력 필드 모두 비어있는 경우
            setPwMessage({ text: "변경할 비밀번호를 입력해주세요", color: "red" });
        } else {
            setPwMessage({
                text : e.target.value === beforepw ? "비밀번호가 같습니다" : "비밀번호가 다릅니다", // 비밀번호 일치 여부에 따른 메시지 업데이트
                color: beforepw === e.target.value ? "green" : "red"
                });
        }
    };
    const onSubmit = () => {
        if (pwMessage.text !== "비밀번호가 같습니다") {
            alert("비밀번호가 다릅니다.");
            return;
        }
        const data = {
            password: beforepw
        };
      
        axios.put(`${kiosk}/admin`, JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => {
            const data = res.data;
            if (data.status === 'success') { // 조건문의 괄호 위치와 중괄호 위치 수정
                navigate('/admin/login');
            }
            else{
                alert('비밀번호 변경이 실패했습니다');
            }
        })
        .catch(error => {
            console.error(error);
        });
    };
    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div style = {{fontFamily: 'SansM', fontSize:'30px'}}>
                        관리자 비밀번호 변경
                    </div>
                    {/* <img src={'/img/menu_reg.png'} alt="메뉴 등록" height="110" width="300"/> */}
                    <img src={require('../img/Logo.png')} alt="logo" height="110" width="300"/>
                </div>
            </nav>
            <div className="form-control">
                <div className="ms-5">
                    <div className ="mb-4">
                        <label className="from-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}
                        >변경할 비밀번호</label>
                        <input
                            className="form-control mb-3"
                            type="password"
                            value={beforepw}
                            onChange={handleBeforePwChange} // 이벤트 핸들러 변경
                            style={{ width: "150px" }}
                        />
                        <label className="from-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}
                        >비밀번호 재입력</label>
                        <input
                            className="form-control mb-3"
                            type="password"
                            value={afterpw}
                            onChange={handleAfterPwChange} // 이벤트 핸들러 변경
                            style={{ width: "150px" }}
                        />
                        <div className="mb-6">
                        <div 
                        className ="btn btn-primary"
                        onClick={onSubmit}
                        style = {{fontFamily: 'SansM', fontSize:'20px'}}
                        >
                            변경
                        </div>
                        <div 
                        className ="btn btn-danger ms-2"
                        onClick={goBack}
                        style = {{fontFamily: 'SansM', fontSize:'20px'}}
                        >
                            돌아가기
                        </div>
                        <div className="mb-3" style={{ fontFamily: 'SansM', fontSize:'20px', color: pwMessage.color }}>{pwMessage.text}</div>
                    </div>
                    </div>
            </div>
            </div>
            </div>
            
    );
};
export default AdminChangePw;