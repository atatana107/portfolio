import stylepets from './ClientData.module.css';
import React from 'react';
import defaultImage from './review_img_default.png';
import { AppContext } from '../../AppContext';
import {updateUser,deleteUser} from '../../http/userAPI';

function ClientsData(props)
{
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [surname, seSurname] = React.useState(null);
    const [patronymic, setPatronumic] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [information, setInformation] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [updateMessage, setUpdateMessage] = React.useState("");
    const { setselectedClientId,selectedClientId } = React.useContext(AppContext);
    const [selectedCardId, setSelectedCardId] = React.useState(null);
    const [isModalInfo, setIsModalInfo] = React.useState(false);
    const {data} = props;
    if (!data || Object.keys(data).length === 0) {
        return <p>No pet data available.</p>; // Handle empty or null data case
    }
    const { ID_owner, Name, Surname, Patronymic, Phone, Information, img} = data;
    

    const  handleClick = (client) => {
            setIsModalVisible(true);
            setselectedClientId(client); // Установка ID клиента в текущее состояние selectedClientId
            console.log('Выбранный клиент для изменения', client);
    }
    const showModal = (message) => {
        setUpdateMessage(message);
        setIsModalInfo(true);
        setTimeout(() => {
        setIsModalInfo(false);
            setTimeout(() => {
                window.location.reload();
            }, 500); // Добавляем задержку перед перезагрузкой страницы
        }, 2000);
    };
    const handleSelectClient = (client) => {
        setSelectedCardId(client.ID_owner); 
        setselectedClientId(client.ID_owner); 
        console.log('Выбранный клиент для удаления',client.ID_owner);
        console.log('Выбранный клиент для удаления'); 
    };
    const handleFileChange = (e) => {
          const file = e.target.files[0];
          if (file) {
              setSelectedImage(file);
          }
    };
    const handleSubmit = async () => {
        try {
          let imageUrl = img;
          
          let formData = new FormData();
          formData.append('Name', name || Name);
          formData.append('Surname', surname || Surname);
          formData.append('Patronymic', patronymic || Patronymic);
          formData.append('Phone', phone || Phone);
          formData.append('Information', information || Information);
          if (selectedImage) {
              formData.append('img', selectedImage||imageUrl); 
          }
            console.log(formData);
            const updateClient = await updateUser(data.ID_owner,formData);
            console.log('Данные клиента обновлены: ', updateClient);
            setUpdateMessage("Данные клиента обновлены");
            //setIsUpdateSuccessful(true); 
            showModal("Клиент успешно изменен");
        } catch (error) {
            console.error('Ошибка при обновлении данных клиента:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalVisible(false);
    };

    const handleDelete = async () => {
        try {
            console.log(data.ID_owner);
            const daleteClient = await deleteUser(data.ID_owner);
            console.log('Данные клиента обновлены: ', daleteClient);
            showModal("Клиент успешно удален");
        } catch (error) {
            console.error('Ошибка при обновлении данных клиента:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalVisible(false);
    };

    
    return(
        <div className={stylepets.pdata_card} onClick={() => handleSelectClient(data)}style={{ backgroundColor: selectedCardId === data.ID_owner ? '#FFC59E' : 'white' }}>
            <div className={stylepets.data_photo_column}>
                <img src={img ? process.env.REACT_APP_IMG_URL + img : defaultImage} alt="Pet" className={stylepets.data_photo} />
                <div>
                <button onClick={() => handleClick(data)} style={{ color: selectedCardId === data.ID_owner ? 'white' : '#FFC59E' }}>изменить</button>
                <button onClick={handleDelete}className={stylepets.deleteButton}style={{ color: selectedCardId === data.ID_owner ? 'white' : '#FFC59E' }}>удалить</button>
                </div>
                
            </div>
            <div className={stylepets.data_info_column}>
                <h3 style={{ color: selectedCardId === data.ID_owner ? 'white' : '#ebe3e0' }}>имя</h3>
                <p>{Name? Name:"Имя"}</p>
                <h3 style={{ color: selectedCardId === data.ID_owner ? 'white' : '#ebe3e0' }}>фамилия</h3>
                <p>{Surname? Surname: "Фамилия"}</p>
                <h3 style={{ color: selectedCardId === data.ID_owner ? 'white' : '#ebe3e0' }}>отчество</h3>
                <p>{Patronymic? Patronymic:"Отчество"}</p>
                <h3 style={{ color: selectedCardId === data.ID_owner ? 'white' : '#ebe3e0' }}>телефон</h3>
                <p>{Phone? Phone:"Телефон"}</p>
            </div>
            <div className={stylepets.personal_info_column}>
                <h3 style={{ color: selectedCardId === data.ID_owner ? 'white' : '#ebe3e0' }}>Информация о себе*</h3>
                <div className={stylepets.per_info_container}>
                     <p> {Information || "Информация о пользователе"}</p>
                </div>
            </div>
            {isModalVisible && (
            <div className={stylepets.modal}>
                <button onClick={() => setIsModalVisible(false)}>&times;</button>
                <h3>Изменение информации о клиенте</h3>
                    <input type='text' placeholder='Имя'
                    value={name}
                    onChange={(e) => setName(e.target.value || Name)}/>
                    <input type='text' placeholder='Фамилия'
                    value={surname}
                    onChange={(e) => seSurname(e.target.value || Surname)}/>
                    <input type='text' placeholder='Отчество'
                    value={patronymic}
                    onChange={(e) => setPatronumic(e.target.value || Patronymic)}/>
                    <input type='text' placeholder='Телефон'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value || Phone)}/>
                    <input type='text' placeholder='Информация'
                    value={information}
                    onChange={(e) => setInformation(e.target.value || Information)}/>
                    <label>
                    фото
                    <input className={stylepets.ChoicePhoto}type='file' placeholder='Выбрать фото'
                    accept="image/*" onChange={handleFileChange}/>
                    </label>
                <button style={{fontFamily:'Raleway'}}type="submit" onClick={handleSubmit}>Изменить</button>
                </div>
            )}
            {isModalInfo&&(
                <div className={stylepets.ModalInfo}>
                    <p>{updateMessage}</p>
                </div>
            )}
        </div>
    );
};
export default ClientsData;