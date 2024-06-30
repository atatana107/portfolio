import { makeAutoObservable } from 'mobx';

class SubserviceClinic {
    ID_subservice = null
    Subservice_name = null
    Price=null;

    constructor() {
        makeAutoObservable(this)
    }

    setUserData(data) {
        this.Subservice_name = data.Subservice_name || "";
        this.Price = data.Price || "";
        this.ID_subservice = data.ID_subservice || "";
    }

}

export default SubserviceClinic;