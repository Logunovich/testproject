const initialState = {
  isLogged: false,
  isModalLoginOpen: false,
  cart: {amount: 0, sum: 0},
  amountProducts: {},
  products: [],
  offset: 0,
  loading: true,
  newProductsLogain: false,
  error: false,
  productsEnded: false,
  user: {}
}

const reducer = (state = initialState, action) => {
  return state
}

export default reducer;