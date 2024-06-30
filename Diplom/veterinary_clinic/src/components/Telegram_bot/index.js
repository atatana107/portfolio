import styles from './Telegram_bot.module.css';

function Telegram()
{
    const handleTelegramButtonClick = () => {
        window.location.href = 'https://t.me/vetclinic_aibolit'; // Прямая ссылка на ваш телеграм канал
      };
    return(
    <section className = {styles.telegram_bot}>
        <h2 className={styles.telegram_bot_title}>Присоединяйся к нашей<br/>
                       дружной семье<br/>
                       в Telegram</h2>
    <div className={styles.button_container_teleg}>
        <button className={styles.telegram_bot_button}><a style={{color:'#FFC59E'}}target="_blank" href="https://t.me/vetclinic_aibolit">присоединиться</a></button>
    </div>
       <div className = {styles.telegram_phone}>
           <a href="#"><img src="images/phone.svg" alt="image7" height="633" width="325"/></a>
       </div>
       <div className={styles.dog_container}>
       <a className = {styles.telegram_bot_dog} href="#"><img src="images/a_dog.png" alt="image7" height="500" width="442"/></a>
       </div>
    </section>
    );
}
export default Telegram;