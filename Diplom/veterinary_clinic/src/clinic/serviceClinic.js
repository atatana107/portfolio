import { makeAutoObservable } from 'mobx';

class ServiceClinic {
    ID_service = null
    Service_name = null

    constructor() {
        makeAutoObservable(this)
    }

    setUserData(data) {
        this.Service_name = data.Service_name || "";
    }

}

export default ServiceClinic;