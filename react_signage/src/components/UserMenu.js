import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { CartContext } from './UserCartContext';
import { kiosk } from '../constants';
import { useParams } from 'react-router-dom';

const UserMenu = () => {
    const { cid } = useParams();
  
    const [menus, setMenus] = useState([]);
    const { cart, dispatch } = useContext(CartContext);
  
    const userId = localStorage.getItem('userId');
    console.log("현재 사용자 : ", userId);

    // Safely getting and parsing the userAl item from localStorage
    const userAl = localStorage.getItem('userAl');
    console.log("현재 사용자 알러지: ",userAl);
    let userAllergies = [];
    if (userAl) {
        userAllergies = JSON.parse(userAl).data;
    } else {
        console.log("No allergy data found in localStorage.");
    }
  
    // 모달 상태 관리
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMenu, setSelectedMenu] = useState(null);

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
              console.log('받아온 추천 메뉴',response.data);
              const menusWithAllergyInfo = response.data.map(menu => (
                menu !== null
                  ? {
                      ...menu,
                      hasAllergy: menu.allergies.some(allergy => userAllergies.includes(allergy))
                    }
                  : null
              ));
              
              setMenus(menusWithAllergyInfo);
            } else {
              const response = await axios.get(`${kiosk}/menu/${cid}`);
              console.log(response.data);
              // 메뉴 데이터에 hasAllergy 속성 추가
              const menusWithAllergyInfo = response.data.map(menu => ({
                  ...menu,
                  hasAllergy: menu.allergies.some(allergy => userAllergies.includes(allergy))
              }));
              setMenus(menusWithAllergyInfo);
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
  
    const Modal = ({ menu, onClose}) => {
        // menu.allergies와 userAllergies를 비교하여 일치하는 알러지가 있는지 확인
        const hasMatchingAllergy = menu.allergies.some(menuAllergy => {
            // userAllergies 배열에서 해당 알러지와 일치하는 객체를 찾음
            const matchingAllergy = userAllergies.find(userAllergy => {
                console.log(">> userAllergy : ",userAllergy)
                console.log(">> menuAllergy : ",menuAllergy)
              return userAllergy == menuAllergy;
            });
          
            // 일치하는 알러지가 있으면 true 반환, 없으면 false 반환
            return matchingAllergy !== undefined;
          });
          
        console.log(typeof(menu.allergies))
        console.log('menu.allergies:', menu.allergies);
        console.log('hasMatchingAllergy:', hasMatchingAllergy);


        return (
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '500px', // 원하는 너비로 설정
              backgroundColor: '#EBF6EE',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              zIndex: '9999',
              borderRadius: '20px',
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)"
            }}
          >
            <div style={{ fontFamily: "SansB", fontSize: '30px' }}>{menu.menu_name}</div>
            <div style={{ fontFamily: "SansM", fontSize: '20px' }}>￦{menu.price}</div>
            <div style={{ fontFamily: "SansM", fontSize: '20px' }}>{menu.menu_description}</div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ fontFamily: 'SansB', fontSize: '20px' }}>알러지:</div>
                {menu.allergies.map((allergy, index) => (
                    <div
                    key={allergy}
                    style={{
                        fontFamily: 'SansM',
                        fontSize: '20px',
                        display: 'inline-block',
                        color: userAllergies.includes(allergy) ? 'red' : 'inherit',
                        marginLeft: index > 0 ? '5px' : '0'
                    }}
                    >
                    {index > 0 && '/'} {allergy}
                    </div>
                ))}
                </div>

            {hasMatchingAllergy && 
            (<div style={{ color: 'red',fontFamily: "SansM", fontSize: '15px' }}>이 메뉴에 사용자의 알러지와 일치하는 알러지가 있습니다!</div>)
            }
            <button className="btn" onClick={onClose} style={{ background: '#FF4B4B',color:'white',marginTop: '10px', fontFamily: "SansM", fontSize: '20px',boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)" }}>닫기</button>
          </div>
        );
      };

      return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {menus.map((menu, index) => (
            menu ? (
              <div key={index} onClick={() => !menu.is_soldout && addToCart(menu)} style={{ 
                width: '33%', 
                padding: '10px'
              }}>
                <div style={{ 
                  position: 'relative',
                  width: '100%', 
                  height: '300px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  padding: '20px', 
                  borderRadius: '20px', 
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)",
                  border: menu.hasAllergy ? '2px solid orange' : 'none',
                  backgroundColor: menu.hasAllergy ? 'rgba(255, 165, 0, 0.1)' : '#f8f8f8'
                }}>
                  {menu.hasAllergy && 
                    <div style={{ 
                      position: 'absolute', 
                      top: '10px', 
                      right: '10px', 
                      backgroundColor: '#FFA500', 
                      color: 'white', 
                      padding: '7px', 
                      borderRadius: '5px',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      fontFamily: "SansM",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)"
                    }}>알러지 주의</div>
                  }
                  {menu.is_soldout && 
                    <div className="diagonal-line" />
                  }
                  <img src={`${kiosk}/${menu.file_path}`} alt={menu.menu_name} style={{ width: '40%', height: 'auto', marginBottom: '10px' }} />
                  <div style={{ fontFamily: "SansB", fontSize: '30px', textAlign: 'center' }}>{menu.menu_name}</div>
                  <div style={{ fontFamily: "SansM", fontSize: '20px', textAlign: 'center' }}>￦{menu.price}</div>
                  <button onClick={() => openModal(menu)} style={{ fontFamily: "SansM", fontSize: '15px', marginTop: '10px', border: 'none', background: 'rgba(0, 0, 0, 0)',textDecoration: 'underline', }}> 상세 정보</button>
                  {cid === '0' && index === 0 && <div style={{ fontFamily: "SansB", fontSize: '20px', color: 'red', marginTop: '10px',textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)' }}>최근에 먹은 메뉴</div>}
                  {cid === '0' && index === 1 && <div style={{ fontFamily: "SansB", fontSize: '20px', color: 'blue', marginTop: '10px' ,textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>가장 많이 먹은 메뉴</div>}
                  {cid === '0' && index === 2 && <div style={{ fontFamily: "SansB", fontSize: '20px', color: 'green', marginTop: '10px' ,textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)'}}>나와 비슷한 사용자의 선호 메뉴</div>}
                </div>
              </div>
            ) : (
              <div key={index} style={{ 
                width: '33%', 
                padding: '10px', 
              }}>
                <div style = {{
                  position: 'relative',
                  width: '100%', 
                  height: '300px', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center', 
                  alignItems: 'center', 
                  padding: '20px', 
                  borderRadius: '20px', 
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 5)",
                  border: 'none',
                  backgroundColor: 'white'
                }}>
                  {cid === '0' && index === 0 && <p style={{ fontFamily: "SansB", fontSize: '20px', color: 'gray' }}>최근에 먹은 추천 메뉴 없음</p>}
                  {cid === '0' && index === 1 && <p style={{ fontFamily: "SansB", fontSize: '20px', color: 'gray' }}>가장 많이 먹은 추천 메뉴 없음</p>}
                  {cid === '0' && index === 2 && <p style={{ fontFamily: "SansB", fontSize: '15px', color: 'gray' }}>나와 비슷한 사용자의 선호 추천 메뉴 없음</p>}
                </div>
              </div>
            )
          ))}
          {modalOpen && <Modal menu={selectedMenu} onClose={closeModal} />}
        </div>
      );
  }
  
  export default UserMenu;
  