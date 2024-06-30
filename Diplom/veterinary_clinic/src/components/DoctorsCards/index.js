import styles from './DoctorsCards.module.css';
import defaultImage from './review_img_default.png'; 


function getYearsText(age) {
    if (age % 10 === 0 || (age % 10 >= 5 && age % 10 <= 9) || (age >= 11 && age <= 14)) {
        return 'лет';
    } else if (age % 10 === 1) {
        return 'год';
    } else {
        return 'года';
    }
}



function DoctorsCard(props)
{
    const {doctor} = props;
    if (!doctor || Object.keys(doctor).length === 0) {
        return <p>No doctor data available.</p>; // Handle empty or null data case
    }
    const { Name, Surname, Patronymic, Experience, img} = doctor;
    const fullName = `${Name ? Name : 'Имя врача'} ${Patronymic ? Patronymic : 'Отчество врача'}`;

    const yearsText = getYearsText(Experience);
    let servicesString = '';
    if (doctor.doctor_services.length > 0) {
        servicesString = doctor.doctor_services.map((service) => service.service ? service.service.Service_name : 'Услуга не указана').join(', ');
    } else {
        servicesString = 'отсутствует';
    }
    return(
        <div key={props.id}className={styles.cardsConteiner}>
            <div key={props.id}className={styles.DoctorsPhoto}>
                <img src={img ? process.env.REACT_APP_IMG_URL + img : defaultImage}/>
                <p>стаж {Experience} {yearsText}</p>
            </div>
            <div key={props.id} className={styles.DoctorsInfo}>
                <h2>врач</h2>
                <p>{Surname}</p>
                <p>{fullName}</p>
                <h2>cпециализация</h2>
                <p>
                <span>
                    {servicesString}
                </span>
                </p>
            </div>
        </div>
    );

};
export default DoctorsCard;