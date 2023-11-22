import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bool } from 'prop-types';

const AdminMenuForm = ({editing}) => {
    const[name, setName] = useState();
    const[explan, setExplan] = useState();
    const[cost, setCost] = useState();
    const[cid, setCid] = useState();
    const[allergy, setAllergy] = useState([]);

    const navigate = useNavigate();

    // const onSubmit = () => {
    //      const data = {
    //      name = name
    //      explan = explan
    //      cost = cost
    //      cid = cid
    //      allergy = allergy
    //     };
    //     axios.post('http://172.20.37.28:4000/admin/login', JSON.stringify(data), {
    //       headers: {
    //         'Content-Type': 'application/json'
    //       }
    //     })
    //     .then(res=> {
    //         const data = res.data
    //         console.log(data.status)
    //         history.push('/admin/menu');
    //       })
    //     .catch(error => {
    //         alert("등록 불가");
    //         console.error(error);
    //       });
    // };
    const handleAllergyChange = (event) => {
        if(event.target.checked) {
            setAllergy([...allergy, event.target.value]);
        } else {
            setAllergy(allergy.filter(item => item !== event.target.value));
        }
    };

    const goBack=()=>{
        navigate('/admin/menu');
    }

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div style = {{fontFamily: 'SansM', fontSize:'30px'}}>
                        {editing ? '메뉴 수정' : '메뉴 등록'}
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
                        <select
                            className="form-control"
                            value={cid}
                            onChange={(e)=>{
                                setCid(e.target.value);
                            }}
                            style={{ width: "80px" }}
                        >
                            <option value="김밥">김밥</option>
                            <option value="라면">라면</option>
                            <option value="떡볶이">떡볶이</option>
                            <option value="돈가스">돈가스</option>
                            <option value="사이드">사이드</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-1">알레르기 정보</label>
                            <div 
                                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                                {["없음", "메밀", "밀", "대두", "호두", "땅콩", "복숭아", "토마토", "돼지고기", "난류(가금류)", "우유", "닭고기", "쇠고기", "새우", "고등어", "홍합", "전복", "굴", "조개류", "게", "오징어", "아황산 포함식품"].map((item, index) => (
                                    <div key={index} style={{ marginRight: '10px' }}>
                                        <input
                                            type="checkbox"
                                            id={`allergy${index}`}
                                            name="allergy"
                                            value={item}
                                            onChange={handleAllergyChange}
                                        />
                                        <label htmlFor={`allergy${index}`}>{item}</label>
                                    </div>
                                ))}
                            </div>
                    </div>
                    <div className="mb-4">
                        <div className ="btn btn-primary">
                            {editing ? '메뉴 수정' : '메뉴 등록'}
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

AdminMenuForm.propTypes = {
    editing : bool
}

AdminMenuForm.defaultProps = {
    editing : false
}

export default AdminMenuForm;