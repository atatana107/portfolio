import HistoryPage from "../components/HistoryPage";
import Contacts from "../components/Contacts";
import React from 'react';

function History()
{
    React.useEffect(() => {
        window.scrollTo(0, 0); // Прокручиваем страницу в начало при загрузке компонента
    }, []);
    return(
        <>
        <HistoryPage/>
        <Contacts/>
        </>
    );
};
export default History;