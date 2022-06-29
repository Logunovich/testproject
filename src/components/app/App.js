import styles from './app.module.css';

import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import UserService from '../../services/UserService';
import Header from "../header";
import ProductList from "../productList";
import About from "../about";
import LogModal from "../logModal";
import ProductPage from "../productPage";
import Page404 from "../Page404";
import Cart from '../cart';

import { fetchProducts } from '../../slices/productSlice';
import { useDispatch, useSelector } from 'react-redux';


const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [cart, setCart] = useState({amount: 0, sum: 0});
  const [user, setUser] = useState({});

  const dispatch = useDispatch();
  const {products, offset, loading, newProductsLogain, error, productsEnded} = useSelector(state => state.products);
  const {isCartOpen} = useSelector(state => state.cart)

  const toggelOpenModal = () => {
    setIsModalLoginOpen((val) => {
      return !val
    })
  }
  
  const toggleLogin = (e) => {
    e?.preventDefault();

    setIsLogged((val) => {
      return !val
    })
  }
                      
  useEffect(() => {
    onRequest();
    checkLocalStorageToken();
  }, []);

  const onRequest = () => {  
    dispatch(fetchProducts(offset));
  }

  const addProductToCart = (id, price) => {
    setCart((cart) => {
      return {amount: cart.amount + 1, sum: cart.sum + price}
    })
  }

  const checkLocalStorageToken = () => {
    if (localStorage.getItem('andersenToken')) {
      const newRequest = new UserService();
      newRequest.getUserWithSession(localStorage.getItem('andersenToken'))
              .then(setUser)
              .catch(() => console.log('Error'))
      toggleLogin();
    }
  }

  return (
    <div className={styles.app}>
      <Header 
        isLogged={isLogged}
        toggelOpenModal={toggelOpenModal}
        toggleLogin={toggleLogin}
        cart={cart}
        user={user}/>
      {isCartOpen ? <Cart/> : null}
      <Routes>
        <Route path={"/"} element={<ProductList 
                                  isLogged={isLogged}
                                  products={products}
                                  loading={loading}
                                  newProductsLogain={newProductsLogain} 
                                  error={error}
                                  productsEnded={productsEnded}
                                  onRequest={onRequest} 
                                  addProductToCart={addProductToCart}/>} />
        <Route path={"products/:productId"} element={<ProductPage
                                                      isLogged={isLogged}
                                                      addProductToCart={addProductToCart} />} />
        <Route path={"about"} element={<About/>}/>
        <Route path={"*"} element={<Page404/>}/>
      </Routes>
      {isModalLoginOpen ? <LogModal 
                            toggelOpenModal={toggelOpenModal}
                            setUser={setUser}
                            toggleLogin={toggleLogin}/> : 
                          null}
    </div>
  )
}

export default App;