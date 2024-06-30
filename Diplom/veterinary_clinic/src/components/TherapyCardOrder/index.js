import style from './TherapyCardOrder.module.css';
function TherapyCardOrder(props)
{
    return(
    <div className={style.cardConteiner}>
        <div className={style.Conteiner_order}>
            <div className={style.Photo}>
                <img src={props.img_doc}/>
            </div>
            <div  className={style.Info_order}>
                <p dangerouslySetInnerHTML={{__html: props.name}}></p>
                <p>ближайшая дата приема:</p>
                <p>{props.date}</p>
            </div>
        </div>
    </div>
    );

};
export default TherapyCardOrder;