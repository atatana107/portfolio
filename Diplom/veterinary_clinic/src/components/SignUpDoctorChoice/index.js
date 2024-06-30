import stylesdocch from './SignUpDoctorChoice.module.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import {getAllDoctorsByCityAndService} from '../../http/appoitmentAPI.js';
import React from 'react';
import { AppContext } from "../../AppContext.js";

function SignUpDoctorChoice(props){
    const modalRef = useRef();
    const [doctors, setDoctors] = React.useState([]);
    const { city, service } = React.useContext(AppContext); 
    const {setDoctor} = React.useContext(AppContext); 
    useEffect(() => {
        function handleClickOutside(event) {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            props.OnCloseDoc(); // Вызываем функцию закрытия модального окна
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      useEffect(() => {
        const fetchDoctors = async () => {
          const cityId = city.ID_city;
          const serviceId = service.ID_service;
    
          if (cityId && serviceId) {
            const doctors = await getAllDoctorsByCityAndService(cityId, serviceId);
            setDoctors(doctors);
          }
          
          
        };
    
        fetchDoctors();
      }, [city.ID_city, service.ID_service]);


      if (!doctors) {
        return <p>No doctors data found.</p>;
      }
      const handleDoctorSelect = (doctor) => {
        setDoctor(doctor);
        console.log('Данные о выбранном враче', doctor);
        props.OnCloseDoc();
      };
    return(
    <div className={stylesdocch.modal_background_doc_ch}>
    <div ref={modalRef} id="modal" className={stylesdocch.modal_doc_ch}>
        <div className={stylesdocch.modal_content_doc_ch}>
        <h2>Выберите специалиста</h2>
        <div className={stylesdocch.doc_list}>
        <div className={stylesdocch.doc_items}>
          {doctors.map((doctor, index) => (
              <button
              key={index} 
              onClick={() => handleDoctorSelect(doctor)}
              className={index === 0 ? stylesdocch.button_One__serv_ch : stylesdocch.button_Two__serv_ch}>
              {doctor.Surname}  {doctor.Name} {doctor.Patronymic}
              </button> 
          ))}
        </div>
        </div>
        </div>
    </div>
    </div>
        );
}
export default SignUpDoctorChoice;