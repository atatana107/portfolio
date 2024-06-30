import stylepageel from './AccPageElement.module.css';
import { useContext } from 'react'
import { AppContext } from '../../AppContext.js'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../http/userAPI.js'
import {createUser,deleteUser} from '../../http/userAPI.js'
import{createPatient} from '../../http/patientAPI.js'
import img from './review_img_default.png';
import React from 'react';
function AccPageAdminElement(props)
{
    const [name, setName] = React.useState(null);
    const [surname, setSurname] = React.useState(null);
    const [patronymic, setPatronymic] = React.useState(null);
    const [phone, setPhone] = React.useState(null);
    const [city, setCity] = React.useState(null);
    const [street, setStreet] = React.useState(null);
    const [house, setHouse] = React.useState(null);
    const [information, setInformation] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [password, setPassword] = React.useState(null);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isModalInfo, setIsModalInfo] = React.useState(false);
    const [isModalCreatePetsVisible, setisModalCreatePetsVisible] = React.useState(false);
    const [updateMessage, setUpdateMessage] = React.useState("");
    const [namePet, setNamePet] = React.useState(null);
    const [type, setType] = React.useState(null);
    const [breed, setBreed] = React.useState(null);
    const [age, setAge] = React.useState(null);
    const [gender, setGender] = React.useState(null);
    const [ownerId, setOwnerId] = React.useState(null);
    const {pet} = props;
    const { Name, Type, Breed, Age, Gender,ID_owner,Type_age} = pet;
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file);
        }
    };
    const handleScrollToRevData = (event) => {
        event.preventDefault();
        const aboutUsElement = document.getElementById('revdata');
        if (aboutUsElement) {
            aboutUsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    const showModal = (message) => {
        setUpdateMessage(message);
        setIsModalVisible(false);
        setisModalCreatePetsVisible(false);
        setIsModalInfo(true);
        setTimeout(() => {
        setIsModalInfo(false);
            setTimeout(() => {
                window.location.reload();
            }, 500); // Добавляем задержку перед перезагрузкой страницы
        }, 2000);
    };
    const { user } = useContext(AppContext)
    
    const navigate = useNavigate()

    const handleAddUser = () => {
        setIsModalVisible(true);
    };
    const handleAddPet = () => {
        setisModalCreatePetsVisible(true);
    };

    const handleLogout = (event) => {
        logout()
        user.logout()
        navigate('/', {replace: true})
    }
    const handleClientSelect = () => {
        props.setSelectedSection('clients'); // Обработчик события для выбора раздела "клиенты"
    };

    const handlePetSelect = () => {
        props.setSelectedSection('patients'); // Обработчик события для выбора раздела "пациенты"
    };
    const handleAppoimentSelect = () => {
        props.setSelectedSection('appoitment'); // Обработчик события для выбора раздела "пациенты"
    };
    const handleServiceSelect = () => {
        props.setSelectedSection('service'); // Обработчик события для выбора раздела "пациенты"
    };


    const handleSubmitCreate = async () => {
        try {
            let imageUrl = img; // по умолчанию используем существующее изображение
            let formData = new FormData();
            formData.append('Name', name );
            formData.append('Surname', surname);
            formData.append('Patronymic', patronymic);
            formData.append('Phone', phone || ' ');
            formData.append('Information', information || ' ');
            formData.append('City', city || ' ');
            formData.append('Street', street || ' ');
            formData.append('House', house || ' ');
            formData.append('Login', login || 'user');
            formData.append('Password', password || '1111');
            formData.append('role', 'USER');
            console.log(formData);
            if (selectedImage) {
                formData.append('img', selectedImage||imageUrl); // Добавляем новое изображение
            }
            console.log(formData);
            const createdReview = await createUser(formData);
            console.log('Пользователь создан: ', createdReview);
            showModal("Клиент успешно создан");
        } catch (error) {
            console.error('Ошибка при создании пользователя:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
    };
    const CreatePatient = async () => {
        try {
          let imageUrl = img;
          let formData = new FormData();
          formData.append('Name', namePet || 'имя');
          formData.append('Breed', breed || 'порода');
          formData.append('Age', age || '0');
          formData.append('Gender', gender || 'нет');
          formData.append('ID_owner', ownerId || '11');
          formData.append('Type', type || '0');
          formData.append('Type_age', '1');
          if (selectedImage) {
              formData.append('img', selectedImage||imageUrl); 
          }
            console.log(formData);
            if (selectedImage) {
                formData.append('img', selectedImage||imageUrl); // Добавляем новое изображение
            }
            console.log(formData);
            const createdReview = await createPatient(formData);
            console.log('Пациент создан: ', createdReview);
            showModal("Питомец успешно создан");
        } catch (error) {
            console.error('Ошибка при создании пациента:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
    };
    return(
    <div className={stylepageel.accpageelemnt}>
        <h2>
        Администратор
        </h2>
        <button onClick={handleClientSelect}>
            клиенты
        </button>
        <button onClick={handlePetSelect}>
            пациенты
        </button>
        <button onClick={handleAppoimentSelect}>
            записи
        </button>
        <button onClick={handleServiceSelect}>
            Направления и услуги
        </button>
        <button onClick={handleLogout}>
            выход
        </button>
        <button className={stylepageel.createButton}onClick={handleAddUser}>
            <span>+</span>добавить
        </button>
        <button className={stylepageel.createPet}onClick={handleAddPet}>
            <svg width="53" height="48" viewBox="0 0 53 48" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M34.0448 19.7337C34.192 19.6888 34.3787 19.47 34.3883 19.3313C34.6042 15.9845 31.5528 11.5228 30.4539 10.0332C29.5692 10.3526 28.7084 10.8688 27.9137 11.6554C27.9137 11.6554 26.3267 12.62 25.7637 17.3067C28.732 20.7883 32.4205 20.219 34.0448 19.7337Z" fill="white"/>
            <path d="M45.8148 13.792L40.9519 12.717C40.9519 12.717 40.8132 11.6544 39.4343 11.2178C38.4291 10.8988 34.9659 9.09607 31.5585 9.73277C32.8468 11.5087 35.7126 15.8864 35.486 19.3878C35.4523 19.9384 34.969 20.5071 34.3881 20.681C33.8296 20.8493 32.8274 21.0823 31.6093 21.0823C29.8444 21.0823 27.6277 20.5907 25.6308 18.7009C25.5916 19.3014 25.5692 19.951 25.5653 20.6538C25.5429 24.2791 20.4584 27.7163 20.4584 27.7163L19.7812 28.9874C21.1634 31.6978 23.3302 34.0144 26.0202 35.6957C26.1421 33.9643 26.6215 32.608 27.1768 31.5887C28.2283 29.6527 29.7031 28.5782 30.4556 28.1236C30.6175 24.1279 32.0495 22.9601 33.2441 22.6931C33.6111 22.6108 33.9979 22.6817 34.3022 22.8886C34.6485 23.1227 34.8713 23.5091 34.8939 23.9239C34.9553 24.9979 35.6562 25.7519 35.9886 26.0513C36.5275 26.0968 37.042 26.1741 37.5263 26.2804L37.5708 25.9036L37.941 22.6482C38.0038 22.0988 38.549 21.6357 39.1526 21.5573C41.4445 21.255 46.5509 20.0254 46.8828 15.029C46.921 14.4779 46.4071 13.9236 45.8148 13.792ZM38.2384 14.9527C37.8953 14.9527 37.6167 14.7015 37.6167 14.3904C37.6167 14.0793 37.8953 13.8281 38.2384 13.8281C38.5822 13.8281 38.8595 14.0793 38.8595 14.3904C38.8582 14.7009 38.5816 14.9527 38.2384 14.9527Z" fill="white"/>
            <path d="M40.9557 29.8292C40.7719 28.4126 38.5641 27.2454 35.7113 27.0796C35.7113 27.0796 34.1965 26.0249 34.0948 24.2044C34.0781 23.9288 33.8507 23.6549 33.5553 23.7209C32.7929 23.8908 31.4986 24.7771 31.4341 28.8252C31.4341 28.8252 27.2879 30.7197 26.9883 36.1814C29.646 37.6276 32.7431 38.4759 36.0489 38.5252L36.0119 37.7428C35.9982 37.4672 36.219 37.165 36.5037 37.0684L40.0354 35.8688C40.0354 35.8688 41.6916 35.953 42.3806 34.8268C42.7293 34.2592 43.0531 33.8625 43.2915 33.6069C43.4866 33.3966 43.4835 33.0961 43.2652 32.9039C42.5436 32.2732 41.0931 30.8877 40.9557 29.8292ZM38.8608 31.2003C38.5183 31.2003 38.2403 30.9497 38.2403 30.6384C38.2403 30.3264 38.5183 30.0753 38.8608 30.0753C39.2045 30.0753 39.4825 30.3264 39.4825 30.6384C39.4826 30.9496 39.2046 31.2003 38.8608 31.2003Z" fill="white"/>
            <path d="M6.11719 15.981C6.11719 16.9282 6.88504 17.6961 7.83224 17.6961H10.9145V20.018C10.9145 21.151 11.833 22.0695 12.9659 22.0695C14.0989 22.0695 15.0174 21.151 15.0174 20.018V17.6961H18.0997C19.0469 17.6961 19.8147 16.9282 19.8147 15.981C19.8147 15.0338 19.0469 14.266 18.0997 14.266H15.0174V11.944C15.0174 10.8111 14.0989 9.89258 12.9659 9.89258C11.833 9.89258 10.9145 10.8111 10.9145 11.9441V14.266H7.83224C6.88504 14.266 6.11719 15.0338 6.11719 15.981Z" fill="white"/>
            </svg>
            добавить
        </button>
        {isModalVisible && (
                <div className={stylepageel.modal_create}>
                    <button className={stylepageel.CloseCreate}onClick={() => setIsModalVisible(false)}>&times;</button>
                    <h3>Добавление пользователя</h3>
                        <input type="text" placeholder="Имя" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}/>
                        <input type="text" placeholder="Фамилия" 
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}/>
                        <input type="text" placeholder="Отчество" 
                        value={patronymic}
                        onChange={(e) => setPatronymic(e.target.value)}/>
                        <input type="text" placeholder="Телефон" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}/>
                        <input type="text" placeholder="Город" 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}/>
                        <input type="text" placeholder="Улица" 
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}/>
                        <input type="text" placeholder="Дом" 
                        value={house}
                        onChange={(e) => setHouse(e.target.value)}/>
                        <input type="text" placeholder="Информация"
                        value={information}
                        onChange={(e) => setInformation(e.target.value)}/>
                        <input type="text" placeholder="Логин" 
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}/>
                        <input type="password" placeholder="Пароль" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
                        <label>
                        фото
                        <input type="file" placeholder="Фото" 
                        accept="image/*" onChange={handleFileChange}/>
                        </label>
                    <button onClick={handleSubmitCreate}>Создать пользователя</button>
                </div>
            )}
            {isModalCreatePetsVisible && (
                <div className={stylepageel.modal_create_pet} >
                    <button style={{ marginTop:'-50px' }} className={stylepageel.CloseCreate}onClick={() => setisModalCreatePetsVisible(false)}>&times;</button>
                    <h3 >Добавление пациента</h3>
                        <input type="text" placeholder="имя животного" 
                        value={namePet}
                        onChange={(e) => setNamePet(e.target.value)}/>
                        <input type="text" placeholder="тип" 
                        value={type}
                        onChange={(e) => setType(e.target.value)}/>
                        <input type="text" placeholder="порода" 
                        value={breed}
                        onChange={(e) => setBreed(e.target.value)}/>
                        <input type="number" placeholder="возраст" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}/>
                        <input type="text" placeholder="пол" 
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}/>
                        <input type="number" placeholder="ID владельца" 
                        value={ownerId}
                        onChange={(e) => setOwnerId(e.target.value)}/>
                        <label>
                        фото
                        <input type="file" placeholder="Фото" 
                        accept="image/*" onChange={handleFileChange}/>
                        </label>
                    <button onClick={CreatePatient}>Создать</button>
                </div>
            )}
            {isModalInfo&&(
                <div className={stylepageel.ModalInfo}>
                    <p>{updateMessage}</p>
                </div>
            )}
    </div>
    );
};
export default AccPageAdminElement;