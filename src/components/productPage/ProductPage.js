import styles from './productPage.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import StoreService from '../../services/StoreService';
import Spinner from '../spinner/Spinner';
import ErrorFetch from '../errorFetch';
import Button from '../button';
import Galery from '../galery';

import { useDispatch } from 'react-redux';
import { addProduct } from '../../slices/cartSlice';


const ProductPage = ({isLogged}) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const id = useParams().productId;
  
  const dispatch = useDispatch();
  const storeService = new StoreService();  
  
  const isLoggedInfo = (
    <div className={styles.info__block}>
      Для добавления товара в корзину авторизуйтесь
    </div>
  );

  useEffect(() => {
    onRequest();
  }, []);

  const onRequest = () => {
    storeService.getProduct(id)
      .then(productLoaded)
      .catch(() => {
        setLoading(false);
        setError(true);
      })
  }

  const productLoaded = (product) => {
    setProduct(product);
    setLoading(false);
    document.title = product.title;
  }

  const addProductToCart = () => {
    const {id, title, price} = product;
    const productForCart = {
      id, 
      title, 
      price
    }
    dispatch(addProduct(productForCart))
  }

  const renderProduct = () => {
    const { title, images, description, price, category } = product;

    return (
      <div className={styles.product__block}>
        <div className={styles.product__img}>
          <Galery images={images} alt={title}/>
        </div>
        <div className={styles.product__info}>
          <div className={styles.product__title}>
            <h1>{title}</h1>
          </div>
          <div className={styles.product__category}>
          {`Категория: ${category.name}`}
        </div>
          <div className={styles.product__text}>
            <p>{description}</p>
          </div>
          <div className={styles.product__price}>
            {`$${price}`}
          </div>
          {isLogged ? <Button 
                        value={'В корзину'}
                        handle={() => addProductToCart()} /> :
           isLoggedInfo}
        </div>
      </div>
    )
  }

  return (
    <div className={styles.product__page}>
      {loading ? <Spinner/> : 
       error ? <ErrorFetch/> : 
       renderProduct()}
    </div>
  )  
}

export default ProductPage;