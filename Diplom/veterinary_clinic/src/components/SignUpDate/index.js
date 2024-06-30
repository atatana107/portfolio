import React, { useState } from 'react';
import {getAllAppoitmentByDoctor,getAllAppoitmentByCityAndServiceandDoctor} from '../../http/appoitmentAPI';
import { useRef } from 'react';
import { useEffect } from 'react';
import { AppContext } from "../../AppContext.js";
import styles from './SignUpDate.module.css';

function DateTimeSelection(props){
    const modalRef = useRef();
    const [TimeDateByDoctor, setTimedateByDoctor] = React.useState([]);
    const { doctor, service, city} = React.useContext(AppContext);
    const [fetchingDoctorTime, setFetchingDoctorTime] = React.useState(true)
    const {setDateAppoitment} = React.useContext(AppContext);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         if (doctor && doctor.ID_doctor) {
    //             console.log("Fetching data for doctor ID:", doctor.ID_doctor);
    //             try {
    //                 const data = await getAllAppoitmentByDoctor(doctor.ID_doctor);
    //                 setTimedateByDoctor(data);
    //             } catch (error) {
    //                 console.error('Error fetching doctor data:', error);
    //             } finally {
    //                 setFetchingDoctorTime(false);
    //             }
    //         }
    //     };

    //     fetchData();
    // }, [doctor]);
    useEffect(() => {
        const fetchDoctors = async () => {
          const cityId = city.ID_city;
          const serviceId = service.ID_service;
          const doctorId = doctor.ID_doctor;
    
          if (cityId && serviceId && doctorId) {
            const dateAppoitment = await getAllAppoitmentByCityAndServiceandDoctor(cityId, serviceId, doctorId);
            setTimedateByDoctor(dateAppoitment);
          }
          
        };
    
        fetchDoctors();
      }, [city.ID_city, service.ID_service]);

    const formatDateTime = (inputDateTime) => {
        const options = { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit'
        };
    
        const date = new Date(inputDateTime);
        return date.toLocaleString('ru-RU', options);
    };
    const handleDateAndTimeSelect = (dateTime) => {
        setDateAppoitment(dateTime);
        console.log('Выбранa дата и время');
        props.OnClickDateTime();
      };

    return (
        <div className={styles.dateTimeContainer}>
        <div ref={modalRef} id="modal" className={styles.modal_date_ch}>
        <div className={styles.modal_content_date_ch}>
        <h2>Выберите дату и время</h2>
        <div className={styles.date_list}>
        <div className={styles.date_items}>
        {TimeDateByDoctor && TimeDateByDoctor.map((timeAndDate, index) => (
            <button
                key={index} 
                onClick={() => handleDateAndTimeSelect(timeAndDate)}
                className={index === 0 ? styles.button_One__date_ch : styles.button_Two__date_ch}>
                {formatDateTime(timeAndDate.Date_appoitment)}
            </button> 
        ))}
        </div>
        </div>
        </div>
    </div>
    </div>
    );
}

export default DateTimeSelection;
