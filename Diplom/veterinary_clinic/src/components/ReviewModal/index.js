import style_rev from './ReviewModal.module.css';
import { createReview } from '../../http/reviewAPI.js'; // Импортируем созданную API функцию
import { AppContext } from '../../AppContext.js';
import { useParams } from "react-router-dom";
import React from 'react';
function ReviewModal(props)
{

    const [reviewText, setReviewText] = React.useState(''); // Состояние для хранения текста отзыва
    const [reviewDoctor, setReviewDoctor] = React.useState(''); // Состояние для хранения текста отзыва
    const { user } = React.useContext(AppContext); // Получаем текущего пользователя из контекста
    const { id } = useParams(); 
    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    

    const handleSubmit = async () => {
        try {
            if (!user || !user.ID_owner) {
                console.error('Данные пользователя недоступны.');
                return;
            }
            const reviewData = {
                Review: reviewText,
                ID_doctor: id, // ID доктора, вероятно, передается через props
                ID_owner: user.ID_owner, // ID пользователя из контекста
            };
            const createdReview = await createReview(reviewData);
            console.log('Отзыв создан: ', createdReview);
            props.OnClose(); // Закрываем модальное окно после создания отзыва
        } catch (error) {
            console.error('Ошибка при создании отзыва:', error);
        }
    };

    const handleShadowClick = () => {
        props.OnClose(); // Вызов метода, который закрывает модальное окно
    };
    return(
        <div className={style_rev.modal} onClick={handleShadowClick}>
            <div className={style_rev.modalContent}  onClick={handleContentClick}>
                <span className={style_rev.close} onClick={props.OnClose}>&times;</span>
                <p>Оставить отзыв</p>
                <div className={style_rev.inputWrapper}>
                    <input
                        type="text" placeholder='Отзыв'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                    />
                </div>
                {/* <input
                        type="text" placeholder='ID врача'
                        value={reviewDoctor}
                        onChange={(e) => setReviewDoctor(e.target.value)}/> */}
                <button onClick={handleSubmit}className={style_rev.button}>отправить</button>
            </div>
        </div>
    );
};
export default ReviewModal;