import logo from './logo.svg';
import './App.css';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import PageThree from './PageThree';
import Header from './Header';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
 
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' element={<PageOne/>}/>
          <Route path='/two' element={<PageTwo/>}/>
          <Route path='/three' element={<PageThree/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
