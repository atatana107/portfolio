import style_sign from './SignUp.module.css';
import {getAllAppoitmentCity,getOneCity,getAllAppoitment, updateAppoitmentByUser} from '../../http/appoitmentAPI.js';
import React, { useState } from 'react';
import { AppContext } from "../../AppContext.js";

function SignUp(props) {
  const { city, user, subService, Appoitment,service,doctor,dateAppoitment} = React.useContext(AppContext);
  const [dataAppoitmentAllCity, setdataAppoitmentAllCity] = React.useState({})
  const [fetchingAllAppoitment, setFetchingAllAppoitment] = React.useState(true);
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  React.useEffect(() => {
    if (isButtonClicked) {
        const fetchData = async () => {
          console.log("Fetching data for city:", city);
          const ID_city = city.ID_city;
          const ID_service = service.ID_service;
          const ID_doctor = doctor.ID_doctor;
          const Date_appoitment =dateAppoitment.Date_appoitment
          try 
          {
            if (ID_city && ID_service && ID_doctor && Date_appoitment) {
            const data = await getAllAppoitment(ID_city, ID_service, ID_doctor, Date_appoitment);
            setdataAppoitmentAllCity(data);
            console.log(dataAppoitmentAllCity)
            }
            else {
              console.error('Один или несколько параметров равны undefined. Проверьте, что все параметры определены');
            }
          } catch (error) {
            console.error('Error fetching city data:', error);
          } finally {
            setFetchingAllAppoitment(false);
          }
        };
        fetchData();
        setIsButtonClicked(false);
    }
  }, [isButtonClicked,city, service, doctor, dateAppoitment]);

  console.log('Получененная запись для апдейта',Appoitment)

  const handleSubmit = async () => 
    {
      setIsButtonClicked(true);
      if (!user || !user.ID_owner) {
          console.error('Данные пользователя недоступны.');
          return;
      }
      try {
          const updateData = {
              ID_city: city.ID_city,
              ID_subservice: subService.ID_subservice,
              Cost: subService.Price,
              ID_owner: user.ID_owner,
          };

          if (!dataAppoitmentAllCity) {
              console.error('Соответствующая запись не найдена.');
              return;
          }

          if (dataAppoitmentAllCity && dataAppoitmentAllCity.ID) {
            const updatedAppointment = await updateAppoitmentByUser(dataAppoitmentAllCity.ID, updateData);
            console.log('Запись обновлена:', updatedAppointment);
            if (updatedAppointment) 
              {setShowModal(true);}
          }
          else {
            console.error('Соответствующая запись не найдена.');
          }
      } catch (error) {
          console.error('Ошибка при обновлении записи:', error);
      }
    };
    const closeModal = () => {
      setShowModal(false);
    }

  return (
    <div className={style_sign.make_appointment}>
        <h1 className = {style_sign.make_appointment_title}>Запись<br/> на прием</h1>
        <div className={style_sign.button_appointment}>
            <button onClick={props.OnClickBranch}style={{ display: 'flex', alignItems: 'center' }}>Выбрать филиал</button>
            <button onClick={props.OnClickService} style={{ display: 'flex', alignItems: 'center' }}>Выбрать направление</button>
            <button onClick={props.OnClickSubService} style={{ display: 'flex', alignItems: 'center' }}>Выбрать услуги</button>
            <button onClick={props.OnClickDoc} style={{ display: 'flex', alignItems: 'center' }}>Выбрать специалиста</button>
            <button onClick={props.OnClickDateTime} style={{ display: 'flex', alignItems: 'center' }}>Дата и время</button>  
            <button style={{ display: 'flex', alignItems: 'center' }} onClick={handleSubmit}>Записаться</button>
        </div>
        {showModal && (
          <div className={style_sign.modal_content}>
            <button onClick={closeModal}>&times;</button>
            <p>Вы успешно записаны.<br/> Все ваши записи на приём доступны<br/> в вашем личном кабинете!</p>
            
          </div>
      )}
        
     </div>
   );
 };

export default SignUp;

