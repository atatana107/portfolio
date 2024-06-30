import { makeAutoObservable } from 'mobx';

class DateAppointmentClinic{
    Date_appoitment = null

    constructor() {
        makeAutoObservable(this)
    }

    setUserData(data) {
        this.Date_appoitment = data.Date_appoitment || "";
    }

}

export default DateAppointmentClinic;