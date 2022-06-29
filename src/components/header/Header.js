import styles from './header.module.css';
import { Link } from 'react-router-dom';

import Button from '../button';
import UserBlock from '../userBlock';

const Header = ({isLogged, toggelOpenModal, toggleLogin, cart, user}) => {
  
  return (
    <div className={styles.header}>
      <div className={styles.menu__block}>
        <div className={styles.header__title}>
          <Link to="/">Andersen-shop</Link> 
        </div>
        <nav>
          <Link to="/about">О магазине</Link>
        </nav>
      </div>
      {!isLogged ? <Button
                    value={'Войти'}
                    handle={toggelOpenModal}/> : 
                   <UserBlock 
                    user={user}
                    toggleLogin={toggleLogin}/>}
    </div>
  )
}

export default Header;