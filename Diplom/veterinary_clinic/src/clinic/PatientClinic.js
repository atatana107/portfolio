import { makeAutoObservable } from 'mobx';

class PatientClinic {
    ID_owner = null
    Name = null
    Age=null
    Breed=null
    ID_patient = null
    Gender=null
    Type_age=null
    Type=null


    constructor() {
        makeAutoObservable(this)
    }

    setUserPatient(data) {
        this.Name = data.Name || "";
        this.Age = data.Age || "";
        this.Breed = data.Breed || "";
        this.Gender = data.Gender || "";
        this.Type = data.Type || "";
        this.Type=data.Type || "";
        this.ID_owner = data.ID_owner || "";
    }

}

export default PatientClinic;