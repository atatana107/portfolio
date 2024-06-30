import React from 'react';
import {Link} from 'react-router-dom';
import styles from './GroupPageInformation.module.css';
import DoctorsCard from '../DoctorsCards';
import style from '../DoctorsCards/DoctorsCards.module.css';
import { AppContext } from '../../AppContext.js';
import { observer } from 'mobx-react-lite';
import {getAllDoctors} from '../../http/doctorAPI.js'


const GroupInformation = observer((props) => 
{

    const [startIndex, setStartIndex] = React.useState(0);
    const handlePrevClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 6);
        }
    };
    const handleNextClick = () => {
        if (startIndex + 6 < dataDoctor.length) {
            setStartIndex(startIndex + 6);
        }
    };
    const handleScrollToAboutUs = (event) => {
        event.preventDefault();
        const aboutUsElement = document.getElementById('about-us');
        if (aboutUsElement) {
            aboutUsElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };
    const handleScrollToAboutSpecialitits = (event) => {
        event.preventDefault();
        const aboutUsElement = document.getElementById('Specialitits');
        if (aboutUsElement) {
            aboutUsElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const { doctor } = React.useContext(AppContext);
    const [dataDoctor, setdataDoctor] = React.useState({})
    const [fetchingDoctor, setFetchingDoctor] = React.useState(true)

    React.useEffect(() => {
        const fetchData = async () => 
        {
            console.log("Fetching data for doctor:", doctor);
            try 
            {
              const data = await getAllDoctors(doctor.ID_doctor);
              setdataDoctor(data);
            } 
            catch (error) 
            {
              console.error('Error fetching user data:', error);
            } 
            finally {
                setFetchingDoctor(false);
            }
        };
    
        fetchData();
      }, [doctor]);

      if (fetchingDoctor) {
        return <p>Loading...</p>;
      }
    
      if (!dataDoctor) {
        return <p>No doctor data found.</p>;
      }
      const visibleDoctors = dataDoctor.slice(startIndex, startIndex + 6);
    
    return(
        <section>
            <div className={styles.Group_conteiner}>
                <div className={styles.Title_Group}>
                    <h1>Коллектив</h1>
                    <Link to = "#about-us"onClick={handleScrollToAboutUs} className={styles.Link}>
                        О нас
                    </Link><br/>
                    <Link to="#Specialitits" onClick={handleScrollToAboutSpecialitits}className={styles.Link}>
                        Специалисты
                    </Link>
                </div>
                <div className={styles.Group_info}>
                    <img src = "images/collective_photo.png"/>
                    <h2 id="about-us" className={styles.Group_info_title}>О нас</h2>
                    <p>
                    Наша команда стремится обеспечить высококачественные ветеринарные услуги, основанные на профессионализме и бережном отношении к каждому пациенту.
                    Мы стремимся обеспечить прозрачность в процессе лечения, поэтому всегда готовы ответить на все ваши вопросы и предоставить вам полную информацию 
                    о состоянии вашего питомца и предлагаемых процедурах. Сотрудники клиники привержены высоким стандартам этики и доверия, обладающие не только высокой
                    профессиональной подготовкой, но и внимательным, заботливым отношением к каждому подопечному. Мы понимаем, что каждое животное уникально, и поэтому 
                    наша команда позаботится о вашем питомце с любовью и заботой, как о собственном. 
                    </p>
                </div>
            </div>
            <h2 id="Specialitits"className={styles.Specialists}>Специалисты</h2>
            <button className={styles.button_left} onClick={handlePrevClick}>
                    &lt;
            </button>
            <button className={styles.button_right} onClick={handleNextClick}>
                &gt;
            </button>
            <section className={style.Container}>
            {dataDoctor && dataDoctor.length > 0 ? (
                    visibleDoctors.map(doctor => (
                    <Link to={`/doctor_page/${doctor.ID_doctor}`}> 
                        <DoctorsCard key={doctor.id} doctor={doctor} />
                    </Link>
                    ))
                ) : (
             <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>Здесь будут отображаться врачи</p>
            )}
            </section> 
            
        </section>
    );
});
export default GroupInformation;