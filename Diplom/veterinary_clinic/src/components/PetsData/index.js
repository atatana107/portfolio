import stylepets from './PetsCard.module.css';
import MedicalCard from '../MedicalCardPDF/index.js';
import Analizes from '../Analizes/index.js';
import defaultImage from './review_img_default.png';
import React from 'react';
import { AppContext } from '../../AppContext.js';
import {deletePatient,updatePatient,createAnalyze,deleteAnalyze} from '../../http/patientAPI.js';


function PetsCard(props)
{
    const { selectedPatienttId, setselectedPatienttId } = React.useContext(AppContext);
    const {selectedAnalyzeId, setSelectedAnalyzeId} = React.useContext(AppContext);
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [selectedCardId, setSelectedCardId] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isModal, setIsModal] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [namePet, setNamePet] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [breed, setBreed] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [ownerId, setOwnerId] = React.useState(null);
    const [isModalInfo, setIsModalInfo] = React.useState(false);
    const [updateMessage, setUpdateMessage] = React.useState("");
    const [isUpdateSuccessful, setIsUpdateSuccessful] = React.useState(false);
    const {pet} = props;
    if (!pet || Object.keys(pet).length === 0) {
        return <p>No pet data available.</p>; // Handle empty or null data case
    }
    const { Name, Type, Breed, Age, Gender, img, ID_owner, ID_patient} = pet;

    const  handleClick = (pet) => {
        setIsModalVisible(true);
        setselectedPatienttId(pet); // Установка ID клиента в текущее состояние selectedClientId
        console.log('Выбранный клиент для изменения', pet);
    }
    const  CreateAnalyzes = (pet) => {
        setIsModal(true);
        setselectedPatienttId(pet); // Установка ID клиента в текущее состояние selectedClientId
        console.log('Выбранный питомец для добавления анализа', pet);
    }
    const handleSelectPatient = (patient) => {
        setSelectedCardId(patient.ID_patient); 
        setselectedPatienttId(patient.ID_patient); 
        console.log('Выбранный клиент для удаления',patient.ID_patient);
        console.log('Выбранный клиент для удаления'); 
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    const handleAnalyzeFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };
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
    const handleDelete = async () => {
        try {
            console.log(pet.ID_patient);
            const daletePatient = await deletePatient(pet.ID_patient);
            console.log('Данные клиента обновлены: ', daletePatient);
            showModal("Питомец успешно удален");
        } catch (error) {
            console.error('Ошибка при обновлении данных клиента:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalVisible(false);
    };
    const handleSubmit = async () => {
        try {
          let imageUrl = img;
          
          let formData = new FormData();
          formData.append('Name', namePet || Name);
          formData.append('Breed', breed || Breed);
          formData.append('Age', age || Age);
          formData.append('Gender', gender || Gender);
          formData.append('ID_owner', ownerId || ID_owner);
          formData.append('Type', type || Type);
          if (selectedImage) {
              formData.append('img', selectedImage||imageUrl); 
          }
            console.log(formData);
            const dataPatient = await updatePatient(pet.ID_patient,formData);
            console.log('Данные клиента обновлены: ', dataPatient);
            showModal("Питомец успешно изменен");
        } catch (error) {
            console.error('Ошибка при обновлении данных клиента:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalVisible(false);
    };
    const currentDateTime = new Date().toISOString().replace('T', ' ').replace(/\.\d\d\dZ/, '');
    const createAnalyzes = async () => {
        try {
          let fileUrl = '';
          let formData = new FormData();
          formData.append('Create_time', currentDateTime );
          const selectedMedicalCard = pet.medical_cards && pet.medical_cards.length > 0 ? pet.medical_cards[0] : null;
          formData.append('ID_card', selectedMedicalCard.ID_card );
          if (selectedFile) {
              formData.append('Analyze', selectedFile||fileUrl); 
          }
          console.log(formData);
            const dataCard = await createAnalyze(formData);
            console.log('Карта пациента добавлена: ', dataCard);
            showModal("Анализ пациента добавлен");
        } catch (error) {
            console.error('Ошибка добавлении карты:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalVisible(false);
    };
    const handleSelectAnalyze = (analyze) => {
        setSelectedAnalyzeId(analyze);
        console.log('Выбранный анализ для удаления', analyze);
    };
    const deleteAnalizes = async () => {
        try {
            console.log(selectedAnalyzeId);
            const daletePatient = await deleteAnalyze(selectedAnalyzeId);
            console.log('Ананализ удален: ', daletePatient);
            showModal("Анализ успешно удален");
        } catch (error) {
            console.error('Ошибка при удалении анализа:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalVisible(false);
    };
    return(
        <div className={stylepets.pet_card} onClick={() => handleSelectPatient(pet)}style={{ backgroundColor: selectedCardId === pet.ID_patient ? '#FFC59E' : 'white' }}>
            <div className={stylepets.photo_column}>
                <img src={img ? process.env.REACT_APP_IMG_URL + img : defaultImage} alt="Pet" className={stylepets.pet_photo} />
                <div>
                <button onClick={() => handleClick(pet)} style={{ color: selectedCardId === pet.ID_patient ? 'white' : '#FFC59E' }}>изменить</button>
                <button onClick={handleDelete} className={stylepets.deleteButton}style={{ color: selectedCardId === pet.ID_patient ? 'white' : '#FFC59E' }}>удалить</button>
                </div>
            </div>
            <div className={stylepets.info_column}>
                <p>{Name?Name:"Имя вашего питомца"}</p>
                <h3 style={{ color: selectedCardId === ID_patient ? 'white' : '#ebe3e0' }}>тип</h3>
                <p>{Type?Type:"тип животного"}</p>
                <h3 style={{ color: selectedCardId === ID_patient ? 'white' : '#ebe3e0' }}>пол</h3>
                <p>{Gender?Gender:"пол животного"}</p>
                <h3 style={{ color: selectedCardId === ID_patient ? 'white' : '#ebe3e0' }}>порода</h3>
                <p>{Breed?Breed:"порода"}</p>
                <h3  style={{ color: selectedCardId === ID_patient ? 'white' : '#ebe3e0' }}>возраст</h3>
                <p>{Age?Age:"возраст"} год</p>
            </div>
            <div className={stylepets.medical_info_column}>
                <h3 style={{ color: selectedCardId === ID_patient ? 'white' : '#ebe3e0' }} className={stylepets.med_card}>медицинская карта</h3>
                <div className={stylepets.info_container}>
                    <MedicalCard pet={pet}/>
                </div>
                <h3 style={{ color: selectedCardId === ID_patient ? 'white' : '#ebe3e0' }} className={stylepets.med_an}>результаты анализов</h3>
                <button style={{ backgroundColor: selectedPatienttId === pet.ID_patient ? '#ffffff' :'#FFC59E' , color: selectedPatienttId === pet.ID_patient ?  '#FFC59E': 'white'}}onClick={() => CreateAnalyzes(pet)} className={stylepets.createCard}>+</button>
                <button style={{ backgroundColor: selectedPatienttId === pet.ID_patient ? '#ffffff' :'#FFC59E' , color: selectedPatienttId === pet.ID_patient ?  '#FFC59E': 'white'}} onClick={deleteAnalizes}className={stylepets.deleteCard}>-</button>
                <div className={stylepets.info_container_an}>
                {pet && pet.medical_cards && pet.medical_cards.length > 0 && pet.medical_cards[0].analyzes.length > 0 ? (
                    pet.medical_cards[0].analyzes.map(analyze => (
                        <Analizes analyze={analyze} changeAnalize={handleSelectAnalyze}/>
                    ))
                ) 
                : (
                <div className={stylepets.custom_file_upload_cont} >
                    <label className={stylepets.custom_file_upload}>
                        Здесь вы сможете посмотреть и скачать актуальные  <span style={{marginLeft:'20px'}}>анализы в формате pdf</span> 
                    </label>
                </div>
                )}
                </div>
            </div>
            {isModalVisible && (
            <div className={stylepets.modal}>
                <button onClick={() => setIsModalVisible(false)}>&times;</button>
                <h3>Изменение пациента</h3>
                    <input type="text" placeholder="имя животного" 
                    value={namePet}
                    onChange={(e) => setNamePet(e.target.value)}/>
                    <input type="text" placeholder="тип" 
                    value={type}
                    onChange={(e) => setType(e.target.value)}/>
                    <input type="text" placeholder="порода" 
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}/>
                    <input type="text" placeholder="возраст" 
                    value={age}
                    onChange={(e) => setAge(e.target.value)}/>
                    <input type="text" placeholder="пол" 
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}/>
                    <input type="text" placeholder="ID владельца" 
                    value={ownerId}
                    onChange={(e) => setOwnerId(e.target.value)}/>
                    <label>
                    фото
                    <input type="file" placeholder="Фото" 
                    accept="image/*" onChange={handleFileChange}/>
                    </label>
                <button type="submit" onClick={handleSubmit}>Изменить</button>
                </div>
            )}
            {isModal &&
            <div style={{backgroundColor:'white', height:'200px', width:'300px'}}className={stylepets.modal_create_card}>
                <button onClick={() => setIsModal(false)}>&times;</button>
                <h3 style={{fontFamily:'Raleway'}}>Выберите файл</h3>
                <label style={{color:'white', fontSize:'15px', borderRadius:'8px', paddingLeft:'60px', cursor:'pointer'}}>
                Анализ    
                <input style={{width:'1px', height:'1px'}}type="file" placeholder="Фото" 
                accept="image/*" onChange={handleAnalyzeFileChange}/>
                </label>
                <button style={{fontFamily:'Raleway', backgroundColor:'transparent', color:'#FFC59E', border:'none', fontSize:'20px', fontWeight:'600', marginTop:'20px', cursor:'pointer'}} onClick={createAnalyzes}>добавить</button>
            </div>
            }
            {isModalInfo&&(
                <div className={stylepets.ModalInfo}>
                    <p>{updateMessage}</p>
                </div>
            )}

        </div>
    );
};
export default PetsCard;