import styles from './cart.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct, removeProduct } from '../../slices/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { productsInCart, emptyCart } = useSelector(state => state.cart);
  const emptyText = (
    <div className={styles.empty}>
      Корзина пуста!
    </div>
  )

  const addProductToCart = (id, title, price) => {
    const productForCart = {
      id, 
      title, 
      price
    }
    dispatch(addProduct(productForCart))
  }

  const removeProductToCart = (id, title, price) => {
    const removeItem = {
      id, 
      title, 
      price
    }
    dispatch(removeProduct(removeItem))
  }

  const renderProductsInCart = () => {
    return Object.entries(productsInCart).map((item, id) => {
      if (item[1].count > 0) {
        return (
          <div key={id} className={styles.cart__product}>
            <div className={styles.cart__title}>{item[1].title} ({item[1].count} шт.)</div>
            <div className={styles.cart__price}>На сумму: {item[1].price}
              <div>
                <button onClick={() => addProductToCart(item[0], item[1].title, item[1].price/item[1].count)}>+</button>
                <button onClick={() => removeProductToCart(item[0], item[1].title, item[1].price/item[1].count)}>-</button>
              </div>
            </div>
          </div>
          
        )
      } 
    })
  }

  return (
    <div className={styles.cart__block}>
      Ваша корзина: 
      {renderProductsInCart()}
      {emptyCart ? emptyText : null}
    </div>
  )
}

export default Cart;