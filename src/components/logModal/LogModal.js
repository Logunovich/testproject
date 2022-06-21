import styles from './logModal.module.css';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserService from '../../services/UserService';
import Button from '../button';

const LogModal = ({toggelOpenModal, setUser, toggleLogin}) => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorLogin, setErrorLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const newRequest = new UserService();

    const goHome = () => {
        navigate('/');
    }

    const errorText = (
        <div className={styles.module__error}>
            Неверный е-мейл или пароль!
        </div>
    )

    const onChangeValue = (e, setFunction) => {
        setFunction(e.target.value)
    }

    const loginRequest = () => {
        setLoading(true);

        newRequest.login({
            "email": login,
            "password": password
          })
          .then(item => loginUser(item.access_token))
          .catch(() => console.log('Error'))
    }

    const loginUser = (res) => {
        setLoading(false);
        if (res) {
            localStorage.setItem('andersenToken', res);
            setErrorLogin(false);
            toggleLogin();

            newRequest.getUserWithSession(res)
            .then(data => {
                setUser(data);
                toggelOpenModal();
            })
            .catch(() => console.log('Error'))
        } else {
            setErrorLogin(true);
        }
    }

    return (
        <div className={styles.modal__wrapper}>
            <div className={styles.modal__block}>
                <div className={styles.modal__title}>
                    Авторизация
                </div>
                <div className={styles.login__info}>
                    Данные входа для теста: <br /> E-mail: <strong>admin@mail.com</strong> <br /> Пароль: <strong>admin123</strong> 
                </div>
                <div className={styles.modal__blocks}>
                    <label className={styles.modal__label} htmlFor="e-mail">E-mail</label>
                    <input 
                        className={styles.modal__input} 
                        placeholder='E-mail'
                        value={login}
                        onChange={(e) => onChangeValue(e, setLogin)}
                        type="text" 
                        name="e-mail" 
                        id="e-mail"/>
                    <label className={styles.modal__label} htmlFor="password">Пароль</label>
                    <input 
                        className={styles.modal__input}  
                        value={password}
                        onChange={(e) => onChangeValue(e, setPassword)}
                        placeholder='Пароль'
                        type="password" 
                        name="password" 
                        id="password" />
                </div>
                <div className={styles.modal__btns}>
                    <div className={styles.modal_btn}>
                      <Button
                        isDisabled={loading}
                        handle={loginRequest}
                        value={'Войти'}/>
                    </div> 
                    <div className={styles.modal_btn}>
                      <Button
                        isDisabled={loading}
                        handle={toggelOpenModal}
                        value={'Отмена'}/>
                    </div> 
                </div>
                {errorLogin ? errorText : null}
                <div className={styles.close__btn} onClick={toggelOpenModal}>×</div>
            </div>
        </div>
    )
}

export default LogModal;