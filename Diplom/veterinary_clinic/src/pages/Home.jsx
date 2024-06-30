
import Services from '../components/Services';
import ServicePageInfo from '../components/ServicePageInfo/index.js';
import Advantages from '../components/Advantages';
import Title from '../components/Title';
import History from '../components/History';
import Doctors from '../components/Doctors';
import Eighteen_years from '../components/Eighteen_years';
import Telegram from '../components/Telegram_bot';
import React from 'react';
import Contacts from '../components/Contacts';
import { useNavigate } from 'react-router-dom';
import {getAllServices} from '../http/servicesAPI.js';
import { AppContext } from '../AppContext.js';
import { observer } from 'mobx-react-lite';



const mas_adv =[

{
  title:'Работаем круглосуточно',
  img:'images/sign_24_7.png',
  text:'Мы готовы в любое время суток принять домашних питомцев и их хозяев'
},
{
  title:'Широкий спектр услуг',
  img:'images/range_services.png',
  text:'Кроме широкопрофильных докторов  в клинике развиты узкие направления в ветеринарии – офтальмология, стоматология, дерматология, травматология, ортопедия и онкология'
},
{
  title:'Большой опыт',
  img:'images/great_experience.png',
  text:'30 высококвалифицированных врачей нашей клиники предоставляют ветеринарную помощь уже на протяжении 18 лет!'
},
{
  title:'Собственная лаборатория',
  img:'images/laboratory.png',
  text:'Оборудованная профессиональным оснащением производства компании IDEXX International Inc.(США), которое позволяет получить результаты исследования прямо на приеме'
},
{
  title:'Оснащенные стационары',
  img:'images/hospitals.png',
  text:'Обычный и инфекционный стационар с индивидуальным подогревом каждой клетки. Для питомцев в критическом состоянии предусмотрены кислородные камеры'
},
{
  title:'Новейшее оборудование',
  img:'images/equipment.png',
  text:'Помимо лабораторного оборудования и цифрового рентгена в клинике используется современный эндоскоп KARL STORZ'
},
{
  title:'Запись на прием онлайн',
  img:'images/make_appointment.png',
  text:'Запись на приём позволяет избежать ожиданий в очереди, но если вы не можете приехать - мы выезжаем на дом!'
},
{
  title:'Аптека и зоомагазин',
  img:'images/drugs.png',
  text:'Для удобства в клинике предусмотрен аптечный пункт, а также бутик с одеждой и косметическими средствами для ухода за домашними любимцами'
},
{
  title:'Груминг-салон',
  img:'images/grooming.png',
  text:'Отдельный кабинет для проведения гигиенческих и косметических процедур, таких как мытьё и сушка, стрижка или тримминг, уход за ушами, глазами и когтями и многое другое'
}
]
const Home = observer((props) => {
  const navigate = useNavigate();
  const { service } = React.useContext(AppContext);
  const [dataService, setdataService] = React.useState({})
  const [fetchingService, setFetchingService] = React.useState(true)
  

  
  React.useEffect(() => {
    const fetchData = async () => 
    {
        console.log("Fetching data for service:", service);
        try 
        {
          const data = await getAllServices(service.ID_service);
          setdataService(data);
        } 
        catch (error) 
        {
          console.error('Error fetching service data:', error);
        } 
        finally {
            setFetchingService(false);
        }
    };

    fetchData();
  }, [service]);



  

  if (fetchingService) {
    return <p>Loading...</p>;
  }

  if (!dataService) {
    return <p>No service data found.</p>;
  }



  return (
      <>
      <Title/>
      <section className="services_buttons">
          {
            dataService.map((sercice) =>(
              <Services 
              key={sercice.ID_service || sercice.title}
              id={sercice.ID_service} 
              title = {sercice.Service_name} 
              img = {sercice.img} 
              kol = {sercice.subserviceCount}
              />
            ))
          }
      </section>
      <History/>
      <Doctors/>
      <Eighteen_years/>
      <section>
          <h2 className = "advantages_title">Почему выбирают нас?</h2>
          <nav className="nav_advant">
          {
            mas_adv.map((obj) =>(
            <Advantages title = {obj.title} img = {obj.img} text = {obj.text}/>
            ))
          }
          </nav>
      </section>
      <Telegram/>
      <Contacts/>
      </>
      
  );
})
export default Home;