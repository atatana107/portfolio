import React from "react";
import Certificate from "../Certificate";
import st from './DoctorPage.module.css';
import ReviewModal from '../ReviewModal';
import Reviews from '../Reviews/Reviews.js';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import PageDoctor from "../../pages/PageDoctor.jsx";
import { observer } from 'mobx-react-lite';
import { AppContext } from "../../AppContext.js";
import { getOneDoctor } from "../../http/doctorAPI.js";
import defaultImg from './review_img_default.png';;


function getYearsText(age) 
{
    if (age % 10 === 0 || (age % 10 >= 5 && age % 10 <= 9) || (age >= 11 && age <= 14)) {
            return 'лет';
    } else if (age % 10 === 1) {
            return 'год';
    } else {
            return 'года';
    }
}
const DoctorPage = observer((props) => 
{
    React.useEffect(() => {
        // Прокрутить страницу вверх при загрузке компонента
        window.scrollTo(0, 0);
    }, []);
    const [reviewText, setReviewText] = React.useState('');
    const [RevModalOpened, setRevModalOpened] = React.useState(false);
    const [isVisibleAbout, setIsVisibleAbout] = React.useState(true);
    const { id } = useParams(); // Получение id врача из URL параметров
    const [dataDoctor, setdataDoctor] = React.useState([]);
    const {doctor} = React.useContext(AppContext);
    const [fetchingDoctor, setFetchingDoctor] = React.useState(true);

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getOneDoctor(id);
                setdataDoctor(data);
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            } finally {
                setFetchingDoctor(false);
            }
        };

        fetchData();
      }, [id]);
    
    const openReviewModal = () => {
        setRevModalOpened(true);
        console.log(setRevModalOpened);
       // setIsVisibleAbout(true); // Дополнительное действие при открытии модального окна
    };
    const [startIndex, setStartIndex] = React.useState(0);
    const [startIndexRev, setStartIndexRev] = React.useState(0);
    
    const handlePrevClick = () => {
        if (startIndex > 0) {
            setStartIndex(startIndex - 1);
        }
    };
    
    const handleNextClick = () => {
        if (startIndex + 3 < dataDoctor.certificates.length) {
            setStartIndex(startIndex + 1);
        }
    };
    
    const handlePageClick = (pageNumber) => {
        setStartIndexRev((pageNumber - 1) * 3);
    };

    const [startIndexRev1, setstartIndexRev1] = React.useState(0);
    const visibleReviews = dataDoctor.reviews?dataDoctor.reviews.slice(startIndexRev, startIndexRev + 3):[];
    const totalPages = dataDoctor.reviews? Math.ceil(dataDoctor.reviews.length / 3): [];  // Предполагается 3 отзыва на страницу
    const showPageNumbers = totalPages > 1;
    // Генерирует массив номеров страниц для отображения кнопок страниц
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    const visibleCert = dataDoctor.certificates ? dataDoctor.certificates.slice(startIndex, startIndex + 3) : [];

    const showNavigationButtons = dataDoctor.certificates && dataDoctor.certificates.length > 0;

    if (!doctor) 
    {
        return <div>Доктор не найден</div>;
    }
      
      if (fetchingDoctor) {
        return <p>Loading...</p>;
      }
    
      if (!dataDoctor) {
        return <p>No user data found.</p>;
      }
      const fullName = `${dataDoctor.Surname ? dataDoctor.Surname : 'Имя врача'} ${dataDoctor.Name ? dataDoctor.Name : 'Имя врача'} ${dataDoctor.Patronymic ? dataDoctor.Patronymic : ' '}`;
    
      const yearsText = getYearsText(dataDoctor.Experience);
      let servicesString = '';
      if (dataDoctor.length > 0) {
          servicesString = dataDoctor.doctor_services.map((service) => service ? service.Service_name : 'Услуга не указана').join(', ');
      } else {
          servicesString = ' ';
      }
    return(
        <section>
            <div className={st.DoctorsMainConteiner}>
                <div className={st.DocMainInfo}>
                    <div className={st.DocMainInfoPhoto}>
                        <img src={dataDoctor.img ? process.env.REACT_APP_IMG_URL + dataDoctor.img : defaultImg}/>
                        <p>ближайшая дата приема: 04.08.2023 {dataDoctor.min_data_appoitment}</p>
                        <Link to='/signUp'><button>записаться</button></Link>
                        <button onClick={openReviewModal}>оставить отзыв</button>
                    </div>
                    <div className={st.DoctorDescription}>
                        <Link to='/group_page' className={st.back}>&lt; назад</Link>
                        <h3>{fullName}</h3>
                        <p>стаж {dataDoctor.Experience} {yearsText}</p>
                        <h4>{servicesString}</h4>
                        <p className={st.DoctorDescription_p}> {dataDoctor.Information}</p>
                        {showNavigationButtons && (
                        <div className={st.NavigationButtons}>
                            <h4>Пройденные курсы</h4>
                            <button onClick={handlePrevClick}>&lt;</button>
                            <button onClick={handleNextClick}>&gt;</button>
                        </div>
                        )}
                        <nav>
                            {dataDoctor.certificates && dataDoctor.certificates.length > 0 ? (
                                visibleCert.map(certificate => (
                                    <Certificate
                                        key={certificate.id}
                                        data={certificate}
                                        id={certificate.ID_certificate}
                                        year={certificate.Create_time}
                                        title_name={certificate.comment}
                                        href= {certificate.Certificate}
                                    />
                                ))
                                ) : (
                                <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>  </p>
                            )} 
                        </nav>
                        
                    </div>
                </div>
                <div className={st.DoctorReview}>
                    <h2 className={st.Reviews_title}>Отзывы</h2>
                    <div className={st.PriceBt}>
                        {showPageNumbers && pageNumbers.map((pageNumber) => (
                          <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
                            {pageNumber}
                          </button>
                       ))}
                    </div>
                    <nav>
                {dataDoctor.reviews && dataDoctor.reviews.length > 0 ? (
                    visibleReviews.map(reviews => (
                        <Reviews
                        key={reviews.id}
                        id={reviews.ID}
                        client_name={reviews.owner.Name}
                        description={reviews.Review}
                        img_client={reviews.owner.img}
                        />
                    ))
                    ) : (
                    <p style={{ marginLeft: '600px',marginBottom:'30px',fontFamily:'Raleway',fontSize:'20px',color:'#000000',fontWeight:'300' }}>  </p>
                    )} 
                    </nav>
                    <div className={st.PriceBt}>
                        {showPageNumbers && pageNumbers.map((pageNumber) => (
                          <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}>
                        {pageNumber}
                        </button>
                        ))}
                    </div>
                </div>
                {RevModalOpened && <ReviewModal OnClose={() => setRevModalOpened(false)} />}
            </div>
        </section>
    );
});
export default DoctorPage;