import style_sert from './Certificate.module.css';
function Certificate(props)
{
    return(
    <div className={style_sert.Certificate_conteiner}>
      {/*  <div className={style_sert.Certificate}> */}
            <p>{props.data.Create_time}</p>
            <p><a href={process.env.REACT_APP_IMG_URL + props.data.Certificate} target="_blank">{props.data.comment}</a></p> 
      {/*}  </div>*/}
    </div>
    );

};
export default Certificate;