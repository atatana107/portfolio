import {guestInstance,authInstance} from './index.js';

export const getAllServices = async()=> {
    try {
        const response = await guestInstance.get('services/getall');
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных направлений:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных направлений:', e);
        return null;
    }
}
export const getOneService = async(ID_doctor)=> {
    try {
        const response = await guestInstance.get(`services/getone/${ID_doctor}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных врача:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных врача:', e);
        return null;
    }
}
// создание направления
export const createService = async (dataService) => {
    try {
        console.log("Формируем запрос на создание направления:", dataService);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.post('services/create', dataService, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных направления:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных направления:', e);
        return null;
    }
}
// обновление направления
export const updateService = async (ID_service,dataService) => {
    try {
        console.log("Формируем запрос на обновление направления:", dataService);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.put(`services/update/${ID_service}`, dataService, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при обновлении данных направления:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при обновлении данных направления:', e);
        return null;
    }
}
// обновление услуги
export const updateSubservice = async (ID_subservice,dataSubservice) => {
    try {
        console.log("Формируем запрос на обновление услуги:", dataSubservice);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.put(`subservices/update/${ID_subservice}`, dataSubservice, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при обновлении данных услуги:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при обновлении данных услуги:', e);
        return null;
    }
}
// создание услуги
export const createSubservice = async (dataSubservice) => {
    try {
        console.log("Формируем запрос на создание услуги:", dataSubservice);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.post('subservices/create', dataSubservice, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных услуги:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных услуги:', e);
        return null;
    }
}