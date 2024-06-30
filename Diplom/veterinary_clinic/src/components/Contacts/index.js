import styles from './Contacts.module.css';
function Contacts(){
    return(
        <section id="contacts" className = {styles.contacts}>
            <h2 className = {styles.contacts_title}>Контакты</h2>
            <h3 className = {styles.contacts_subtitle}>Айболит на Краснополянской</h3>
            <div className = {styles.div_contacts}>
                <ol className = {styles.contacts_div_ol}>
                    <li><img className = {styles.contact_icon}src="images/geo_location.svg" height="46" width="46"/>Дзержинский район, ул. Краснополянская, 30</li>
                    <li><img className = {styles.contact_icon} src="images/sign_phone.png" height="46" width="46"/>96-22-92</li>
                    <li><img className = {styles.contact_icon} src="images/sign_clock.png" height="46" width="46"/>Круглосуточно</li>
                </ol>
            </div>
            <h3 className = {styles.contacts_subtitle}>Айболит на Тулака</h3>
            <div className = {styles.div_contacts}>
                <ol className = {styles.contacts_div_ol1}>
                    <li><img className = {styles.contact_icon} src="images/geo_location.svg" height="46" width="46"/>Советский район, ул. Карла Маркса, 7</li>
                    <li><img className = {styles.contact_icon} src="images/sign_phone.png" height="46" width="46"/>96-22-92</li>
                    <li><img className = {styles.contact_icon} src="images/sign_clock.png" height="46" width="46"/>Круглосуточно</li>
                </ol>
            </div>       
        </section>
    );
}
export default Contacts;