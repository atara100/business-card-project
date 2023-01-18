// set DEBUG=cards:*; & npm start
import {createContext, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
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
import { postRequest } from './services/apiService';
import MyCards from './pages/MyCards';
import Details from './pages/Details';
import RouteGuard from './auth/RouteGuard';
import RouteGuardBiz from './auth/RouteGuardBiz';
import Favourites from './pages/Favourites';
import RouteGuardOnlyBiz from './auth/RouteGuardOnlyBiz';

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
  isAdmin:boolean;
  handleLike:Function;
  deleteLike:Function;
  likesArr:Array<Icard>;
}

export const AppContext = createContext <Context | null>(null);

function App() {

  const navigate=useNavigate();
  const[userEmail,setUserEmail]=useState<string>('');
  const[userName,setUserName]=useState<string>('');
  const [userId,setUserId]=useState<string>('');
  const [userBiz,setUserBiz]=useState<boolean>(false);
  const [isAdmin,setIsAdmin]=useState<boolean>(false);
  const [likesArr,setLikesArr]=useState<Array<Icard>>([]);

  function login(data:ILoginData) {
        const res=postRequest('users/login',data,false);
        
        if(!res) return;
           res.then(response => response.json())
            .then(json => {
              if (json.error) {
                toast.error(json.error, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                });                
                return;
              }
              toast.success(`${json.name} Loged succsessifully!!!`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });       
                setToken(json.token);
                setUserId(json.id);
                setUserName(json.name);
                setUserEmail(data.email); 
                setUserBiz(json.isBiz); 
                setIsAdmin(json.isAdmin);         
                navigate('/');
            })
  }

  function handlelogout(){
    removeToken();
    setUserName('');
    navigate('/login');
  }

  function handleLike(card:Icard){
    let flag=0;  
    likesArr.forEach(c=>{
      if(c._id===card._id){
        flag=1;
        return;
      }
    })
    if(flag!==1){
      const updateLike=[...likesArr];
      updateLike.push(card);
      setLikesArr(updateLike);
      localStorage.setItem('likesArrLocal', JSON.stringify(updateLike));
    }            
  }

   function deleteLike(index:number){
    likesArr.splice(index, 1);
    setLikesArr(likesArr);
    localStorage.setItem('likesArrLocal', JSON.stringify(likesArr));
         toast.success(`The card deleted successfully from favourites`,{
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",
            });
            navigate('/');
   }


  return (
  <AppContext.Provider value={{login,handlelogout,userEmail,userId,userName,userBiz,isAdmin,handleLike,deleteLike,likesArr}}>

    <Header userId={userId} userName={userName}/>
    <ToastContainer/>

    <Routes>

      <Route path='/' element=
      {<RouteGuard><Home likesArr={likesArr}  isAdmin={isAdmin} userId={userId} userEmail={userEmail} handleLike={handleLike}/></RouteGuard>}>
      </Route>

      <Route path='/about' element={<About/>}></Route>

      <Route path='/signup' element={<SignUp/>}></Route>

      <Route path='/business' element={<Business/>}></Route>

      <Route path='/businesscard' element=
      {<RouteGuard ><RouteGuardBiz isAdmin={isAdmin} userBiz={userBiz}><BusinessCard/></RouteGuardBiz></RouteGuard>}>        
      </Route>

      <Route path='/login' element={<Login login={login}/>}></Route>

      <Route path='/mycards/' element={<RouteGuard><Login login={login}/></RouteGuard>}></Route>

      <Route path='/mycards/:id' element=
      {<RouteGuard><RouteGuardOnlyBiz  userBiz={userBiz}><MyCards likesArr={likesArr} isAdmin={isAdmin} userId={userId} handleLike={handleLike}/></RouteGuardOnlyBiz></RouteGuard>}>       
      </Route>

      <Route path='/updatecard/:id' element=
      {<RouteGuard><RouteGuardBiz isAdmin={isAdmin} userBiz={userBiz}><UpdateCard/></RouteGuardBiz></RouteGuard>}>
      </Route>

      <Route path='/details/:id' element={<RouteGuard><Details/></RouteGuard>}></Route>

      <Route path='/favourites' element=
      {<RouteGuard><Favourites likesArr={likesArr}  isAdmin={isAdmin} userId={userId} handleLike={handleLike} deleteLike={deleteLike}/></RouteGuard>}>
      </Route>

    </Routes>
  </AppContext.Provider>
  );
}

export default App;
