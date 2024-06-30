import styleAppComp from './Appoiment.module.css';
import React from 'react';
import { AppContext } from '../../AppContext';
import {updateAppoitmentByAdmin,createAppoitmentByAdmin} from '../../http/appoitmentAPI';
function AppoitmentsComponent(props)
{
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [isModal, setIsModal] = React.useState(false);
  const [ID, setID] = React.useState(null);
  const [IdDoctor, setIdDoctor] = React.useState(null);
  const [IdOowner, setIdOwner] = React.useState(null);
  const [DateAppoitment, setDateAppoitment] = React.useState(null);
  const [IdService, setIdService] = React.useState(null);
  const [isModalInfo, setIsModalInfo] = React.useState(false);
  const [IdSubService, setIdSubService] = React.useState(null);
  const [IdCity, setIdCity] = React.useState(null);
  const [StateReservation, setStateReservation] = React.useState(null);
  const [selectedAppoitment, setSelectedAppoitment] = React.useState(null);
  const [updateMessage, setUpdateMessage] = React.useState("");
  const [isUpdateSuccessful, setIsUpdateSuccessful] = React.useState(false);
  const { Appoitment, setAppoitment} = React.useContext(AppContext);

const handleAppoitmentClick = (appoitment) => {
    setSelectedAppoitment(appoitment);
    console.log("Выбранная запись",selectedAppoitment);
};
const  handleClick = (appoitment) => {
    setIsModalVisible(true);
    setAppoitment(appoitment); // Установка ID клиента в текущее состояние selectedClientId
    console.log('Выбранная запись для изменения', appoitment);
}
const showModal = (message) => {
    setUpdateMessage(message);
    setIsModalInfo(true);
    setIsModal(false);
    setTimeout(() => {
    setIsModalInfo(false);
        setTimeout(() => {
            window.location.reload();
        }, 500); // Добавляем задержку перед перезагрузкой страницы
    }, 2000);
};
  const handleSubmit = async () => {
    try {
      
      let formData = new FormData();
      formData.append('ID', props.data.ID);
      formData.append('ID_doctor', IdDoctor || Appoitment.ID_doctor);
      formData.append('ID_owner', IdOowner || Appoitment.ID_owner);
      formData.append('Date_appoitment', DateAppoitment || Appoitment.Date_appoitment);
      formData.append('ID_service', IdService || Appoitment.ID_service);
      formData.append('ID_subservice', IdSubService || Appoitment.ID_subservice);
      formData.append('ID_city', IdCity || Appoitment.ID_city);
      formData.append('State_reservation', StateReservation || Appoitment.State_reservation);
        console.log(IdOowner,props.data.ID_owner );
        const dataPatient = await updateAppoitmentByAdmin(Appoitment.ID,formData);
        console.log('Данные клиента обновлены: ', dataPatient);
        setUpdateMessage("Данные клиента обновлены");
        showModal("Запись успешно изменена");
    } catch (error) {
        console.error('Ошибка при обновлении данных клиента:', error);
        showModal("Упс, что-то пошло не так. Повторите снова.");
    }
    setIsModalVisible(false);
};
const handleCreate = async () => {
    try {
      
      let formData = new FormData();
      formData.append('ID_doctor', IdDoctor);
      formData.append('ID_owner', IdOowner || 11);
      formData.append('Date_appoitment', DateAppoitment || '2000-00-00 00:00:00');
      formData.append('ID_service', IdService);
      formData.append('ID_subservice', IdSubService|| 0);
      formData.append('ID_city', IdCity);
      formData.append('State_reservation', StateReservation || 0);
        console.log(formData);
        const dataPatient = await createAppoitmentByAdmin(formData);
        console.log('Запись создана: ', dataPatient);
        showModal("Запись успешно создана");
    } catch (error) {
        console.error('Ошибка при создании записи:', error);
        showModal("Упс, что-то пошло не так. Повторите снова.");
    }
    setIsModal(false);
};
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
    return(
        <>
        <div>
        <button className={styleAppComp.edit} onClick={() => setIsModalVisible(true)}style ={{cursor:'pointer',marginLeft:'500px', backgroundColor:'transparent', border:'none', fontFamily:'Raleway', fontSize:'18px', fontWeight:'600', color:'#FFC59E'}}>Редактировать</button>
        <button className={styleAppComp.create}  onClick={() => setIsModal(true)} style ={{marginLeft:'20px', backgroundColor:'transparent', border:'none', fontFamily:'Raleway', fontSize:'18px', fontWeight:'600', color:'#FFC59E'}}>Создать</button>
            <table className={styleAppComp.table}>
                <thead>
                <tr>
                    <th>ID записи</th>
                    <th>ID врача</th>
                    <th>ID клиента</th>
                    <th>Дата и время приема</th>
                    <th>Цена приема</th>
                    <th>ID направления</th>
                    <th>ID услуги</th>
                    <th>ID города</th>
                </tr>
                </thead>
               
                {props.data && props.data.length > 0 ? (
                    props.data.map(appoitment => (
                <tbody key={appoitment.ID} onClick={()=>handleClick( appoitment)} style={{backgroundColor: appoitment.ID=== Appoitment.ID? '#524538':'white', cursor:'pointer'}}>
                    <td style={{cursor:'pointer',color: appoitment.ID=== Appoitment.ID? 'white':'black'}}onClick={() => handleAppoitmentClick(appoitment)}>
                    {appoitment.ID}</td>
                    <td style={{color: appoitment.ID=== Appoitment.ID? 'white':'black'}}>
                    {appoitment.ID_doctor}
                    </td>
                    <td style={{color: appoitment.ID=== Appoitment.ID? 'white':'black'}}>
                    {appoitment.ID_owner}</td>
                    <td style={{color: appoitment.ID=== Appoitment.ID? 'white':'black'}}>{formatDateTime(appoitment.Date_appoitment)}</td>
                    <td style={{color: appoitment.ID=== Appoitment.ID? 'white':'black'}}>{appoitment.Cost}</td>
                    <td style={{color: appoitment.ID=== Appoitment.ID? 'white':'black'}}>
                    {appoitment.ID_service}</td>
                    <td style={{color: appoitment.ID=== Appoitment.ID? 'white':'black'}}>
                    {appoitment.ID_subservice}</td>
                    <td style={{color: appoitment.ID=== Appoitment.ID? 'white':'black'}}>
                    {appoitment.ID_city}</td> 
                </tbody>
                 ))
                    ) : (
                <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Данные о записи</p>
                )}  
                    
               
            </table> 
            {selectedAppoitment&& (
            <div  className={styleAppComp.modalApp}style={{ marginBottom: '20px', marginLeft:'500px' }}>
            <button style={{backgroundColor:'transparent', marginLeft:'470px',cursor:'pointer', border:'none', fontFamily:'Raleway', fontSize:'30px',marginBottom:'0'}}onClick={() => setSelectedAppoitment(false)}>&times;</button>
                <h2 style={{fontFamily:'EB+Garamond',marginLeft:'40px' }}>Дополнительная информация о записи</h2>
                <p style={{fontFamily:'Raleway',fontWeight:'600', marginLeft:'50px' }}>Информация о враче:</p>
                <div style={{marginLeft:'60px', marginTop:'5px',fontFamily:'Raleway',fontSize:'14px'}}>
                    <p>ID врача: {selectedAppoitment.doctor ? selectedAppoitment.doctor.ID_doctor : 'Нет информации'}</p>
                    <p>Имя врача: {selectedAppoitment.doctor ? selectedAppoitment.doctor.Name : 'Нет информации'}</p>
                    <p>Фамилия врача: {selectedAppoitment.doctor ? selectedAppoitment.doctor.Surname: 'Нет информации'}</p>
                    <p>Отчества врача: {selectedAppoitment.doctor ? selectedAppoitment.doctor.Patronymic: 'Нет информации'}</p>
                    <p>Опыт работы: {selectedAppoitment.doctor ? selectedAppoitment.doctor.Experience: 'Нет информации'} лет</p>
                </div>
                <p style={{fontFamily:'Raleway',fontWeight:'600', marginLeft:'50px'}}>Информация о клиенте:</p>
                <div style={{marginLeft:'60px', marginTop:'5px',fontFamily:'Raleway',fontSize:'14px'}}>
                    <p>ID клиента: {selectedAppoitment.owner ? selectedAppoitment.owner.ID_owner: 'Нет информации'}</p>
                    <p>Имя клиента: {selectedAppoitment.owner ? selectedAppoitment.owner.Name: 'Нет информации'}</p>
                    <p>Фамилия клиента: {selectedAppoitment.owner ? selectedAppoitment.owner.Surname: 'Нет информации'}</p>
                    <p>Отчество клиента: {selectedAppoitment.owner ? selectedAppoitment.owner.Patronymic: 'Нет информации'}</p>
                    <p>Телефон клиента: {selectedAppoitment.owner ? selectedAppoitment.owner.Phone: 'Нет информации'}</p>
                </div>
                <p style={{fontFamily:'Raleway',fontWeight:'600', marginLeft:'50px'}}>Информация о направлении:</p>
                <div style={{marginLeft:'60px', marginTop:'5px',fontFamily:'Raleway',fontSize:'14px'}}>
                    <p>ID направления: {selectedAppoitment.service ? selectedAppoitment.service.ID_service: 'Нет информации'}</p>
                    <p>Направление: {selectedAppoitment.service ? selectedAppoitment.service.Service_name: 'Нет информации'}</p>
                </div>
                <p style={{fontFamily:'Raleway',fontWeight:'600', marginLeft:'50px'}}>Информация об услуге:</p>
                <div style={{marginLeft:'60px', marginTop:'5px',fontFamily:'Raleway',fontSize:'14px'}}>
                    <p>ID услуги: {selectedAppoitment.subservice ? selectedAppoitment.subservice.ID_subservice: 'Нет информации'}</p>
                    <p>Услуга: {selectedAppoitment.subservice ? selectedAppoitment.subservice.Subervice_name: 'Нет информации'}</p>
                    <p>Стоимость: {selectedAppoitment.subservice ? selectedAppoitment.subservice.Price: 'Нет информации'} руб.</p>
                </div>
                <p style={{fontFamily:'Raleway',fontWeight:'600', marginLeft:'50px'}}>Информация об городе:</p>
                    <div style={{marginLeft:'60px', marginTop:'5px',fontFamily:'Raleway',fontSize:'14px'}}>
                    <p>ID города: {selectedAppoitment.city ? selectedAppoitment.city.ID_city: 'Нет информации'}</p>
                    <p>Город: {selectedAppoitment.city ? selectedAppoitment.city.City: 'Нет информации'}</p>
                </div>

            </div>
            )}
            {isModalVisible && (
            <div className={styleAppComp.modal}>
                <button onClick={() => setIsModalVisible(false)}>&times;</button>
                    <input type="text" placeholder="ID врача" 
                    value={IdDoctor}
                    onChange={(e) => setIdDoctor(e.target.value)}/>
                    <input type="text" placeholder="ID клиента" 
                    value={IdOowner}
                    onChange={(e) => setIdOwner(e.target.value)}/>
                    <input type="text" placeholder="Дата и время приема" 
                    value={DateAppoitment}
                    onChange={(e) => setDateAppoitment(e.target.value)}/>
                    <input type="text" placeholder="ID направления" 
                    value={IdService}
                    onChange={(e) => setIdService(e.target.value)}/>
                    <input type="text" placeholder="ID услуги" 
                    value={IdSubService}
                    onChange={(e) => setIdSubService(e.target.value)}/>
                    <input type="text" placeholder="ID города" 
                    value={IdCity}
                    onChange={(e) => setIdCity(e.target.value)}/>
                    <input type="text" placeholder="Статус резервирования" 
                    value={StateReservation}
                    onChange={(e) => setStateReservation(e.target.value)}/>
                <button type="submit" onClick={handleSubmit}>изменить</button>
                </div>
            )}
            {isModal && (
            <div className={styleAppComp.modal}>
                <button onClick={() => setIsModal(false)}>&times;</button>
                    <input type="text" placeholder="ID врача" 
                    value={IdDoctor}
                    onChange={(e) => setIdDoctor(e.target.value)}/>
                    <input type="text" placeholder="ID клиента" 
                    value={IdOowner}
                    onChange={(e) => setIdOwner(e.target.value)}/>
                    <input type="text" placeholder="Дата и время приема" 
                    value={DateAppoitment}
                    onChange={(e) => setDateAppoitment(e.target.value)}/>
                    <input type="text" placeholder="ID направления" 
                    value={IdService}
                    onChange={(e) => setIdService(e.target.value)}/>
                    <input type="text" placeholder="ID услуги" 
                    value={IdSubService}
                    onChange={(e) => setIdSubService(e.target.value)}/>
                    <input type="text" placeholder="ID города" 
                    value={IdCity}
                    onChange={(e) => setIdCity(e.target.value)}/>
                    <input type="text" placeholder="Статус резервирования" 
                    value={StateReservation}
                    onChange={(e) => setStateReservation(e.target.value)}/>
                <button type="submit" onClick={handleCreate}>создать</button>
                </div>
            )}
            {isModalInfo&&(
                <div className={styleAppComp.ModalInfo}>
                    <p>{updateMessage}</p>
                </div>
            )}
            </div>
           
        </>
    );
};
export default AppoitmentsComponent;