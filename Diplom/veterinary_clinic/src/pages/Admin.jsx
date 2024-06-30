import AccPageAdminElement from "../components/AccPageAdminElement";
import AppoitmentsComponent from '../components/Appoitment'
import ClientsData from '../components/ClientsData';
import PetsData from '../components/PetsData';
import { getAllUser } from "../http/userAPI";
import {getAllPatients} from '../http/patientAPI'
import { AppContext } from "../AppContext";
import {getAllAppoitmentForAdmin} from '../http/appoitmentAPI';
import React from "react";
import ServicesForAdmin from '../components/serviceForAdmin'
import {getAllServices} from '../http/servicesAPI'


function Admin(props)
{
    const { user } = React.useContext(AppContext);
    const [dataUser, setdataUser] = React.useState({})
    const [fetchingUser, setFetchingUser] = React.useState(true)
    const { patient } = React.useContext(AppContext);
    const [dataPatient, setdataPatient] = React.useState({})
    const [fetchingPatient, setFetchingPatient] = React.useState(true)
    const{Appoitment}=React.useContext(AppContext);
    const [dataAppoitment, setdataAppoitment] = React.useState({})
    const [fetchingAppoitment, setFetchingAppoitment] = React.useState(true)
    const{service}=React.useContext(AppContext);
    const [dataService, setdataService] = React.useState({})
    const [fetchingService, setFetchingService] = React.useState(true)
    const { setselectedClientId,selectedClientId } = React.useContext(AppContext);
    const [selectedCardId, setSelectedCardId] = React.useState(null);
    const [selectedSection, setSelectedSection] = React.useState('clients');

    React.useEffect(() => {
        const fetchData = async () => 
        {
          console.log("Fetching data for user:", user);
          if (user && user.ID_owner) {
            try {
              const data = await getAllUser();
              setdataUser(data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
                setFetchingUser(false);
            }
          }
        };
        fetchData();
      }, [user]);
      React.useEffect(() => {
        const fetchData = async () => 
        {
          console.log("Fetching data for patient:", patient);
            try {
              const data = await getAllPatients();
              setdataPatient(data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
                setFetchingPatient(false);
            }
        };
        fetchData();
      }, [patient]);
      React.useEffect(() => {
        const fetchData = async () => 
        {
          console.log("Fetching data for patient:", Appoitment);
            try {
              const data = await getAllAppoitmentForAdmin();
              setdataAppoitment(data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
              setFetchingAppoitment(false);
            }
        };
        fetchData();
      }, [Appoitment]);
      React.useEffect(() => {
        const fetchData = async () => 
        {
          console.log("Fetching data for patient:", patient);
            try {
              const data = await getAllServices();
              setdataService(data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
                setFetchingService(false);
            }
        };
        fetchData();
      }, [service]);

      if (fetchingUser) {
        return <p>Loading...</p>;
      }
    
      if (!dataUser) {
        return <p>No user data found.</p>;
      }
      if (fetchingPatient) {
        return <p>Loading...</p>;
      }
    
      if (!dataPatient) {
        return <p>No user data found.</p>;
      }
      if (fetchingAppoitment) {
        return <p>Loading...</p>;
      }
    
      if (!dataAppoitment) {
        return <p>No user data found.</p>;
      }
      const handleSelectClient = (client) => {
        setSelectedCardId(client.ID_owner); 
        setselectedClientId(client.ID_owner); 
        console.log('Выбранный клиент для удаления',client.ID_owner);
        console.log('Выбранный клиент для удаления');
    };
    return(
        <>
            <AccPageAdminElement data={dataUser} setSelectedSection={setSelectedSection} pet={dataPatient}/>
            {selectedSection === 'clients' && (
              <>
              <h3 id="persdata"style={{ marginLeft: '600px',marginTop:'-460px',marginBottom:'30px',fontFamily:'EB+Garamond',fontSize:'30px',color:'#000000',fontWeight:'300' }}>
                  Клиенты
              </h3>
             {dataUser && dataUser.length > 0 ? (
                    dataUser.map(user => (
                        <ClientsData key={user.id} handleSelectClient = {handleSelectClient}data={user} />
                    ))
                ) : (
                    <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Карточка клиента</p>
            )}
            </>
          )}
           {selectedSection === 'patients' && (
            <>
            <h3 id="persdata"style={{ marginLeft: '600px',marginTop:'-460px',marginBottom:'30px',fontFamily:'EB+Garamond',fontSize:'30px',color:'#000000',fontWeight:'300' }}>
                Пациенты
            </h3>
            {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map(patient => (
                        <PetsData key={patient.id} handleSelectClient = {handleSelectClient}pet={patient} />
                    ))
                ) : (
                    <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Карточка пациента</p>
            )}
            </>
          )}
          {selectedSection === 'appoitment' && (
          <>
          <h3 id="persdata"style={{ marginLeft: '500px',marginTop:'-460px',marginBottom:'30px',fontFamily:'EB+Garamond',fontSize:'30px',color:'#000000',fontWeight:'300' }}>
                Записи
          </h3>
            {/* {dataAppoitment && dataAppoitment.length > 0 ? (
                    dataAppoitment.map(appoitment => (
                        <AppoitmentsComponent key={appoitment.id} handleSelectClient = {handleSelectClient}data={appoitment} />
                    ))
                ) : (
                    <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Карточка пациента</p>
            )} */}
            <AppoitmentsComponent key={dataAppoitment.id} handleSelectClient = {handleSelectClient}data={dataAppoitment} />
            </>
            )}
            {selectedSection === 'service' && (
          <>
          <h3 id="persdata"style={{ marginLeft: '500px',marginTop:'-460px',marginBottom:'30px',fontFamily:'EB+Garamond',fontSize:'30px',color:'#000000',fontWeight:'300' }}>
                Направления и услуги
            </h3>
            {dataService && dataService.length > 0 ? (
                    // dataService.map(service => (
                        <ServicesForAdmin key={service.id} handleSelectClient = {handleSelectClient}data={dataService} />
                    //))
                ) : (
                    <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Карточка пациента</p>
            )}
            </>
            )}
        </>
    );
};
export default Admin;