import { makeAutoObservable } from 'mobx';

class UserClinic {
    ID_owner = null
    Login = null
    isAuth = false
    isAdmin = false
    Name = null
    Surname = null
    Patronymic = null
    Phone = null
    Information = null
    role = null

    constructor() {
        makeAutoObservable(this)
    }

    login({ID_owner, Login, role, Name}) {
        this.ID_owner = ID_owner
        this.Login = Login
        this.isAuth = true
        this.isAdmin = role === 'ADMIN'
    }

    setUserData(data) {
        this.Name = data.Name || "";
        this.Surname = data.Surname || "";
        this.Patronymic = data.Patronymic || "";
        this.Phone = data.Phone || "";
        this.Information = data.Information || "";
    }


    logout() {
        this.ID_owner = null
        this.Login = null
        this.isAuth = false
        this.isAdmin = false
    }
}

export default UserClinic;