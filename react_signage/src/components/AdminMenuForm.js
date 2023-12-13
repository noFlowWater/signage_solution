import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { bool } from 'prop-types';
import axios from "axios";
import { kiosk } from "../constants";
import AdminLoginModal from "./AdminLoginModal";

const AdminMenuForm = ({editing}) => {
    const[name, setName] = useState();
    const[explan, setExplan] = useState();
    const[cost, setCost] = useState();
    const[cid, setCid] = useState("1");
    const[img, setImg] = useState();
    const [allergy, setAllergy] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [preview, setPreview] = useState();
    const [file, setFile] = useState();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");


    const {id} = useParams();

    useEffect(()=>{
        if(editing){
            axios.get(`${kiosk}/menu/detail/${id}`)
            .then(response => {
                setName(response.data.menu_name);
                setExplan(response.data.menu_description);
                setCost(response.data.price);
                setCid(response.data.category_id);
                setIsChecked(response.data.is_soldout);
                if (response.data.allergies.length === 0){
                    setAllergy(['없음']);
                }else{
                setAllergy(response.data.allergies);
                }
                console.log(response);
            })
            .catch(error => {
                console.error(error);
            });
        }
    }, [id, editing]);

    const navigate = useNavigate();
    useEffect(() => {
        if (!showModal && modalMessage === "메뉴 등록에 성공하였습니다.") {
            navigate(`/admin/menu`);
        }
        else if(!showModal && modalMessage === "메뉴 수정에 성공하였습니다.") {
            navigate(`/admin/menu/${id}`)
        }
    }, [showModal, modalMessage, navigate]);

    const onSubmit = () => {
        if (!file || !name || !explan || !cost || !cid || allergy === undefined || isChecked === undefined) {
            setModalMessage("모두 입력해주세요.");
            setShowModal(true);
            return;
        }
        
        const formData = new FormData();
        formData.append('file', file, file.name);  // Blob 객체와 파일 이름 추가
    
        const postImage = axios.post(`${kiosk}/admin/image`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    
        if (editing){
            postImage.then(res => {
                const data = {
                    menu_name : name,
                    menu_description : explan,
                    price : cost,
                    category_id : cid,
                    allergy : allergy,
                    is_soldout : isChecked,
                };
                
                return axios.put(`${kiosk}/admin/${id}`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(res=> {
                setModalMessage("메뉴 수정에 성공하였습니다.");
                setShowModal(true);
            })
            .catch(error => {
                alert("등록 불가");
                console.error(error);
            });
        }
        else{
            postImage.then(res => {
                const data = {
                    menu_name: name,
                    menu_description: explan,
                    price: cost,
                    category_id: cid,
                    allergy: allergy,
                    is_soldout: isChecked,
                };
    
                return axios.post(`${kiosk}/admin/menu`, JSON.stringify(data), {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            })
            .then(res => {
                setModalMessage("메뉴 등록에 성공하였습니다.");
                setShowModal(true);
            })
            .catch(error => {
                alert("등록 불가");
                console.error(error);
            });
        }
    };
    

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
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
    
                    let width = img.width;
                    let height = img.height;
    
                    // 이미지의 짧은 쪽을 기준으로 정사각형의 크기 결정
                    const size = Math.min(width, height);
    
                    // 이미지의 중앙 부분을 정사각형으로 잘라내기
                    const startX = (width - size) / 2;
                    const startY = (height - size) / 2;
    
                    // 잘라낸 이미지를 원하는 크기로 스케일링
                    const finalSize = 200;
                    canvas.width = finalSize;
                    canvas.height = finalSize;
                    ctx.drawImage(img, startX, startY, size, size, 0, 0, finalSize, finalSize);
    
                    canvas.toBlob((blob) => {
                        setFile(blob);  // Blob 객체를 상태에 저장
                        const blobUrl = URL.createObjectURL(blob);
                        setImg(blobUrl);  // 이미지 URL을 상태에 저장
                        setPreview(blobUrl);  // 미리보기 이미지 URL을 상태에 저장
                    }, file.type);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    
    
    
    

    return (
        <div>
            <AdminLoginModal 
            content={modalMessage} 
            isOpen={showModal} 
            setIsOpen={setShowModal} 
            closeMethod={() => setShowModal(false)}  
        />
            <nav className="navbar">
                <div className="container">
                    <div style = {{fontFamily: 'SansM', fontSize:'30px'}}>
                        {editing ? '메뉴 수정' : '메뉴 등록'}
                    </div>
                    {/* <img src={'/img/menu_reg.png'} alt="메뉴 등록" height="110" width="300"/> */}
                    <img src={require('../img/Logo.png')} alt="logo" height="100" width="300"/>
                </div>
            </nav>
            <div className="form-control">
                <div className="ms-5">
                    <div className ="mb-4">
                        <label className="from-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}
                        >메뉴 이름</label>
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
                        <label className="from-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}>상세 설명</label>
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
                        <label className="form-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}>사진 등록(사진 필수)</label>
                        <div className="mb-3">
                        <input 
                            type="file" 
                            onChange={handleFileChange}  // 파일 선택 핸들러 변경
                        />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}>사진 미리보기</label>
                        <div className="mb-3">
                            { preview && (
                                <img src={preview} alt="Preview" style={{width: '15%', height: 'auto'}}/>
                            )}
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="from-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}>메뉴 가격</label>
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
                        <label className="from-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}>카테고리 ID</label>
                        <select
                            className="form-control"
                            value={cid}
                            onChange={(e)=>{
                                setCid(e.target.value);
                            }}
                            style={{ width: "100px" , fontFamily: 'SansM', fontSize:'20px'}}
                        >
                            <option value="1">김밥</option>
                            <option value="2">라면</option>
                            <option value="3">떡볶이</option>
                            <option value="4">돈가스</option>
                            <option value="5">사이드</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}>알레르기 정보</label>
                            <div 
                                style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' ,fontFamily: 'SansM', fontSize:'15px'}}>
                                {["없음", "메밀", "밀", "잣","대두", "호두", "땅콩", "복숭아", "토마토", "돼지고기", "난류(가금류)", "우유", "닭고기", "쇠고기", "새우", "고등어", "홍합", "전복", "굴", "조개류", "게", "오징어", "아황산 포함식품"].map((item, index) => (
                                    <div key={index} style={{ marginRight: '15px', width: '14%' }}>
                                        <input
                                            type="checkbox"
                                            id={`allergy${index}`}
                                            name="allergy"
                                            value={item}
                                            checked={allergy.includes(item)} // 해당 항목이 선택된 알레르기 항목에 포함되어 있는지 확인
                                            onChange={handleAllergyChange}
                                        />
                                        <label htmlFor={`allergy${index}`}>{item}</label>
                                    </div>
                                ))}
                            </div>
                    </div>
                    <div className="mb-4">
                        <label className="form-label mb-1"
                        style = {{fontFamily: 'SansM', fontSize:'30px'}}>매진 여부(체크 하면 매진, 체크 하지 않으면 매진 X)</label>
                        <div>
                            <input
                                type="checkbox"
                                checked={isChecked}  // 체크 상태 설정
                                onChange={handleCheckboxChange}
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <div 
                        className ="btn btn-primary"
                        onClick={onSubmit}
                        style = {{fontFamily: 'SansM', fontSize:'20px',boxShadow: '0px 4px 10px rgba(0,0,0,5)'}}
                        >
                            {editing ? '메뉴 수정' : '메뉴 등록'}
                        </div>
                        <div 
                        className ="btn btn-danger ms-2"
                        onClick={goBack}
                        style = {{fontFamily: 'SansM', fontSize:'20px',boxShadow: '0px 4px 10px rgba(0,0,0,5)'}}
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