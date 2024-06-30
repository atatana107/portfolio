import stylepets from './PetsCard.module.css';
import PDF from '../PDF/index.js';
import PDFA from '../PDFA/index.js';
import defaultImage from './review_img_default.png';
import React from 'react';
import { AppContext } from '../../AppContext.js';
import {updatePatient} from '../../http/patientAPI.js';


function PetsCard(props)
{
    const { selectedPatienttId, setselectedPatienttId } = React.useContext(AppContext);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [namePet, setNamePet] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [breed, setBreed] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [updateMessage, setUpdateMessage] = React.useState("");
    const [isUpdateSuccessful, setIsUpdateSuccessful] = React.useState(false);
    const [isModalInfo, setIsModalInfo] = React.useState(false);
    const {pet} = props;
    if (!pet || Object.keys(pet).length === 0) {
        return <p>No pet data available.</p>; // Handle empty or null data case
    }
    const { ID_owner,Name, Type, Breed, Age, Gender, img, ID_patient} = pet.Patient;

    const  handleClick = (pet) => {
        setIsModalVisible(true);
        setselectedPatienttId(pet); // Установка ID клиента в текущее состояние selectedClientId
        console.log('Выбранный питомец для изменения', pet);
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
          formData.append('Name', namePet || Name);
          formData.append('Breed', breed || Breed);
          formData.append('Age', age || Age);
          formData.append('Gender', gender || Gender);
          formData.append('ID_owner', ID_owner);
          formData.append('Type', type || Type);
          if (selectedImage) {
              formData.append('img', selectedImage||imageUrl); 
          }
            console.log(formData);
            const dataPatient = await updatePatient(ID_patient,formData);
            console.log('Данные питомца обновлены: ', dataPatient);
            showModal("Данные успешно изменены");
        } catch (error) {
            console.error('Ошибка при обновлении данных питомца:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalVisible(false);
    };

    return(
        <div className={stylepets.pet_card}>
            <div className={stylepets.photo_column}>
                <img src={img ? process.env.REACT_APP_IMG_URL + img : defaultImage} alt="Pet" className={stylepets.pet_photo} />
                <button onClick={() => handleClick(pet)}>изменить</button>
            </div>
            <div className={stylepets.info_column}>
                <p>{Name?Name:"Имя вашего питомца"}</p>
                <h3>тип</h3>
                <p>{Type?Type:"тип животного"}</p>
                <h3>пол</h3>
                <p>{Gender?Gender:"пол животного"}</p>
                <h3>порода</h3>
                <p>{Breed?Breed:"порода"}</p>
                <h3>возраст</h3>
                <p>{Age?Age:"возраст"} год </p>
            </div>
            <div className={stylepets.medical_info_column}>
                <h3 className={stylepets.med_card}>медицинская карта</h3>
                <div className={stylepets.info_container}>
                    <PDF onFileSelect={props.handleMedicalRecordSelect} pet={pet}/>
                </div>
                <h3 className={stylepets.med_an}>результаты анализов</h3>
                <div className={stylepets.info_container_an}>
                    {/* <PDFA onFileSelect={props.handleMedicalRecordSelect}/> */}
                {pet && pet.length > 0 ? (
                    pet.map(analyze => (
                        <PDFA onFileSelect={props.handleMedicalRecordSelect} analyze={analyze}/>
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
                <h3 style={{fontFamily:'Raleway', fontWeight:'600',fontSize:'20px',marginBottom:'30px', marginLeft:'20px'}}>Изменение информации о питомце</h3>
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
                    <label >
                    фото
                    <input type="file" placeholder="Фото" 
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
export default PetsCard;