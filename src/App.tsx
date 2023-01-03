import {createContext } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Business from './auth/Business';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { removeToken, setToken } from './auth/tokenManager';
import Header from './components/Header';
import About from './pages/About';
import BusinessCard from './pages/BusinessCard';
import CardsList from './pages/CardsList';
import Home from './pages/Home';
import { postRequest } from './services/apiService';

interface ILodinData{
  email:string;
  password:string;
}

interface Context{
  login:Function;
  handlelogout:Function;
}

export const AppContext = createContext <Context | null>(null);

function App() {

  const navigate=useNavigate();

  function login(data:ILodinData) {
        const res=postRequest('users/login',data,false)
        if(!res) return;
           res.then(response => response.json())
            .then(json => {
                setToken(json.token);
                navigate('/');
            })
  }

  function handlelogout(){
    removeToken();
    navigate('/login');
  }


  return (
  <AppContext.Provider value={{login,handlelogout}}>

    <Header />
    <ToastContainer/>

    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/business' element={<Business/>}></Route>
      <Route path='/businesscard' element={<BusinessCard/>}></Route>
      <Route path='/login' element={<Login login={login}/>}></Route>
      <Route path='/cardslist' element={<CardsList/>}></Route>

    </Routes>
  </AppContext.Provider>
  );
}

export default App;
