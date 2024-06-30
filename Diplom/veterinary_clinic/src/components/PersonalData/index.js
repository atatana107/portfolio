import stylepets from './PersonalData.module.css';
import React from 'react';
import defaultImage from './review_img_default.png';
import {updateUser} from '../../http/userAPI'
function PersonalData(props)
{
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [name, setName] = React.useState(null);
    const [surname, seSurname] = React.useState(null);
    const [patronymic, setPatronumic] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [information, setInformation] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [isUpdateSuccessful, setIsUpdateSuccessful] = React.useState(false);
    const [updateMessage, setUpdateMessage] = React.useState("");
    const [isModalInfo, setIsModalInfo] = React.useState(false);


    const  handleClick = () => {
        setIsModalVisible(true);
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
  };
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
  const handleSubmit = async () => {
    try {
      let imageUrl = defaultImage;
      
      let formData = new FormData();
      formData.append('Name', name || props.data.Name);
      formData.append('Surname', surname || props.data.Surname);
      formData.append('Patronymic', patronymic || props.data.Patronymic);
      formData.append('Phone', phone || props.data.Phone);
      formData.append('Information', information || props.data.Information);
      if (selectedImage) {
          formData.append('img', selectedImage||imageUrl); 
      }
        console.log(formData);
        const updateClient = await updateUser(props.data.ID_owner,formData);
        console.log('Данные клиента обновлены: ', updateClient);
        showModal("Данные успешно изменены");
    } catch (error) {
        console.error('Ошибка при обновлении данных клиента:', error);
        showModal("Упс, что-то пошло не так. Повторите снова.");
    }
    setIsModalVisible(false);
};


    return(
        <div className={stylepets.pdata_card}>
            <div className={stylepets.data_photo_column}>
                <img src={props.data.img ? process.env.REACT_APP_IMG_URL + props.data.img : defaultImage} alt="Pet" className={stylepets.data_photo} />
                <button onClick={() => handleClick()}>изменить</button>
            </div>
            <div className={stylepets.data_info_column}>
                <h3>имя</h3>
                <p>{props.data.Name?props.data.Name:"Имя"}</p>
                <h3>фамилия</h3>
                <p>{props.data.Surname?props.data.Surname: "Фамилия"}</p>
                <h3>отчество</h3>
                <p>{props.data.Patronymic?props.data.Patronymic:"Отчество"}</p>
                <h3>телефон</h3>
                <p>{props.data.Phone?props.data.Phone:"Телефон"}</p>
            </div>
            <div className={stylepets.personal_info_column}>
                <h3 >Информация о себе*</h3>
                <div className={stylepets.per_info_container}>
                    <p>{props.data.Information || "Информация о пользователе"}</p>
                </div>
            </div>
            {isModalVisible && (
            <div className={stylepets.modal}>
                <button onClick={() => setIsModalVisible(false)}>&times;</button>
                <h3 style={{fontFamily:'Raleway', fontWeight:'600',fontSize:'20px',marginBottom:'30px'}}>Изменение личной информации</h3>
                    <input type='text' placeholder='Имя'
                    value={name}
                    onChange={(e) => setName(e.target.value || props.data.Name)}/>
                    <input type='text' placeholder='Фамилия'
                    value={surname}
                    onChange={(e) => seSurname(e.target.value || props.data.Surname)}/>
                    <input type='text' placeholder='Отчество'
                    value={patronymic}
                    onChange={(e) => setPatronumic(e.target.value || props.data.Patronymic)}/>
                    <input type='text' placeholder='Телефон'
                    value={phone}
                    onChange={(e) => setPhone(e.target.value || props.data.Phone)}/>
                    <input type='text' placeholder='Информация'
                    value={information}
                    onChange={(e) => setInformation(e.target.value || props.data.Information)}/>
                    <label>
                        фото
                    <input className={stylepets.ChoicePhoto}type='file' placeholder='Выбрать фото'
                    accept="image/*" onChange={handleFileChange}/>   
                    </label>
                <button type="submit" onClick={handleSubmit}>Изменить</button>
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
export default PersonalData;