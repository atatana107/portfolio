import stylebranch from './SignUPBranchChoice.module.css';
import { useRef,useContext } from 'react';
import { useEffect } from 'react';
import { AppContext } from '../../AppContext'

function SignUPBranchChoice(props){
  const modalRef = useRef();
  const { setCity } = useContext(AppContext);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        props.OnCloseBranch(); // Вызываем функцию закрытия модального окна
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [props]);

  const handleCitySelect = (city) => {
    setCity(city);
    console.log('Данные о выбранном городе сохранены', city);
    props.OnCloseBranch();
  };


return(
<div className={stylebranch.modal_background}>
  <div ref={modalRef} id="modal" className={stylebranch.modal_branch}>
    <div className={stylebranch.modal_content_branch}>
      {/*<span className={stylebranch.close_branch} >&times;</span>*/}
      <h2>Выберите филиал</h2>
    {props.dataAppoitment && props.dataAppoitment.length > 0 ? (
      props.dataAppoitment.map(city => (
            <button key={city.ID_city} onClick={() => handleCitySelect(city)}  className={stylebranch.button_One_branch}>
              {city.City}
            </button>
      
          ))
        ) : (
          <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Здесь будут отображаться врачи</p>
         )}
    </div>
  </div>
</div>
    );
}
export default SignUPBranchChoice;