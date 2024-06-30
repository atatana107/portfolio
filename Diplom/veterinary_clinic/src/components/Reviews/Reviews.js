import style from './Reviews.module.css';
import defaultImage from './review_img_default.png';
function Reviews(props)
{
    return(
        <div className={style.cardContainer}>
        <div className={style.containerReviews}>
            <div className={style.reviewClientPhoto}>
            <img src={props.img_client? process.env.REACT_APP_IMG_URL + props.img_client : defaultImage} />
            </div>
            <div className={style.reviewContent}>
                <h2>пользователь</h2>
                <p>{props.client_name}</p>
                <h2>отзыв</h2>
                <p>{props.description}</p>
            </div>
        </div>
    </div>
    );

};
export default Reviews;