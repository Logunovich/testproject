import styles from './productList.module.css';

import ProductItem from '../productItem';
import Button from '../button';
import Spinner from '../spinner/Spinner';
import ErrorFetch from '../errorFetch/ErrorFetch';


const ProductList = ({ isLogged, 
                       amountProducts, 
                       products,
                       loading,
                       newProductsLogain,
                       error,
                       offset,
                       productsEnded,
                       onRequest,
                       addProductToCart }) => {
  document.title = 'Andersen-store';
  
  const renderProducts = () => {
    const result = products.map((item) => {
       
      return (
        <ProductItem 
          isLogged={isLogged}
          key={item.id} 
          price={item.price}
          title={item.title}
          img={item.images[0]}
          id={item.id}
          amount={amountProducts[item.id]}
          addProductToCart={addProductToCart} />
      )
    });

    return result;
  }

  return (
      <div className={styles.list__wrapper}>
        <div className={styles.product__list}>
          {loading ? <Spinner/> : 
           error ? <ErrorFetch/> : 
           renderProducts()}
        </div>
        <div className={styles.btn__block}>
          {loading ? null : 
          error ? null : 
          productsEnded ? null :
          <Button 
            value={'Загрузить еще'}
            handle={(e) => onRequest(offset, e)}
            isDisabled={newProductsLogain}
          />}
        </div>
      </div>
    )
}

export default ProductList;