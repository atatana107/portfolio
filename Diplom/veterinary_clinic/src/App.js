import Header from './components/Header';
import Footer from './components/Footer';
import ChoiceCity from './components/ModalCity';
import React from 'react';
import AccountModal from './components/AccountModal';
import AppRouter from './AppRoutes.js';
import { AppContext } from './AppContext.js';
import { observer } from 'mobx-react-lite';
import Loader from './components/Loader/index.js';
import axios from 'axios';
import { check as CheckAuth} from './http/userAPI.js';



const App = observer(() => {

  const[CityOpened, setCityOpened] = React.useState(false);
  const [isVisibleAbout, setIsVisibleAbout] = React.useState(false);
  const[AccountOpened, setAccountOpened] = React.useState(false);
  const [loading, setLoading] = React.useState(true)
  const { user } = React.useContext(AppContext);
  React.useEffect(() => {
    Promise.all([CheckAuth()])
        .then(
            axios.spread((userData) => {
                if (userData) {
                    user.login(userData)
                }
            })
        )
        .finally(
            () => setLoading(false)
        )
    }, [])


  // показываем loader, пока получаем пользователя и корзину
  if (loading) {
      return <Loader/>
  }

  return (
      <>
      {CityOpened?<ChoiceCity OnClose={()=>setCityOpened(false)}/>:null}
      {AccountOpened?<AccountModal OnClose={()=>setAccountOpened(false)}/>:null}
      <Header 
        OnClickCity={()=>setCityOpened(true)}
        onMouseEnter={() => setIsVisibleAbout(true)}
        OnClickAccount={()=>setAccountOpened(true)}
        isAuth={user.isAuth}
      />
      <AppRouter />
      <Footer />
      </>
      
  );
})
export default App;
