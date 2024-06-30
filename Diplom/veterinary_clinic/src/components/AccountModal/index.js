
import styles from './AccountModal.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { AppContext } from '../../AppContext';
import { observer } from 'mobx-react-lite';
import { registration } from '../../http/userAPI';
import { login } from '../../http/userAPI';

const AccountModal = observer((props) => {
    const navigate = useNavigate();
    const { user, setUser } = React.useContext(AppContext)
    const loginRef = React.useRef(null);
    const passwordRef = React.useRef(null);
    const NameRef = React.useRef(null);
    const SurnameRef = React.useRef(null);
    const PatronymicRef = React.useRef(null);
    const PhoneRef = React.useRef(null);
    const InformationRef = React.useRef(null);
    const LoginRegRef = React.useRef(null);
    const PasswordRegRef = React.useRef(null);
    const [isRegistering, setIsRegistering] = React.useState(false);
    
    
   // если пользователь авторизован — ему здесь делать нечего
    React.useEffect(() => {
        if (user.isAdmin && user.isAuth) navigate('/admin', {replace: true})
        else if (user.isAuth) navigate('/account', {replace: true})
    },[])

    const handleSubmit = async (event) => 
    {
        event.preventDefault();
        const Login = loginRef.current.value.trim();
        const password = passwordRef.current.value.trim();
        try {
            const data = await login(Login, password); // Предполагая, что функция login принимает параметры Login и password
            if (data) {
                user.login(data);
                if (user.isAdmin) {
                    navigate('/admin');
                  } else {
                    navigate('/account');
                  }
            }
        } catch (error) {
            // Обработка ошибки, если функция login выдаст ошибку
            console.error('Error during login:', error);
            // Дополнительные действия при ошибке, например, отображение сообщения об ошибке пользователю
        }
            console.log(Login)
            console.log(password)
            console.log("Пользователь авторизован:", user);
    }

    const handleSubmitRegistration = async (event) => {
        event.preventDefault()
        const Name = NameRef.current.value.trim()
        const Surname = SurnameRef.current.value.trim()
        const Patronymic = PatronymicRef.current.value.trim()
        const Phone = PhoneRef.current.value.trim()
        const Login = LoginRegRef.current.value.trim()
        const Password = PasswordRegRef.current.value.trim()
        const Information = InformationRef.current.value.trim() || " "
        const data = await registration( Name, Surname, Patronymic,Phone,Login, Password, Information)
        setIsRegistering(false)
        
        if (data) {
            user.login(data)
            if (user.isAdmin && user.isAuth) {
                navigate('/admin');
            } else if (user.isAuth && !user.isAdmin) {
                navigate('/account');
            }
        }
    }

    return(
        <div className={styles.modal_acc}>
           {isRegistering === false ?
                (<div className={styles.modal_content_acc} >
                    <span className={styles.close_acc} onClick={props.OnClose}>&times;</span>
                    <h2>Вход или<br/> регистрация</h2>
                    <input ref={loginRef} type="login" placeholder="Введите логин" />
                    <input ref={passwordRef} type="password" placeholder="Введите пароль" />
                    <Link  type="submit" onClick={handleSubmit} className={styles.button_acc}>войти</Link>
                    <p>или</p>
                    <Link onClick={() => setIsRegistering(true)} >зарегистрироваться</Link>
                </div>)
                 : (
                    <div className={styles.regisConteiner} onSubmit={handleSubmitRegistration} >
                      <h3>Регистрация</h3>
                      <input type="text" ref={NameRef} placeholder="Имя" />
                      <input type="text" ref ={SurnameRef} placeholder="Фамилия" />
                      <input type="text" ref={PatronymicRef} placeholder="Отчество" />
                      <input type="email" ref = {PhoneRef}placeholder="Телефон" />
                      <input type="email" ref={LoginRegRef} placeholder="Логин" />
                      <input type="password" ref={PasswordRegRef}  placeholder="Пароль" />
                      <input type="text" ref = {InformationRef} placeholder="О себе *" />
                      <Link type="submit" onClick={handleSubmitRegistration}>Зарегистрироваться</Link>
                    </div>
                  )}

        </div>

    );
});
export default AccountModal;