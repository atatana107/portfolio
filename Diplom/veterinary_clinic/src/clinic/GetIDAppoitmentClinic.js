import { makeAutoObservable } from 'mobx';

class AppointmentClinic{
    ID = null
    ID_owner = null
    ID_service = null
    ID_subservice = null
    Date_appointment = null
    State_reservation=null
    ID_city = null
    Cost=null
    ID_doctor = null

    constructor() {
        makeAutoObservable(this)
    }

    setUserData(data) {
        this.ID = data.ID || "";
        this.ID_owner = data.ID_owner||"";
        this.ID_service = data.ID_service||"";
        this.ID_subservice = data.ID_subservice||"";
        this.Date_appointment = data.Date_appointment||"";
        this.State_reservation = data.State_reservation||"";
        this.ID_city = data.ID_city||"";
        this.Cost = data.Cost || "";
        this.ID_doctor = data.ID_doctor || "";
    }

}

export default AppointmentClinic;