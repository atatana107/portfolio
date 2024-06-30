import React from 'react';
import style from './serviceForAdmin.module.css';
import {createService,updateService,createSubservice,updateSubservice} from '../../http/servicesAPI';
import defaultImage from './icon_reproductology.png';
import { AppContext } from '../../AppContext';

function ServicesForAdmin(props) {
    const { data } = props;
    const [isModalServiceUpdate, setIsModalServiceUpdate] = React.useState(false);
    const [isModalServiceCreate, setIsModalServiceCreate] = React.useState(false);
    const [isModalSubserviceUpdate, setIsModalSubserviceUpdate] = React.useState(false);
    const [isModalSubserviceCreate, setIsModalSubserviceCreate] = React.useState(false);
    const [IDservice, setIDservice] = React.useState(null);
    const [NameService, setNameService] = React.useState(null);
    const [ImgService, setImgService] = React.useState(null);
    const [IdSubservice, setIdSubservice] = React.useState(null);
    const [NameSubservice, setNameSubservice] = React.useState(null);
    const [Price, setPrice] = React.useState(null);
    const [updateMessage, setUpdateMessage] = React.useState("");
    const [isUpdateSuccessful, setIsUpdateSuccessful] = React.useState(false);
    const [selectedServiceOrSubservice, setSelectedServiceOrSubservice] = React.useState('');
    const [createServiceOrSubservice, setCreateServiceOrSubservice] = React.useState('');
    const [updateServiceOrSubservice, setUpdateServiceOrSubservice] = React.useState('');
    const { service, setService } = React.useContext(AppContext);
    const { subService, setSubService } = React.useContext(AppContext);
    const [isModalInfo, setIsModalInfo] = React.useState(false);
    const handleImgChange = (e) => {
        const img = e.target.files[0];
        if (img) {
            setImgService(img);
        }
        else
        {
            setImgService(defaultImage)
        }
      };
      const showModal = (message) => {
        setUpdateMessage(message);
        setIsModalInfo(true);
        setIsModalServiceCreate(false);
        setIsModalServiceUpdate(false);
        setIsModalSubserviceCreate(false);
        setIsModalSubserviceUpdate(false);
        setTimeout(() => {
        setIsModalInfo(false);
            setTimeout(() => {
                window.location.reload();
            }, 500); // Добавляем задержку перед перезагрузкой страницы
        }, 2000);
    };
    const handleCreate = async () => {
        try {
            let formData = new FormData();
            formData.append('Service_name', NameService );
            if (ImgService) {
                formData.append('img', ImgService||defaultImage); 
            }
              console.log(formData);
            const dataService = await createService(formData);
            console.log('Направление создано: ', dataService);
            showModal("Направление создано");
        } catch (error) {
            console.error('Ошибка при создании направления:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalServiceCreate(false);
    };
    const handleCreateSubservice = async () => {
        try {
            let formData = new FormData();
            formData.append('Subervice_name', NameSubservice );
            formData.append('ID_service', IDservice );
            formData.append('Price', Price );
            console.log(formData);
            const dataService = await createSubservice(formData);
            console.log('Услуга создана: ', dataService);
            showModal("Услуга успешно создана");
        } catch (error) {
            console.error('Ошибка при создании услуги:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalSubserviceCreate(false);
    };
    const handleUpdateSubservice = async () => {
        try {
            let formData = new FormData();
            formData.append('Subervice_name', NameSubservice );
            formData.append('ID_service', IDservice );
            formData.append('Price', Price );
            console.log(formData);
            const dataService = await updateSubservice(subService,formData);
            console.log('Услуга изменена: ', dataService);
            showModal("Услуга успешно изменена");
        } catch (error) {
            console.error('Ошибка при изменении услуги:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalSubserviceUpdate(false);
    };
    const handleUpdate = async () => {
        try {
            let formData = new FormData();
            formData.append('Service_name', NameService );
            if (ImgService) {
                formData.append('img', ImgService||service.img); 
            }
              console.log(formData);
            const dataService = await updateService(service,formData);
            console.log('Направление обновлено: ', dataService);
            showModal("Направление изменено");
        } catch (error) {
            console.error('Ошибка при обновлении направления:', error);
            showModal("Упс, что-то пошло не так. Повторите снова.");
        }
        setIsModalServiceCreate(false);
    };
    const ServiceCreateButtonClick = () => {
        setIsModalServiceCreate(true);
        setCreateServiceOrSubservice(false);
    };
    const SubserviceCreateButtonClick = () => {
        setIsModalSubserviceCreate(true);
        setCreateServiceOrSubservice(false);
    };
    const ServiceUpdateButtonClick = () => {
        setIsModalServiceUpdate(true);
        setSelectedServiceOrSubservice(false);
    };
    const SubserviceUpdateButtonClick = () => {
        setIsModalSubserviceUpdate(true);
        setSelectedServiceOrSubservice(false);
    };
    const handleServiceClick = (id) => {
        setService(id);
        console.log('ID выбранного направления',id)
    };

    const handleSubserviceClick = (id) => {
        setSubService(id);
        console.log('ID выбранной услуги',id)
    };
    return (
        <div>
            <button className={style.edit} onClick={() => setSelectedServiceOrSubservice(true)}style ={{cursor:'pointer',marginLeft:'500px', backgroundColor:'transparent', border:'none', fontFamily:'Raleway', fontSize:'18px', fontWeight:'600', color:'#FFC59E'}}>Редактировать</button>
            <button className={style.create}  onClick={() => setCreateServiceOrSubservice(true)} style ={{cursor:'pointer',marginLeft:'20px', backgroundColor:'transparent', border:'none', fontFamily:'Raleway', fontSize:'18px', fontWeight:'600', color:'#FFC59E'}}>Создать</button>
            <table className={style.table}>
                <thead>
                    <tr>
                        <th>ID направления</th>
                        <th>Направление</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(data) && data.map(service => (
                        <React.Fragment key={service.ID_service}>
                            <tr>
                                <td style={{cursor:'pointer'}} onClick={() => handleServiceClick(service.ID_service)}>{service.ID_service}</td>
                                <td>{service.Service_name}</td>
                            </tr>
                            {service.subservices && service.subservices.length > 0 && (
                                <tr>
                                    <td colSpan="2">
                                        <table className={style.subTable}>
                                            <thead>
                                                <tr>
                                                    <th>ID услуги</th>
                                                    <th>Услуга</th>
                                                    <th>Цена</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {service.subservices.map(subservice => (
                                                    <tr key={subservice.ID_subservice}>
                                                        <td style={{cursor:'pointer'}}onClick={() => handleSubserviceClick(subservice.ID_subservice)}>{subservice.ID_subservice}</td>
                                                        <td>{subservice.Subervice_name}</td>
                                                        <td>{subservice.Price}</td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            )}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
            {isModalServiceCreate && (
            <div className={style.modalService}>
                <button style={{cursor:'pointer'}}className={style.close}onClick={() => setIsModalServiceCreate(false)}>&times;</button>
                <h4>Создание нового направления</h4>
                    <input type="text" placeholder="Направление" 
                    value={NameService}
                    onChange={(e) => setNameService(e.target.value)}/>
                    <label>
                    <input type="file" className={style.customImageButton} placeholder="Фото" 
                    accept="image/*" onChange={handleImgChange}/>
                    Выбрать иконку
                    </label>
                <button className = {style.button_create}type="submit" onClick={handleCreate}>создать</button>
                </div>
            )}
            {isModalSubserviceCreate && (
            <div className={style.modalCreateSubservice}>
                <button style={{cursor:'pointer'}}className={style.close}onClick={() => setIsModalSubserviceCreate(false)}>&times;</button>
                <h4>Создание новой услуги</h4>
                    <input type="text" placeholder="Услуга" 
                    value={NameSubservice}
                    onChange={(e) => setNameSubservice(e.target.value)}/>
                    <input type="text" placeholder="ID направления" 
                    value={IDservice}
                    onChange={(e) => setIDservice(e.target.value)}/>
                    <input type="text" placeholder="Цена" 
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}/>
                <button className = {style.button_create}type="submit" onClick={handleCreateSubservice}>создать</button>
                </div>
            )}
            {selectedServiceOrSubservice && (
            <div className={style.modal_choice}>
            <h4>Редактировать</h4>
                <button onClick={ServiceUpdateButtonClick}>Направления</button>
                <button onClick={SubserviceUpdateButtonClick}>Услуги</button>
            </div>
            )}
            {createServiceOrSubservice && (
            <div className={style.modal_choice}>
            <h4>Создать</h4>
                <button onClick={ServiceCreateButtonClick}>Направление</button>
                <button onClick={SubserviceCreateButtonClick}>Услугу</button>
            </div>
            )}
            {isModalServiceUpdate && (
            <div className={style.modal}>
                <button style={{cursor:'pointer'}}className={style.close}onClick={() => setIsModalServiceUpdate(false)}>&times;</button>
                <h4 style={{marginBottom:'20px'}}>Редактирование направления</h4>
                <label style={{marginBottom:'10px',marginLeft:'-100px', fontFamily:'Raleway',color: 'black'}}>ID выбранного направления: {service && service.length!=0 ? service: 'выбор пустой'}</label>
                    <input type="text" placeholder="Направление" 
                    value={NameService}
                    onChange={(e) => setNameService(e.target.value)}/>
                    <label>
                    <input type="file" className={style.customImageButton} placeholder="Фото" 
                    accept="image/*" onChange={handleImgChange}/>
                    Выбрать иконку
                    </label>
                <button className = {style.button_create}type="submit" onClick={handleUpdate}>изменить</button>
                </div>
            )}
            {isModalSubserviceUpdate && (
            <div className={style.modalCreateSubservice}>
                <button style={{cursor:'pointer'}}className={style.close}onClick={() => setIsModalSubserviceUpdate(false)}>&times;</button>
                <h4>Редактирование услуги</h4>
                    <label style={{marginBottom:'10px',marginLeft:'-5px',marginTop:'10px', fontFamily:'Raleway',color: 'black'}}>ID выбранной услуги для изменения: {subService && subService.length!=0 ? subService: 'выбор пустой'}</label>
                    <input type="text" placeholder="Услуга" 
                    value={NameSubservice}
                    onChange={(e) => setNameSubservice(e.target.value)}/>
                    <input type="text" placeholder="ID направления" 
                    value={IDservice}
                    onChange={(e) => setIDservice(e.target.value)}/>
                    <input type="text" placeholder="Цена" 
                    value={Price}
                    onChange={(e) => setPrice(e.target.value)}/>
                <button className = {style.button_create}type="submit" onClick={handleUpdateSubservice}>изменить</button>
                </div>
            )}
            {isModalInfo&&(
                <div className={style.ModalInfo}>
                    <p>{updateMessage}</p>
                </div>
            )}

        </div>
    );
};

export default ServicesForAdmin;
