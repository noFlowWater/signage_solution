import { useParams } from "react-router-dom"
import axios from 'axios';
import { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AdminMenuShow = () => {
    const { id } = useParams();
    const [menus, setMenus] = useState({});
    const navigate = useNavigate();

    const getMenus = (id) => {
        axios.get(`http://172.20.10.89:4000/menu/detail/${id}`)
            .then(response => {
                const menusData = response.data;
                setMenus(menusData);
                console.log(menusData);
            })
            .catch(error => {
                console.error(error);
            });
    };

    useEffect(()=>{
        getMenus(id)
    }, [id])

    const goBack=()=>{
        navigate('/admin/menu');
    }
    
    return (
        <div>
            <nav className="navbar">
                <div className="container">
                    <div style = {{fontFamily: 'SansM', fontSize:'30px'}}>
                        메뉴 상세 보기
                    </div>
                    {/* <img src={'/img/menu_reg.png'} alt="메뉴 등록" height="110" width="300"/> */}
                    <img src={require('../img/Logo.png')} alt="logo" height="110" width="300"/>
                </div>
            </nav>
            <div class="card" >
                <img src="..." class="card-img-top" alt="메뉴 이미지" />
                    <div class="card-body">
                    <h3 class="card-title">{menus.menu_name}</h3>
                    <h5>가격</h5>
                    <p class="card-text">{menus.price}</p>
                    <h5>상세 설명</h5>
                    <p class="card-text">{menus.menu_description}</p>
                    <h5>카테고리 ID</h5>
                    <p class="card-text">
                        {menus.category_id === "1" ? '김밥' :
                        menus.category_id === "2" ? '라면' :
                        menus.category_id === "3" ? '떡볶이' :
                        menus.category_id === "4" ? '돈가스' :
                        menus.category_id === "5" ? '사이드' : '카테고리 없음'}
                        </p>
                    <Link
                        className="btn btn-primary"
                        to={`/admin/menu/${id}/edit`}
                    >
                            메뉴 수정
                    </Link>
                    <div 
                        className ="btn btn-danger ms-2"
                        onClick={goBack}
                        >
                            돌아가기
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AdminMenuShow;