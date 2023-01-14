// set DEBUG=cards:*; & npm start
import {createContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Business from './auth/Business';
import Login from './auth/Login';
import SignUp from './auth/SignUp';
import { removeToken, setToken } from './auth/tokenManager';
import Header from './components/Header';
import About from './pages/About';
import BusinessCard from './pages/AddCard';
import Home, { Icard } from './pages/Home';
import UpdateCard from './pages/UpdateCard';
import {postRequest } from './services/apiService';
import MyCards from './pages/MyCards';
import Details from './pages/Details';
import RouteGuard from './auth/RouteGuard';
import RouteGuardBiz from './auth/RouteGuardBiz';
import Favourites from './pages/Favourites';
interface ILoginData{
  email:string;
  password:string;
}

interface Context{
  login:Function;
  handlelogout:Function;
  userEmail:string;
  userId:string;
  userName:string;
  userBiz:boolean;
  likesArr:Array<Icard>;
}

export const AppContext = createContext <Context | null>(null);

function App() {

  const navigate=useNavigate();
  const[userEmail,setUserEmail]=useState<string>('');
  const[userName,setUserName]=useState<string>('');
  const [userId,setUserId]=useState<string>('');
  const [userBiz,setUserBiz]=useState<boolean>(false);
  const [likesArr,setLikesArr]=useState<Array<Icard>>([]);
 

  function login(data:ILoginData) {
        const res=postRequest('users/login',data,false);
        if(!res) return;
           res.then(response => response.json())
            .then(json => {
                setToken(json.token);
                setUserId(json.id);
                setUserName(json.name);
                setUserEmail(data.email); 
                setUserBiz(json.isBiz);          
                navigate('/');
            })
  }


  function handlelogout(){
    removeToken();
    setUserName('');
    navigate('/login');
  }


  return (
  <AppContext.Provider value={{login,handlelogout,userEmail,userId,userName,userBiz,likesArr}}>

    <Header userId={userId} userName={userName}/>
    <ToastContainer/>

    <Routes>
      <Route path='/' element={<Home likesArr={likesArr} userId={userId} userEmail={userEmail}/>}></Route>
      <Route path='/about' element={<About/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/business' element={<Business/>}></Route>
      <Route path='/businesscard' element={<RouteGuard ><RouteGuardBiz userBiz={userBiz}><BusinessCard/></RouteGuardBiz></RouteGuard>}></Route>
      <Route path='/login' element={<Login login={login}/>}></Route>
      <Route path='/mycards/' element={<RouteGuard><Login login={login}/></RouteGuard>}></Route>
      <Route path='/mycards/:id' element={<RouteGuard><RouteGuardBiz userBiz={userBiz}><MyCards/></RouteGuardBiz></RouteGuard>}></Route>
      <Route path='/updatecard/:id' element={<RouteGuard><RouteGuardBiz userBiz={userBiz}><UpdateCard/></RouteGuardBiz></RouteGuard>}></Route>
      <Route path='/details/:id' element={<RouteGuard><Details/></RouteGuard>}></Route>
      <Route path='/favourites' element={<RouteGuard><Favourites likesArr={likesArr}/></RouteGuard>}></Route>
      
    </Routes>
  </AppContext.Provider>
  );
}

export default App;
