import styles from './Eighteen_years.module.css';

function Eighteen_years()
{
    return(
        <section className = {styles.eighteen_years}>
        <h2 className = {styles.eighteen_years_title}>1 150 000</h2>
        <p className = {styles.eighteen_years_text}>питомцам мы помогли
            <br/>за 18 лет работы</p>
        <img className = {styles.eighteen_years_img} src="images/image_bird.png" alt="doctor_6" height="223" width="288"/>
    </section>
    );
}
export default Eighteen_years;