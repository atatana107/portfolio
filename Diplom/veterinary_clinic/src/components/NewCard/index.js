import style_new_card from './NewCard.module.css';
function NewCard(props)
{
    return(
        <div className={style_new_card.newConteiner}>
            <div className={style_new_card.Conteiner_new}>
                <div className={style_new_card.New_photo}>
                    <img src={props.img_new}/>
                </div>
                <div className={style_new_card.New_desc}>
                    <h3>{props.title}</h3>
                    <p>{props.description}</p>
                    <p>{props.date}</p>
                </div>
            </div>
        </div>
    );
}
export default NewCard;