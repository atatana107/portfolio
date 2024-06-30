import style from './ModalCity.module.css';

function ChoiceCity(props){
return(
<div id="modal" className={style.modal}>
  <div className={style.modal_content}>
    <span className={style.close} onClick={props.OnClose}>&times;</span>
    <h2>Ваш город</h2>
    <button className={style.button_One}>Казань</button>
    <button className ={style.button_Two}>Санкт Петербург</button>
  </div>
</div>
    );
}
export default ChoiceCity;