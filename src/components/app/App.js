import styles from './app.module.css';

import { useEffect, useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import UserService from '../../services/UserService';
import StoreService from "../../services/StoreService";
import Header from "../header";
import ProductList from "../productList";
import About from "../about";
import LogModal from "../logModal";
import ProductPage from "../productPage";
import Page404 from "../Page404";


const App = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);
  const [cart, setCart] = useState({amount: 0, sum: 0});
  const [amountProducts, setAmountProducts] = useState({});
  const [products, setProducts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newProductsLogain, setNewProductsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [productsEnded, setProductsEnded] = useState(false);
  const [user, setUser] = useState({});
  
  const storeService = new StoreService();

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

  const onRequest = (offsetRequest = offset, e) => {
    e?.preventDefault();

    setNewProductsLoading(true)

    storeService.getAllProducts(offsetRequest)
      .then(productsLoaded)
      .catch(() => {
        setLoading(false);
        setError(true);
      })
  }

  const getRandomNum = (min, max) => {
    return Math.random() * (max - min) + min;
  }

  const productsLoaded = (newProducts) => {
    if (newProducts.length < 12) {
      setProductsEnded(true)
    }

    setProducts((oldProducts) => {
      return [...oldProducts, ...newProducts];
    });

    setLoading(false);
    setNewProductsLoading(false);

    setOffset((offset) => {
      return offset += 12;
    });

    newProducts.forEach(item => {
      const randomAmount = Math.round(getRandomNum(0, 10));

      setAmountProducts((amount) => {
        return {...amount, [`${item.id}`]: randomAmount}
      })
    })
  }

  const addProductToCart = (id, price) => {
    setCart((cart) => {
      return {amount: cart.amount + 1, sum: cart.sum + price}
    })

    setAmountProducts((amount) => {
      return {...amount, [id]: amount[id] - 1}
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
      <Routes>
        <Route path={"/"} element={<ProductList 
                                  isLogged={isLogged}
                                  amountProducts={amountProducts} 
                                  products={products}
                                  loading={loading}
                                  newProductsLogain={newProductsLogain} 
                                  error={error}
                                  productsEnded={productsEnded}
                                  onRequest={onRequest} 
                                  addProductToCart={addProductToCart}/>} />
        <Route path={"products/:productId"} element={<ProductPage
                                                      isLogged={isLogged}
                                                      amountProducts={amountProducts}
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