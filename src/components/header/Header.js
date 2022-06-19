import styles from './header.module.css';
import { Link } from 'react-router-dom';

import Button from '../button';

const Header = ({isLogged, toggelOpenModal, toggleLogin, cart}) => {
  const cartBlock = (
    <div className={styles.cart__block}>
    <div className={styles.count__products}>
      Товаров в корзине: <span className={styles.product__cart}>{cart.amount}</span>
    </div>
    <div className={styles.count__price}>
      На сумму: <span className={styles.price__cart}>${cart.sum}</span>
    </div>
  </div>
  )
  
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
      {isLogged ? cartBlock : null}
      <Button
        value={isLogged ? 'Выйти' : 'Войти'}
        handle={isLogged ? toggleLogin : toggelOpenModal}/>
    </div>
  )
}

export default Header;