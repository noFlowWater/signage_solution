import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './UserCartContext';
import { kiosk } from '../constants';
import { useLocation, useParams } from 'react-router-dom';

const UserMenu = () => {
    const location = useLocation();
    const { cid } = useParams();
  
    const [menus, setMenus] = useState([]);
    const { cart, dispatch } = useContext(CartContext);
  
    const userId = localStorage.getItem('userId');
    console.log("현재 사용자 : ", userId);
  
    // 모달 상태 관리
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);
  
    // useEffect(() => {
    //   const fetchMenus = async () => {
    //     try {
    //       const response = await axios.get(`${kiosk}/menu/${cid}`);
    //       console.log(response.data)
    //       setMenus(response.data);
    //     } catch (error) {
    //       console.log(error);
    //     }
    //   }
    //   fetchMenus();
    // }, [cid]);

    useEffect(() => {
        const fetchMenus = async () => {
            const data = {
                user_id:userId
            };
          try {
            if (cid === '0') {
              const response = await axios.post(`${kiosk}/menu/${cid}`, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                  },
              });
              console.log("추천 알고리즘",response.data);
              setMenus(response.data);
            } else {
              const response = await axios.get(`${kiosk}/menu/${cid}`);
              console.log(response.data);
              setMenus(response.data);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchMenus();
      }, [cid]);
  
    let addToCartEnabled = true;
  
    const addToCart = (menu) => {
      if (addToCartEnabled) {
        const existingItem = cart.find(item => item.menu_name === menu.menu_name);
        if (existingItem) {
          dispatch({ type: 'INCREMENT_ITEM', item: existingItem });
        } else {
          dispatch({ type: 'ADD_ITEM', item: { ...menu, quantity: 1 } });
        }
      }
    };
  
    const openModal = (menu) => {
      setSelectedMenu(menu);
      setModalOpen(true);
      addToCartEnabled = false;
    };
  
    const closeModal = () => {
      setModalOpen(false);
      addToCartEnabled = true;
    };
  
    // 모달 컴포넌트를 UserMenu 컴포넌트 내부에 정의하고 사용합니다.
    const Modal = ({ menu, onClose }) => {
        return (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#fff',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: '9999',
            }}
          >
            <h1>{menu.menu_name}</h1>
            <p>{menu.price}</p>
            <p>{menu.menu_description}</p>
            <p>{menu.category_id}</p>
            <p>{menu.allergies}</p>
            <button onClick={onClose} style={{ marginTop: '10px' }}>닫기</button>
          </div>
        );
      };
      
  
      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {menus.map((menu, index) => (
            <div key={index} onClick={() => addToCart(menu)} style={{ width: '33%', padding: '10px' }}>
              {/* <img src={`${kiosk}/${menu.file_path}`} alt={menu.menu_name} style={{ width: '30%', height: 'auto', marginBottom: '10px' }} /> */}
              <h1>{menu.menu_name}</h1>
              <p>{menu.price}</p>
              <button onClick={() => openModal(menu)}>상세 정보</button>
              {cid === '0' && index === 0 && <p>최근에 먹은 메뉴</p>}
              {cid === '0' && index === 1 && <p>가장 많이 먹은 메뉴</p>}
              {cid === '0' && index === 2 && <p>나와 비슷한 사용자의 선호 메뉴</p>}
            </div>
          ))}
          {modalOpen && <Modal menu={selectedMenu} onClose={closeModal} />}
        </div>
      );
      
  }
  
  export default UserMenu;
  