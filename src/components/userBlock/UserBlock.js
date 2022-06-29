import styles from './userBlock.module.css';
import { toggleCart } from '../../slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import imageCart from '../../img/1413925.png';

const UserBlock = ({toggleLogin, user}) => {


  const dispatch = useDispatch();
  const {sum, amount, isCartOpen} = useSelector(state => state.cart);

  const logOut = () => {
    toggleLogin();
    localStorage.removeItem('andersenToken');

    if (isCartOpen) {
      dispatch(toggleCart())
    }
  }

  const defaultImg = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg';
  const img = user.avatar;


  const onToggleCart = () => {
    dispatch(toggleCart())
  }

  return (
    <div className={styles.user__block}>

      <div className={styles.cart__block}>
        <div className={styles.count__products}>
        Товаров в корзине: <span className={styles.product__cart}>{amount}</span>
        </div>
        <div className={styles.count__price}>
          На сумму: <span className={styles.price__cart}>{`$${sum}`}</span>
        </div>
      </div>
      <div className={styles.cart__img} onClick={onToggleCart}>
        <img src={imageCart} alt="cart" />
      </div>
      <div className={styles.user__info}>
        <div className={styles.user__name}>
          {user.name}
        </div>
        <div className={styles.user__avatar}>
          <img src={defaultImg} alt={user.name} />
        </div>
      </div>
      <div className={styles.user__exit}>
        <a onClick={logOut} href="#">Выйти</a>
      </div>

    </div>
  )
}

export default UserBlock;