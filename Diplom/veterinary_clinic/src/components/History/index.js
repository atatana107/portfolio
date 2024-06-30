import styles from './History.module.css'
import {Link} from 'react-router-dom';
import React from 'react';

function History()
{
    return(
        <section id='history_section' className = {styles.history}>
            <h2 className = {styles.history_title}>История компании</h2>
            <p className = {styles.history_text}>История компании начинается 14 января 1999 года, когда  было образовано ООО «Чижи». 
            Идея пришла, т.к. у основателя компании Прозор Жанны Георгиевны была собака боксёр по кличке Бард…</p>
           <Link to ="/history_page"><button className = {styles.button_history_read}>читать далее</button></Link> 
        </section>
    );
}
export default History;