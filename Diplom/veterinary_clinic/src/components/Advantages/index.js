import styles_adv from './Advantages.module.css';
function Advantages(props){
    return(
    <div className={styles_adv.post}>
        <div className={styles_adv.post_title}>
        <h4 className={styles_adv.post_title}>{props.title}</h4>
        </div>
        <div className = {styles_adv.post_img}>
            <img width={75} height={80} src={props.img}/>
        </div>
        <div className={styles_adv.post_content}>
           <p>{props.text}</p>
        </div>
     </div>
    )
}
export default Advantages;