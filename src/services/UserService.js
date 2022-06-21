class UserService {
    _apiUsers = 'https://api.escuelajs.co/api/v1/users';
    _apiLogin = 'https://api.escuelajs.co/api/v1/auth/login';
    _apiLoginWithSession = 'https://api.escuelajs.co/api/v1/auth/profile';
  
    getResource = async (url) => {
      let res = await fetch(url);
  
      if (!res.ok) {
        throw new Error(`Cold not fetch ${url}, status: ${res.status}`)
      }
  
      return await res.json();
    } 
  
    getAllUsers = () => {
      return this.getResource(`${this._apiUsers}`);
    }

    login = async (data = {}, url = this._apiLogin) => {
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          cache: 'no-cache', 
          credentials: 'same-origin', 
          headers: {
            'Content-Type': 'application/json'
          },
          redirect: 'follow', 
          referrerPolicy: 'no-referrer', 
          body: JSON.stringify(data) 
        });
        return await response.json(); 
      }

    getUserWithSession = async (token, url = this._apiLoginWithSession) => {
      const response = await fetch(url, {
        method: 'GET',
        contentType: 'application/json',
        headers: {
        'Authorization': `Bearer ${token}`
        }
      });
      return await response.json(); 
    }

  }
  
  export default UserService;