import { makeAutoObservable } from 'mobx';

class CityClinic {
    ID_city = null
    City = null

    constructor() {
        makeAutoObservable(this)
    }

    setUserData(data) {
        this.City = data.City || "";
    }

}

export default CityClinic;