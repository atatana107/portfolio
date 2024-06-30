import PetsCard from "../components/PetsCard";
import PersonalData from '../components/PersonalData';
import ReviewData from '../components/ReviewData';
import AccPageElement from "../components/AccPageElement";
import { AppContext } from '../AppContext.js';
import React from "react";
import PDF from '../components/PDF/index.js';
import PDFA from '../components/PDFA/index.js'
import { userGetOne,userPetsAll } from '../http/userAPI.js';
function PersonalAccount(props)
{
    const { user } = React.useContext(AppContext);
    const { patient } = React.useContext(AppContext);
    const [dataUser, setdataUser] = React.useState({})
    const [fetchingUser, setFetchingUser] = React.useState(true)
    const [fetchingPets, setFetchingPets] = React.useState(true);
    const [dataPets, setdataPets] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => 
        {
          console.log("Fetching data for user:", user);
          if (user && user.ID_owner) {
            try {
              const data = await userGetOne(user.ID_owner);
              setdataUser(data);
            } catch (error) {
              console.error('Error fetching user data:', error);
            } finally {
                setFetchingUser(false);
            }
          }
        };
        const fetchDataPets = async () => {
          console.log("Fetching pets for user:", user);
          if (user && user.ID_owner) {
              try {
                  const petsData = await userPetsAll(user.ID_owner); // Получение данных питомцев
                  setdataPets(petsData);
              } catch (error) {
                  console.error('Error fetching user pets:', error);
              } finally {
                  setFetchingPets(false);
              }
          }
      };
    
        fetchData();
        fetchDataPets();
      }, [user]);
      
      if (fetchingUser || fetchingPets) {
        return <p>Loading...</p>;
      }
    
      if (!dataUser) {
        return <p>No user data found.</p>;
      }
    return(
        
        <>
        <AccPageElement data={dataUser} petsCount={dataPets? dataPets.length: 0} appCount={dataUser.appoitments.length}/>
        <h3 id="persdata"style={{ marginLeft: '600px',marginTop:'-90px',marginBottom:'30px',fontFamily:'EB+Garamond',fontSize:'30px',color:'#000000',fontWeight:'300' }}>
            Личные данные
        </h3>
        <PersonalData data={dataUser}/>
        <h3 id="pets" style={{ marginLeft: '600px',marginTop:'100px',marginBottom:'30px',fontFamily:'EB+Garamond',fontSize:'30px',color:'#000000',fontWeight:'300' }}>
            Мои питомцы
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {dataPets && dataPets.length > 0 ? (
                    dataPets.map(pet => (
                        <PetsCard key={pet.id} pet={pet} />
                    ))
                ) : (
                    <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Здесь будут отображаться ваши питомцы</p>
                )}
            </div>
        <h3 id="revdata" style={{ marginLeft: '600px',marginTop:'100px',marginBottom:'30px',fontFamily:'EB+Garamond',fontSize:'30px',color:'#000000',fontWeight:'300' }}>
            Записи на приём
        </h3>
        {dataUser.appoitments && dataUser.appoitments.length > 0 ? (
                    dataUser.appoitments.map(appoitment => (
                        <ReviewData key={appoitment.id} appoitment={appoitment} />
                    ))
                ) : (
                    <p style={{ marginLeft: '600px',marginBottom:'300px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Здесь будут отображаться ваши записи на прием</p>
                )}
        </>
    );
};
export default PersonalAccount;