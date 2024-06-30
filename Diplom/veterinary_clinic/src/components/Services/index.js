import styles from './Services.module.css';
import { Link } from 'react-router-dom';

function getServiceForm(count) {
    if ((count % 10 === 0) || (count % 10 >= 5 && count % 10 <= 9) || (count >= 11 && count <= 14)) {
        return ' услуг';
    } else if (count % 10 === 1) {
        return ' услуга';
    } else {
        return ' услуги';
    }
}
function Services(props){
    const serviceText = getServiceForm(props.kol);
    return(
        <div id="services" key={props.id} className={styles.service_button} >
            <Link to={`/therapy/${props.id}`}>
                <button  type = "button" className = {styles.services_buttons_item}>
                <h4>{props.title}</h4>
                    <img width={80} height={67} src={process.env.REACT_APP_IMG_URL + props.img}/>
                    <p>{props.kol}{serviceText}</p>
                </button>
            </Link>
        </div>
    );
}
export default Services;