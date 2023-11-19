import { useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const AdminMenuForm = () => {
    const[name, setName] = useState();
    const[explan, setExplan] = useState();
    const[cost, setCost] = useState();
    const[cid, setCid] = useState();
    const[allergy, setAllergy] = useState();

    const history = useHistory();

    const goBack=()=>{
        history.push('/admin/menu');
    }

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div style = {{fontFamily: 'SansM', fontSize:'30px'}}>
                        메뉴 등록
                    </div>
                    {/* <img src={'/img/menu_reg.png'} alt="메뉴 등록" height="110" width="300"/> */}
                    <img src={'/img/logo.png'} alt="logo" height="110" width="300"/>
                </div>
            </nav>
            <div className="form-control">
                <div className="ms-5">
                    <div className ="mb-4">
                        <label className="from-label mb-1">메뉴 이름</label>
                        <input
                            className="form-control"
                            value={name}
                            onChange={(e)=>{
                                setName(e.target.value);
                            }}
                            style={{ width: "150px" }}
                        />
                    </div>
                    <div className ="mb-4">
                        <label className="from-label mb-1">상세 설명</label>
                        <textarea
                            className="form-control"
                            value={explan}
                            onChange={(e)=>{
                                setExplan(e.target.value);
                            }}
                            style={{ width: "600px" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="from-label mb-1">사진 등록</label>
                            <div className="mb-3">
                                <div className="btn btn-dark">
                                사진 등록
                                </div>
                            </div>
                        </div>
                    <div className="mb-4">
                        <label className="from-label mb-1">메뉴 가격</label>
                        <input
                            className="form-control"
                            value={cost}
                            onChange={(e)=>{
                                setCost(e.target.value);
                            }}
                            style={{ width: "150px" }}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="from-label mb-1">카테고리 ID</label>
                        <input
                            className="form-control"
                            value={cid}
                            onChange={(e)=>{
                                setCid(e.target.value);
                            }}
                            style={{ width: "80px" }}
                        />
                    </div>
                    <div className="mb-4">
                        <div className ="btn btn-primary">
                            메뉴 등록
                        </div>
                        <div 
                        className ="btn btn-danger ms-2"
                        onClick={goBack}
                        >
                            돌아가기
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminMenuForm;
