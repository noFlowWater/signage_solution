import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bool } from 'prop-types';
import axios from "axios";
import { kiosk } from "../constants";

const AdminMenuForm = ({editing}) => {
    const[name, setName] = useState();
    const[explan, setExplan] = useState();
    const[cost, setCost] = useState();
    const[cid, setCid] = useState("1");
    const[img, setImg] = useState();
    const[allergy, setAllergy] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();


    const {id} = useParams();

    useEffect(()=>{
        if(editing){
            axios.get(`${kiosk}/menu/detail/${id}`)
            .then(response => {
                setName(response.data.menu_name);
                setExplan(response.data.menu_description);
                setCost(response.data.price);
                setCid(response.data.category_id);
                setImg(response.data.file_path);
                setIsChecked(response.data.is_soldout);
                
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [id, editing]);

    const navigate = useNavigate();

    const onSubmit = () => {

        if (editing){
            const data = {
                menu_name : name,
                menu_description : explan,
                price : cost,
                file_path : img,
                category_id : cid,
                allergy : allergy,
                is_soldout : isChecked
            };
            axios.put(`${kiosk}/admin/${id}`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
              .then(res=> {
                const data = res.data
                console.log(data.status)
                navigate(`/admin/menu/${id}`);
              })
            .catch(error => {
                alert("등록 불가");
                console.error(error);
              });
        }
        else{
            const formData = new FormData();
            formData.append('file', file);
            axios.post(`${kiosk}/admin/image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(res => {
                // 이미지 전송 성공 시
                const data = {
                    menu_name: name,
                    menu_description: explan,
                    price: cost,
                    category_id: cid,
                    allergy: allergy,
                    is_soldout: isChecked,
                    // file_path: res.data.file_path  
                };

                // 나머지 데이터 전송
                return axios.post(`${kiosk}/admin/menu`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(res => {
                const data = res.data;
                console.log(data.status);
                navigate('/admin/menu');
            })
            .catch(error => {
                alert("등록 불가");
                console.error(error);
            });
    };
}

    const handleAllergyChange = (event) => {
        if(event.target.checked) {
            setAllergy([...allergy, event.target.value]);
        } else {
            setAllergy(allergy.filter(item => item !== event.target.value));
        }
    };

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    const goBack=()=>{
        if(editing){
            navigate(`/admin/menu/${id}`)
        }
        else{
                navigate('/admin/menu');
        }
    }
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);  // 선택된 파일을 상태에 저장
    
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setImg(reader.result);  // 이미지 URL을 상태에 저장
            setPreview(reader.result);  // 미리보기 이미지 URL을 상태에 저장
        };
    };

    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div style = {{fontFamily: 'SansM', fontSize:'30px'}}>
                        {editing ? '메뉴 수정' : '메뉴 등록'}
                    </div>
                    {/* <img src={'/img/menu_reg.png'} alt="메뉴 등록" height="110" width="300"/> */}
                    <img src={require('../img/Logo.png')} alt="logo" height="110" width="300"/>
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
                        <label className="form-label mb-1">사진 등록</label>
                        <div className="mb-3">
                        <input 
                            type="file" 
                            onChange={handleFileChange}  // 파일 선택 핸들러 변경
                        />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-1">사진 미리보기</label>
                        <div className="mb-3">
                            { preview && (
                                <img src={preview} alt="Preview" style={{width: '300px', height: 'auto'}}/>
                            )}
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
                            <option value="1">김밥</option>
                            <option value="2">라면</option>
                            <option value="3">떡볶이</option>
                            <option value="4">돈가스</option>
                            <option value="5">사이드</option>
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
                        <label className="form-label mb-1">매진 여부(체크 하면 매진, 체크 하지 않으면 매진 X)</label>
                        <div>
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div 
                        className ="btn btn-primary"
                        onClick={onSubmit}
                        >
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
