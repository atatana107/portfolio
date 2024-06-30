import { guestInstance, authInstance } from './index.js';
import {jwtDecode} from 'jwt-decode';


export const registration = async (Name, Surname, Patronymic, Phone, Login, Password, Information) => {
    try {
        const response = await guestInstance.post('owner/registration', {Login, Password, Name, Surname, role: 'USER', Patronymic, Phone, Information})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}


export const signup = async (Login, Password) => {
    try {
        const response = await guestInstance.post('user/signup', {Login, Password, role: 'USER'})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}

export const login = async (Login, Password) => {
    try {
        const response = await guestInstance.post('owner/login', {Login, Password})
        const token = response.data.token
        const user = jwtDecode(token)
        localStorage.setItem('token', token)
        return user
    } catch (e) {
        alert(e.response.data.message)
        return false
    }
}
export const logout = () => {
    localStorage.removeItem('token')
}

export const check = async () => {
    let userToken, userData
    try {
        userToken = localStorage.getItem('token')
        // если в хранилище нет действительного токена
        if (!userToken) {
            return false
        }
        // токен есть, надо проверить его подлинность
        const response = await authInstance.get('owner/check')
        userToken = response.data.token
        userData = jwtDecode(userToken)
        localStorage.setItem('token', userToken)
        return userData
    } catch(e) {
        localStorage.removeItem('token')
        return false
    }
    
}

// получить данные пользователя для ЛК
export const userGetOne = async (ID_owner) => {
    try {
        const response = await authInstance.get(`owner/getone/${ID_owner}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пользователя:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пользователя:', e);
        return null;
    }
}

// получить данные пользователя для ЛК
export const updateUser = async (ID_owner, userData) => {
    try {
        const response = await authInstance.put(`owner/update/${ID_owner}`, userData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пользователя:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пользователя:', e);
        return null;
    }
}


// получить данные пользователя для ЛК
export const getAllUser = async () => {
    try {
        const response = await authInstance.get(`owner/getall`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пользователя:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пользователя:', e);
        return null;
    }
}

// создание пользователя
export const createUser = async (userData) => {
    try {
        console.log("Формируем запрос на создание пользователя:", userData);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.post('owner/create', userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200|| response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при создании пользователя:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при создании пользователя:', e);
        return null;
    }
}

// получить питомцев пользователя для ЛК
export const userPetsAll = async (ID_owner) => {
    try {
        const response = await authInstance.get(`owner/${ID_owner}/pets/getall`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных питомцев:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных питомцев:', e);
        return null;
    }
}
// удаление клиента
export const deleteUser = async (ID_owner) => {
    try {
        const response = await authInstance.delete(`owner/delete/${ID_owner}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных питомцев:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных питомцев:', e);
        return null;
    }
}
