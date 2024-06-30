
import SignUp from "../components/SignUp/index.js";
import {getAllAppoitmentCity,getOneCity} from '../http/appoitmentAPI.js';
import React, { useState } from 'react';
import { AppContext } from "../AppContext.js";
import SignUPBranchChoice from '../components/SignUPBranchChoice/index.js';
import SignUpServiceChoice from '../components/SignUpServiceChoice';
import SignUpSubServiceChoice from '../components/SignUpSubServiceChoice';
import SignUpDoctorChoice from '../components/SignUpDoctorChoice';
import SignUpDate from '../components/SignUpDate'




function SignUpPage(props)
{
    const[ChoiceBranch,setChoiceBranch] = React.useState(false);
    const[ChoiceService,setChoiceService] = React.useState(false);
    const[ChoiceSubService,setChoiceSubService] = React.useState(false);
    const[ChoiceDoc,setChoiceDoc] = React.useState(false);
    const[ChoiceDateTime,setChoiceDateTime] = React.useState(false);
    const { city } = React.useContext(AppContext);
    const [dataAppoitment, setdataAppoitment] = React.useState({})
    const [fetchingAppoitment, setFetchingAppoitment] = React.useState(true)


    React.useEffect(() => {
        const fetchData = async () => 
        {
            console.log("Fetching data for city:", city);
            try 
            {
              const data = await getAllAppoitmentCity(city.ID_city);
              setdataAppoitment(data);
            } 
            catch (error) 
            {
              console.error('Error fetching city data:', error);
            } 
            finally {
                setFetchingAppoitment(false);
            }
        };
    
        fetchData();
      },[city]);


      // if (fetchingAppoitment) {
      //   return <p>Loading...</p>;
      // }
    
      // if (!dataAppoitment) {
      //   return <p>No city data found.</p>;
      // }


    return(
        <>
        <SignUp OnClickBranch={()=>setChoiceBranch(true)}
                OnClickService={()=>setChoiceService(true)}
                OnClickSubService={()=>setChoiceSubService(true)}
                OnClickDoc={()=>setChoiceDoc(true)}
                OnClickDateTime={()=>setChoiceDateTime(true)}
        />
        {ChoiceBranch?<SignUPBranchChoice dataAppoitment={dataAppoitment} OnCloseBranch={()=>setChoiceBranch(false)}/>:null}
        {ChoiceService?<SignUpServiceChoice OnCloseService={()=>setChoiceService(false)}/>:null}
        {ChoiceSubService?<SignUpSubServiceChoice OnCloseService={()=>setChoiceSubService(false)}/>:null}
        {ChoiceDoc?<SignUpDoctorChoice OnCloseDoc={()=>setChoiceDoc(false)}/>:null}
        {ChoiceDateTime?<SignUpDate OnClickDateTime={()=>setChoiceDateTime(false)}/>:null}
        </>

    );
};
export default SignUpPage;