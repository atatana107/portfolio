import styles from "./HistoryPage.module.css"

function HistoryPage()
{
    return(
    <section>
       <div className={styles.history}>
            <h1 className={styles.history_title}>История<br/>компании</h1>

            <img className={styles.img_group} src="images/img_cat_history.png" alt="" height="330" width="826" />

            <p className={styles.history_text}>
                В январе 2000 года открылась ветеринарная клиника «Айболит» в Волгограде. Идея её создания пришла двумя годами ранее основателю компании Жанне Георгиевне Прозор. Толчком послужила потребность в лечении собственного питомца, боксёра по кличке Бард. Но в Волгограде в то время существовали только государственные лечебницы, ориентированные больше на сельское хозяйство, а так же практикующие на дому ветеринарные специалисты. Сначала клиника не была круглосуточной, и работало в ней только 3 врача. Чуть позднее для удобства клиентов на территории клиники была открыта ветеринарная аптека. Она была оснащена самым лучшим (по тем временам) оборудованием, штат увеличился с 4-х человек до 10-ти, а так же расширился спектр услуг по направлениям терапия и хирургия. С самого начала становления клиники, врачи постоянно повышали свою квалификацию. Были налажены контакты с другими ведущими клиниками страны, врачи активно обменивались с ними опытом, чтобы держать «руку на пульсе» и постоянно усовершенствовать методики лечения животных.
            </p>
        </div>

        <div className={styles.history_groom}>
            <img className={styles.history_groom_img} src="images/img_grooming_history.png" alt="" height="388" width="577"/>
            <p className={styles.history_groom_text}>
                Первый в Волгограде груминг салон, открылся по соседству с клиникой, спустя 6 лет.
                Таким образом, в одном месте, можно было получить не только ветеринарные услуги,
                но и делать стрижки, готовить животных к выставкам и приобретать одежду для своих
                любимцев.
            </p>
        </div>

        <div className={styles.history_big_center}>
            <p className={styles.history_big_center_text}>
                В июне 2022 года, в Волгограде открылся самый крупный в области, ветеринарный центр «Айболит».
                Который вместил в себя множество приёмных кабинетов, две операционные, процедурный кабинет, четыре
                стационара, в том числе дневной, лабораторию, кабинет реабилитации, рентген и УЗИ кабинеты.Всё оборудовано,
                по последнему слову техники. Спрос на ветеринарные услуги по прежнему растёт, а вместе с ним и узнаваемость
                проверенного бренда в новой локации.
            </p>
            <img className = {styles.history_big_center_img}src="images/img_dog_history_page_thrree.png" alt="" height="388" width="800"/>
        </div>

        <div className={styles.ultrasound}>
            <img className={styles.ultrasound_img} src="images/ultrasound_history.png" alt="" height="300" width="450"/>
            <p className={styles.ultrasound_text}>
                Для визуальной диагностики, установлены УЗИ аппараты экспертного уровня
                с высокочастотными датчиками, а так же современные рентген-системы с низкодозным
                изучением и мгновенной оцифровкой.Также, в арсенале одного из корпусов, имеется
                продвинутое эндоскопическое оборудование KARL STORZ, позволяющее проводить внутрипросветную
                диагностику и лечебные манипуляции во всех органах – от носа до прямой кишки.Незаменимым
                помощником в операциях, является наркозно-дыхательный аппарат с монитором пациента, укомплектованный
                в каждом корпусе.
            </p>
        </div>
        <div className={styles.mission}>
            <h2 className={styles.mission_title}>
                <span className={styles.mission_title_clr}>Наша миссия</span> улучшение качества жизни<br/>
                питомцев, их здоровья и долголетия
            </h2>
        </div>
    </section>
    );

}
export  default HistoryPage;