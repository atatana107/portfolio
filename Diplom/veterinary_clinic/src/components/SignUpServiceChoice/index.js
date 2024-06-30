import styleservice from './SignUpServiceChoice.module.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import {getOneCity} from '../../http/appoitmentAPI.js';
import React from 'react';
import { AppContext } from "../../AppContext.js";

function SignUpServiceChoice(props){
    const modalRef = useRef();
    const {city} = React.useContext(AppContext);
    const {setService} = React.useContext(AppContext);
    const [dataServicesOneCity, setdataServicesOneCity] = React.useState({})
    const [fetchingServicesOneCity, setFetchingServicesOneCity] = React.useState(true)

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
            console.log("Fetching data for city:", city);
            try 
            {
              const data = await getOneCity(city.ID_city);
              setdataServicesOneCity(data);
            } 
            catch (error) 
            {
              console.error('Error fetching city data:', error);
            } 
            finally {
              setFetchingServicesOneCity(false);
            }
        };
    
        fetchData();
      },[city]);
      if (fetchingServicesOneCity) {
        return <p>Loading...</p>;
      }
    
      if (!dataServicesOneCity) {
        return <p>No city data found.</p>;
      }
      const handleServiceSelect = (service) => {
        setService(service);
        console.log('Данные о выбранной услуге', service);
        props.OnCloseService();
      };
  
    return(
    <div className={styleservice.modal_background__serv_ch}>
    <div ref={modalRef} id="modal" className={styleservice.modal_serv_ch}>
        <div className={styleservice.modal_content_serv_ch}>
        <h2>Выберите направление</h2>
        <div className={styleservice.service_list}>
        <div className={styleservice.service_items}>
         {dataServicesOneCity.map((appoitment, index) => (
              <button
                key={index}
                onClick={() => handleServiceSelect(appoitment)}
                className={index === 0 ? styleservice.button_One__serv_ch : styleservice.button_Two__serv_ch}>
                {appoitment.Service_name}
              </button>
          ))}
        </div>
        </div>
        </div>
    </div>
    </div>
        );
}
export default SignUpServiceChoice;