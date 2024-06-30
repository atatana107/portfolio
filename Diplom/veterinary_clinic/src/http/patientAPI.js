import { guestInstance, authInstance } from './index.js';
// получение всех питомцев с мед картами, анализами и владельцами
export const getAllPatients = async () => {
    try {
        const response = await authInstance.get(`patient/getall`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пациентов:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пациентов:', e);
        return null;
    }
}
// удаление питомца
export const deletePatient = async (ID_patient) => {
    try {
        const response = await authInstance.delete(`patient/delete/${ID_patient}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пациентов:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пациентов:', e);
        return null;
    }
}
// создание питомца
export const createPatient = async (patientData) => {
    try {
        console.log("Формируем запрос на создание пользователя:", patientData);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.post('patient/create', patientData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пациентов:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пациентов:', e);
        return null;
    }
}

// создание мед карты
export const createMedCard = async (dataCard) => {
    try {
        console.log("Формируем запрос на создание пользователя:", dataCard);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.post('med_card/create', dataCard, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пациентов:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пациентов:', e);
        return null;
    }
}
// обновление питомца
export const updatePatient = async (ID_patient, dataPatient) => {
    try {
        const response = await authInstance.put(`patient/update/${ID_patient}`, dataPatient, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200) {
            return response.data;
        } else {
            console.error('Ошибка при получении данных пациентов:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при получении данных пациентов:', e);
        return null;
    }
}
// создание мед карты
export const createAnalyze = async (dataAnalyze) => {
    try {
        console.log("Формируем запрос на создание анализа:", dataAnalyze);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.post('analize/create', dataAnalyze, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при создании анализа:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при создании анализа:', e);
        return null;
    }
}
// удаление анализа
export const deleteAnalyze = async (ID) => {
    try {
        console.log("Формируем запрос на создание анализа:", ID);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.delete(`analize/delete/${ID}`);
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при удалении анализа:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при удалении анализа:', e);
        return null;
    }
}
// удаление анализа
export const deleteMedCard = async (ID_card) => {
    try {
        console.log("Формируем запрос на создание анализа:", ID_card);
        // Передаем данные и конфигурационные опции отдельно
        const response = await authInstance.delete(`med_card/delete/${ID_card}`);
        if (response.status === 200 || response.status ===201) {
            return response.data;
        } else {
            console.error('Ошибка при удалении карты:', response.statusText);
            return null;
        }
    } catch (e) {
        console.error('Ошибка при удалении карты:', e);
        return null;
    }
}