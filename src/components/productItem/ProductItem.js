import styles from './productItem.module.css';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/cartSlice';

import Button from '../button';

const ProductItem = ({img, title, price, id, isLogged}) => {
  
  const dispatch = useDispatch();

  const addProductToCart = () => {
    const productForCart = {
      id, 
      title, 
      price
    }
    dispatch(addProduct(productForCart))
  }

  const defaultImg = 'https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg';
  const isLoggedInfo = (
    <div className={styles.info__block}>
      Для добавления товара в корзину авторизуйтесь
    </div>
  )



  // const image = img.includes('image') ? img : defaultImg;
  const image = defaultImg;

  return (
    <div className={styles.product__item}>
      <div className={styles.product__title}>
        <Link to={`/products/${id}`}>{title}</Link>
      </div>
      <div className={styles.product__img}>
        <img src={image} alt={title} />
      </div>
      <div className={styles.product__price}>
        ${price}
      </div>
      <div>
        {!isLogged ? isLoggedInfo : 
          <Button 
            value={'В корзину'}
            handle={() => addProductToCart(id, price)}/>}
      </div>
    </div>
  )
}

export default ProductItem;