import React from 'react';
import GroupInformation from '../components/GroupPageInformation';
// import { AppContext } from '../AppContext.js';
// import {getAllDoctors} from '../http/doctorAPI.js'

function GroupPage(props)
{
    
    // const { doctor } = React.useContext(AppContext);
    // const [dataDoctor, setdataDoctor] = React.useState({})
    // const [fetchingDoctor, setFetchingDoctor] = React.useState(true)

    // React.useEffect(() => {
    //     const fetchData = async () => 
    //     {
    //         console.log("Fetching data for doctor:", doctor);
    //         try 
    //         {
    //           const data = await getAllDoctors(doctor.ID_doctor);
    //           setdataDoctor(data);
    //         } 
    //         catch (error) 
    //         {
    //           console.error('Error fetching user data:', error);
    //         } 
    //         finally {
    //             setFetchingDoctor(false);
    //         }
    //     };
    
    //     fetchData();
    //   }, [doctor]);

    //   if (fetchingDoctor) {
    //     return <p>Loading...</p>;
    //   }
    
    //   if (!dataDoctor) {
    //     return <p>No doctor data found.</p>;
    //   }

    return(
   <>
   <GroupInformation/>
   </>
    );
};
export default GroupPage;
