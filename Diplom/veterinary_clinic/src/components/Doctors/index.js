import styles from './Doctors.module.css';
import React, { useState } from 'react';
import {Link} from 'react-router-dom';

function Doctors() {
    const initialImages = [1, 2, 3,  6, 7, 8,9, 10,11, 12, 13, 14,15]; // Массив индексов доступных изображений
    const totalImages = initialImages.length; // Общее количество изображений

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevious = () => {
        setCurrentImageIndex((currentImageIndex - 1 + totalImages) % totalImages);
    };

    const handleNext = () => {
        setCurrentImageIndex((currentImageIndex + 1) % totalImages);
    };
    
    const isButtonDisabled = (direction) => {
        if (direction === "previous") {
            return currentImageIndex === 0;
        } else if (direction === "next") {
            return currentImageIndex >= totalImages - 6; // Изменение условия на конец массива изображений
        }
        return false;
    };
    const handleScrollToTop = () => {
        window.scrollTo({ top:0}); // Прокрутить страницу в начало с плавной анимацией
      };
    return (
        <section id = "Doctors_section"className={styles.doctors}>
            <h3 className={styles.doctors_title}>Наши специалисты</h3>
            <div className={styles.doctors_container}>
                <button className={styles.button_left} onClick={handlePrevious} disabled={isButtonDisabled("previous")}>
                    &lt;
                </button>
                <nav className={styles.doctors_gallery}>
                     {initialImages.slice(currentImageIndex, currentImageIndex + 5).map((index) => (
                           <Link > <img key={index} src={`images/doctor_${index + 1}.jpg`} alt={`doctor_${index + 1}`} /></Link> 
                    ))}
                </nav>
                <button className={styles.button_right} onClick={handleNext} disabled={isButtonDisabled("next")}>
                    &gt;
                </button>
            </div>
           <Link to="/group_page" onClick={handleScrollToTop}><button className={styles.show_doctors}>посмотреть всех</button></Link> 
        </section>
    );
}

export default Doctors;
