import { makeAutoObservable } from 'mobx';

class DoctorClinic {
    ID_doctor = null
    Name = null
    Surname = null
    Patronymic = null
    Phone = null
    Information = null
    Experience = null
    Date_birth = null

    constructor() {
        makeAutoObservable(this)
    }
    login({ID_doctor}) {
        this.ID_owner = ID_doctor
    }

    setUserData(data) {
        this.Name = data.Name || "";
        this.Surname = data.Surname || "";
        this.Patronymic = data.Patronymic || "";
        this.Phone = data.Phone || "";
        this.Information = data.Information || "";
        this.Experience = data.Experience || "";
        this.Date_birth = data.Date_birth || "";
    }

}

export default DoctorClinic;