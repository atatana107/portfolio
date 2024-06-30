import React from 'react';
import UserClinic from './clinic/UserClinic';
import PatientClinic from './clinic/PatientClinic';
import DoctorClinic from './clinic/doctorClinic';
import ServiceClinic from './clinic/serviceClinic';
import CityClinic from './clinic/cityClinic';
import { createContext, useState } from 'react';
import subServiceClinic from './clinic/subserviceClinic';
import DateAppointmentClinic from './clinic/dateAppoitmentClinic';
import AppoitmentClinic from './clinic/GetIDAppoitmentClinic';
import { getAllDoctors } from './http/doctorAPI';

export const AppContext = createContext();

const AppContextProvider = (props) => {
    const [city, setCity] = React.useState(new CityClinic());
    const [patient, setPatient] = React.useState(new PatientClinic());
    const [user, setUser] = React.useState(new UserClinic());
    const [service, setService] = React.useState(new ServiceClinic());
    const [doctor, setDoctor] = React.useState(new DoctorClinic());
    const [dateAppoitment, setDateAppoitment] = React.useState(new DateAppointmentClinic());
    const [subService, setSubService] = React.useState(new subServiceClinic());
    const [Appoitment, setAppoitment] = React.useState(new AppoitmentClinic());
    const [selectedClientId, setselectedClientId] = React.useState(null); 
    const [selectedPatienttId, setselectedPatienttId] = React.useState(null);
    const [selectedAnalyzeId, setSelectedAnalyzeId] = useState(null);
    const [CardId, setCardId] = useState(null);
    const context = {
        setUser, 
        user,
        service,
        setService,
        setSubService,
        subService,
        patient,
        setPatient,
        doctor: new DoctorClinic(),
        selectedAnalyzeId, 
        setSelectedAnalyzeId,
        CardId, 
        setCardId,
        Appoitment,
        setAppoitment,
        dateAppoitment,
        setDateAppoitment,
        selectedClientId,
        setselectedClientId,
        selectedPatienttId,
        setselectedPatienttId,
        doctor,
        setDoctor,
        city, // Передаем текущее состояние города
        setCity, // Передаем функцию для обновления города
    };
    return (
        <AppContext.Provider value={context}>
            {props.children}
        </AppContext.Provider>
    );
}

export {AppContextProvider}
 


