import stylepets from './ReviewData.module.css';
import React from 'react';
import { AppContext } from '../../AppContext';
import {cancellationByUser} from '../../http/appoitmentAPI';
function ReviewData(props)
{

   
    const [updateMessage, setUpdateMessage] = React.useState("");
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const {Appoitment,setAppoitment} = React.useContext(AppContext);
    const [selectedCardId, setSelectedCardId] = React.useState(null);    
    
    
    
    const handleSelectAppoitment = (Appoitment) => {
        setSelectedCardId(Appoitment.ID); 
        setAppoitment(Appoitment.ID); 
        console.log('Выбранная запись для отмены',Appoitment.ID);
    };
    const showModal = (message) => {
        setUpdateMessage(message);
        setIsModalVisible(true);
        setTimeout(() => {
        setIsModalVisible(false);
            setTimeout(() => {
                window.location.reload();
            }, 500); // Добавляем задержку перед перезагрузкой страницы
        }, 2000);
    };

    const cancelByUser = async () => {
        try {
            let formData = new FormData();
            formData.append('Cost', 0);
            formData.append('ID_subservice', 0);
            formData.append('ID_owner', 11);
            formData.append('State_reservation', 0);
            const cancelAppoitment = await cancellationByUser(props.appoitment.ID, formData);
            console.log('Запись отменена: ', cancelAppoitment);
            showModal("Запись успешно отменена");
        } catch (error) {
            console.error('Ошибка при отмене записи:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
    };
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'numeric', year: 'numeric' };
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU', options);
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    };
    return(
        <div className={stylepets.review_card} style = {{marginBottom:'100px'}}  onClick={() => handleSelectAppoitment(props.appoitment)} >
            <div className={stylepets.review_photo_doc}>
                <img src='/images/doctor_3.jpg' alt="Pet" className={stylepets.photo_doc}/>
                <button onClick={cancelByUser}>отменить<br/>запись</button>
            </div>
            <div className={stylepets.review_info_column}>
                <h3>врач</h3>
                <p>{props.appoitment.doctor.Surname}<br/>
                {props.appoitment.doctor.Name} {props.appoitment.doctor.Patronymic}</p>
                <h3>стоимость</h3>
                <p>{props.appoitment.Cost} руб.</p>

            </div>
            <div className={stylepets.review_pet_column}>
                <h3>услуга</h3>
                <p>{props.appoitment.subservice && props.appoitment.subservice.Subervice_name ? props.appoitment.subservice.Subervice_name : 'нет данных'}</p>
                <h3>дата</h3>
                <p>{formatDate(props.appoitment.Date_appoitment)}</p>
                <h3>время</h3>
                <p>{formatTime(props.appoitment.Date_appoitment)}</p>
            </div>
            <div className={stylepets.modal}> 
            {isModalVisible&&(
                <div className={stylepets.ModalInfo}>
                    <p>{updateMessage}</p>
                </div>
            )}
        </div>
        </div>
    );
};
export default ReviewData;