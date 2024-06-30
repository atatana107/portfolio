import { guestInstance, authInstance } from './index.js';
import {jwtDecode} from 'jwt-decode';

//создание отзыва
export const createReview = async (reviewData) => {
    try {
        const response = await authInstance.post('/reviews/create', reviewData);
        return response.data;
    } catch (e) {
        console.error('Ошибка при создании отзыва:', e);
        throw e;
    }
};
