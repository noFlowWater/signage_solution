import {useState } from 'react';
import axios from 'axios';
import { useHistory} from 'react-router';

const AdminLogin = () => {
    const history = useHistory();
    const [pwd,setPwd] = useState('');

    const onSubmit = () => {
        const data = {
          password: pwd
        };
      
        axios.post('http://172.20.37.28:4000/admin/login', JSON.stringify(data), {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res=> {
            const data = res.data
            console.log(data.status)
            history.push('/admin/menu');
          })
        .catch(error => {
            console.error(error);
          });
    };

    return (
        <div style = {{padding: '100px'}}>
            <div className="container d-flex align-items-center justify-content-center vh-50">
                <div className="d-flex flex-column align-items-center">
                    <h1>관리자 로그인</h1>
                    <div>
                        <div className="mb-3">
                            <label className="from-label">관리자 비밀번호를 입력하세요</label>
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
                        className="btn btn-primary ms-2"
                        onClick ={onSubmit}
                        >
                        입력 완료
                    </button>
                </div>
            </div>
        </div>
    );
}
export default AdminLogin;