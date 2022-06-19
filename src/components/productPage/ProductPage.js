import styles from './productPage.module.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import StoreService from '../../services/StoreService';
import Spinner from '../spinner/Spinner';
import ErrorFetch from '../errorFetch';
import Button from '../button';
import Galery from '../galery';

const ProductPage = ({isLogged, amountProducts, addProductToCart}) => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false)
  const id = useParams().productId;
  
  const storeService = new StoreService();  
  
  const isLoggedInfo = (
    <div className={styles.info__block}>
      Для добавления товара в корзину авторизуйтесь
    </div>
  );

  const amounInfo = (
    <div className={styles.product__amount}>
      {`В наличии: ${amountProducts[id]} шт.`}
    </div>
  )

  const noProduct = (
    <div className={styles.no__product}>
      Нет в наличии!
    </div>
  )

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
          {amountProducts[id] > 0 ? amounInfo : null}
          {amountProducts[id] === 0 ? noProduct : 
           isLogged ? <Button 
                        value={'В корзину'}
                        handle={() => addProductToCart(id, price)} /> :
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