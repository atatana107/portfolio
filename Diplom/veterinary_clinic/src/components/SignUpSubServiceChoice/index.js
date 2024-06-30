import stylesubservice from './SignUpSubServiceChoice.module.css';
import { useRef } from 'react';
import {getAllSubserviceByService} from '../../http/appoitmentAPI';
import { AppContext } from '../../AppContext';
import { useEffect, useContext } from 'react';
import React from 'react';

function SignUpSubServiceChoice(props){
    const modalRef = useRef();
    const {service} = useContext(AppContext);
    const {setSubService} = useContext(AppContext);
    const [dataSubservice, setdataSubservice] = React.useState({})
    const [fetchingservice, setFetchingService] = React.useState(true)

    useEffect(() => {
        function handleClickOutside(event) {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            props.OnCloseService(); // Вызываем функцию закрытия модального окна
          }
        }
    
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

      React.useEffect(() => {
        const fetchData = async () => 
        {
            console.log("Fetching data for service:", service);
            try 
            {
              const data = await getAllSubserviceByService(service.ID_service);
              setdataSubservice(data);
            } 
            catch (error) 
            {
              console.error('Error fetching service data:', error);
            } 
            finally {
              setFetchingService(false);
            }
        };
    
        fetchData();
      },[service]);
      if (fetchingservice) {
        return <p>Loading...</p>;
      }
    
      if (!dataSubservice) {
        return <p>No service data found.</p>;
      }

      const handleSubServiceSelect = (service) => {
        setSubService(service);
        console.log('Данные о выбранной услуге');
        props.OnCloseService();
      };

      //const subservices = ["Первичный осмотр хирурга", "Первичный осмотр онколога", "Первичный осмотр терапевта", "Первичный осмотр репродуктолога", "Первичный осмотр стоматолога", "Первичный осмотр невролога", "Первичный осмотр офтальмолога", "Первичный осмотр дерматолога", "Первичный осмотр кардиолога"];
  
    return(
    <div className={stylesubservice.modal_background__serv_ch}>
    <div ref={modalRef} id="modal" className={stylesubservice.modal_serv_ch}>
        <div className={stylesubservice.modal_content_serv_ch}>
        <h2>Выберите услугу</h2>
        <div className={stylesubservice.service_list}>
        <div className={stylesubservice.service_items}>
          {
            dataSubservice.map((service, index) => (
                <button key={index}  onClick={() => handleSubServiceSelect(service)} className={index === 0 ? stylesubservice.button_One__serv_ch : stylesubservice.button_Two__serv_ch}>{service.Subervice_name}</button>
          ))}
        </div>
        </div>
        </div>
    </div>
    </div>
        );
}
export default SignUpSubServiceChoice;