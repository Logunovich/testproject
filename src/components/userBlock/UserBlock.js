import styles from './userBlock.module.css';
import avatar from '../../resources/avatar.jpeg'

const UserBlock = ({cart, toggleLogin, user}) => {
  const logOut = () => {
    toggleLogin();
    localStorage.removeItem('andersenToken');
  }

  return (
    <div className={styles.user__block}>
      <div className={styles.cart__block}>
        <div className={styles.count__products}>
        Товаров в корзине: <span className={styles.product__cart}>{cart.amount}</span>
        </div>
        <div className={styles.count__price}>
          На сумму: <span className={styles.price__cart}>{`$${cart.sum}`}</span>
        </div>
      </div>
      <div className={styles.user__info}>
        <div className={styles.user__name}>
          {user.name}
        </div>
        <div className={styles.user__avatar}>
          <img src={user.avatar} alt={user.name} />
        </div>
      </div>
      <div className={styles.user__exit}>
        <a onClick={logOut} href="#">Выйти</a>
      </div>

    </div>
  )
}

export default UserBlock;