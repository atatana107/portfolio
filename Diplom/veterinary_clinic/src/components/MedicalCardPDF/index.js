import React, { useState } from 'react';
import styleMed from './PDF.module.css';
import {createMedCard,deleteMedCard} from '../../http/patientAPI';
import { AppContext } from '../../AppContext';

function MedicalCard(props){
  const [selectedFile, setSelectedFile] = React.useState(null);
  const { selectedPatienttId, setselectedPatienttId } = React.useContext(AppContext);
  const {CardId, setCardId} = React.useContext(AppContext);
  const [isModalInfo, setIsModalInfo] = React.useState(false);
  const [updateMessage, setUpdateMessage] = React.useState("");
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const medicalCard = props.pet.medical_cards && props.pet.medical_cards.length > 0 ? props.pet.medical_cards[0] : null;
  const { Card, Date_create } = medicalCard || {};

  const handleFileChange = (e) => {
  const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };
  const showModal = (message) => {
    setUpdateMessage(message);
    setIsModalInfo(true);
    setIsModalVisible(false);
    setTimeout(() => {
    setIsModalInfo(false);
        setTimeout(() => {
            window.location.reload();
        }, 500); // Добавляем задержку перед перезагрузкой страницы
    }, 2000);
};
  const  handleClick = (client) => {
    setIsModalVisible(true);
    setselectedPatienttId(client); // Установка ID клиента в текущее состояние selectedClientId
    console.log('Выбранный клиент для создания мед.карты', client);
}
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
  const currentDateTime = new Date().toISOString().replace('T', ' ').replace(/\.\d\d\dZ/, '');
  const handleSubmit = async () => {
    try {
      let fileUrl = '';
      let formData = new FormData();
      formData.append('Date_create', currentDateTime );
      formData.append('ID_patient', props.pet.ID_patient );
      if (selectedFile) {
          formData.append('Card', selectedFile||fileUrl); 
      }
        console.log(formData);
        const dataCard = await createMedCard(formData);
        console.log('Карта пациента добавлена: ', dataCard);
        showModal("Карта пациента добавлена");
    } catch (error) {
        console.error('Ошибка добавлении карты:', error);
        showModal("Упс, что-то пошло не так. Повторите снова.");
    }
    setIsModalVisible(false);
};
const handleSelectAnalyze = (card) => {
  setCardId(card);
  console.log('Выбранная карта для удаления', card);
};
const deleteCard = async () => {
  try {
      console.log(CardId);
      const daletePatient = await deleteMedCard(CardId.ID_card);
      console.log('Карта удалена: ', daletePatient);
      showModal("Мед.карта успешно удалена");
  } catch (error) {
      console.error('Ошибка при удалении карты:', error);
      showModal("Упс, что-то пошло не так. Повторите снова.");
  }
  setIsModalVisible(false);
};

    return (
        <div className={styleMed.pdf_upload_container}>
            <button style={{ backgroundColor: selectedPatienttId === props.pet.ID_patient ? '#ffffff' :'#FFC59E' , color: selectedPatienttId === props.pet.ID_patient ?  '#FFC59E': 'white'}} onClick={() => handleClick(props.pet)} className={styleMed.createCard}>+</button>
            <button style={{ backgroundColor: selectedPatienttId === props.pet.ID_patient ? '#ffffff' :'#FFC59E' , color: selectedPatienttId === props.pet.ID_patient ?  '#FFC59E': 'white'}}onClick={deleteCard} className={styleMed.deleteCard}>-</button>
        {Card && (
        <div onClick={()=> handleSelectAnalyze(medicalCard)}style={{backgroundColor: CardId === medicalCard ? '#534742' : 'white'}}>
            <svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.42856 0H13.5664L20 6.16827V20.625C20 21.3847 19.36 22 18.5714 22H1.42856C0.639966 22 0 21.3847 0 20.625V1.37499C0 0.615326 0.64004 0 1.42856 0Z" fill="#E2574C"/>
              <path d="M19.9782 6.18742H14.9989C14.2103 6.18742 13.5703 5.57145 13.5703 4.81243V0.0136719L19.9782 6.18742Z" fill="#B53629"/>
              <path d="M14.6421 10.4241C14.8814 10.4241 14.9986 10.2234 14.9986 10.0288C14.9986 9.82737 14.8764 9.63281 14.6421 9.63281H13.2793C13.0128 9.63281 12.8643 9.84522 12.8643 10.0797V13.3034C12.8643 13.5907 13.0343 13.7502 13.2643 13.7502C13.4929 13.7502 13.6636 13.5907 13.6636 13.3034V12.4186H14.4879C14.7436 12.4186 14.8715 12.2171 14.8715 12.0171C14.8715 11.8212 14.7436 11.6265 14.4879 11.6265H13.6636V10.4241H14.6421ZM10.0357 9.63281H9.03851C8.76779 9.63281 8.57563 9.81158 8.57563 10.0769V13.3061C8.57563 13.6354 8.85204 13.7386 9.04989 13.7386H10.0964C11.3349 13.7386 12.1528 12.9542 12.1528 11.7434C12.1521 10.4633 11.3821 9.63281 10.0357 9.63281ZM10.0836 12.9425H9.47568V10.429H10.0236C10.8529 10.429 11.2135 10.9645 11.2135 11.7036C11.2135 12.3952 10.8592 12.9425 10.0836 12.9425ZM6.43068 9.63281H5.44283C5.16354 9.63281 5.00781 9.81015 5.00781 10.0797V13.3034C5.00781 13.5907 5.18637 13.7502 5.42635 13.7502C5.66633 13.7502 5.84489 13.5907 5.84489 13.3034V12.3622H6.46416C7.22844 12.3622 7.85917 11.841 7.85917 11.003C7.85924 10.1828 7.25069 9.63281 6.43068 9.63281ZM6.41427 11.606H5.84496V10.3898H6.41427C6.76571 10.3898 6.98928 10.6538 6.98928 10.9982C6.98854 11.342 6.76571 11.606 6.41427 11.606Z" fill="white"/>
            </svg>
          <p><a style={{color: CardId === medicalCard ? 'white' : 'black' }}href={process.env.REACT_APP_IMG_URL + Card} target="_blank"> Медицинская карта</a></p> 
          <p style={{ marginLeft: '200px',color: CardId === medicalCard ? 'white' : 'black' }}>создано  {formatDateTime(Date_create)}</p>
          {/* </a> */}
        </div>
       )}
      {!Card && (
      <div style={{ backgroundColor: selectedPatienttId === props.pet.ID_patient ? '#ffffff' :'#ffffff'}}className={styleMed.custom_file_upload_cont} >
        <label style={{width:'330px'}} className={styleMed.custom_file_upload}>
          <span>Здесь вы сможете посмотреть и скачать актуальную мед. карту в формате pdf</span>
        </label>
      </div>

       )}
       {isModalVisible &&
       <div style={{backgroundColor:'white', height:'150px', width:'300px'}}className={styleMed.modal_create_card}>
        <button onClick={() => setIsModalVisible(false)}>&times;</button>
        <h3 style={{fontFamily:'Raleway'}}>Выберите файл</h3>
        <label style={{color:'white', fontSize:'15px', borderRadius:'8px', paddingLeft:'60px', cursor:'pointer'}}>
            Мед. карта     
          <input style={{width:'1px', height:'1px'}}type="file" placeholder="Фото" 
          accept="image/*" onChange={handleFileChange}/>
        </label>
        <button style={{fontFamily:'Raleway', backgroundColor:'transparent', color:'#FFC59E', border:'none', fontSize:'20px', fontWeight:'600', marginTop:'20px', cursor:'pointer'}} onClick={handleSubmit}>добавить</button>
       </div>
       }
       {isModalInfo&&(
                <div style={{backgroundColor:'white', width:'300px', height:'70px'}} className={styleMed.ModalInfo}>
                    <p style={{fontFamily:'Raleway', fontSize:'15px', marginLeft:'-50px'}}>{updateMessage}</p>
                </div>
            )}
        </div>
    );
};
export default MedicalCard;
