import { guestInstance, authInstance } from './index.js';

export const getAllDoctors = async()=> {
    try {
        const response = await guestInstance.get('doctor/services/getall');
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных врачей:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных врачей:', e);
        return null;
    }
}
export const getOneDoctor = async(ID_doctor)=> {
    try {
        const response = await guestInstance.get(`doctor/getone/${ID_doctor}`);
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
