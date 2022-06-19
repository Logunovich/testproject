class StoreService {
  _apiStore = 'https://api.escuelajs.co/api/v1/products';
  _initialOffset = 0;

  getResource = async (url) => {
    let res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Cold not fetch ${url}, status: ${res.status}`)
    }

    return await res.json();
  } 

  getAllProducts = (offset = this._initialOffset) => {
    return this.getResource(`${this._apiStore}?offset=${offset}&limit=12`);
  }

  getProduct = (id) => {
    return this.getResource(`${this._apiStore}/${id}`);
  }
}

export default StoreService;