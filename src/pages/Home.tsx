import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getToken } from "../auth/tokenManager";
import ButtonsBar from "../components/ButtonsBar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { deleteRequest, getRequest } from "../services/apiService";
import './Home.css';

export interface Icard{
   _id:number;
   title:string;
   shortdescription:string;
   description:string;
   address:string;
   phone:string;
   image:string;
   bizNumber:string;
   createdAt:Date;
   user_id:string;
   
}

interface Props{
  userEmail:string;
   userId:string;
   likesArr:Array<Icard>;
  }

function Home({userEmail,userId,likesArr}:Props) {
    
    const navigate=useNavigate()
    const [displayCards,setDisplayCards]=useState<Array<Icard>>([]);
    const [display,setDisplay]=useState('grid');
    const [filtered,setFiltered]=useState([...displayCards]);
    const [search,setSearch]=useState('');
    const [likes,setLikes]=useState<Array<Icard>>([]);

       function fetchDisplayCards(){
       const res=getRequest('cards');
         if(!res) return;
        res.then(res=>res.json())
            .then(json=>{
                setDisplayCards(json);
                setFiltered(json);
            })
    }
    useEffect(fetchDisplayCards,[]);
    

    function handleSearch(e:React.ChangeEvent<HTMLInputElement>){
      //get value
      const value=e.target.value;
      let res=[...displayCards]
      if(value ){
      //filter cards
      const stripVal=value.trim().toLowerCase()
      res=[...displayCards].filter(card=>card.title.toLowerCase().includes(stripVal));      
      }
      //update state
       setSearch(value);
       setFiltered(res);
    }

    function delCard(card:Icard){
      const res = deleteRequest(`cards/${card._id}`);
      if(!res) return; 
      res.then(res=>res.json())
             .then(json=>{
              fetchDisplayCards();
              setDisplayCards([...displayCards]);
             })
    }

    function handlelLike(card:Icard){
      likes.push(card);
      setLikes(likes);     
    }

    // function navigateDetails(cardid:number){
    //   navigate(`/details/${cardid}`);
    // }


    return ( 
        <>
       {
         userEmail &&
<>
        <Title 
          main= "Business Card App"
          sub="Here you will find business cards"
        />

        <ButtonsBar
            updateDisplay={setDisplay}
            search={search}
            handleSearch={handleSearch}
        />

         <div className={`${display} p-5`}>
          {
           filtered.map((card)=>
           <div key={card._id} className="card p-3 colms-5 cardWidth">
              <img src={card.image} className="card-img-top" alt={card.title}/>
              <div className="card-body">
                 <h5 className="card-title">{card.title}</h5>
                 <h6 className="card-title">{card.shortdescription}</h6>
                 <hr />
                 <h6 className="card-text"><b>Tel:</b> {card.phone}</h6>
                 <h6 className="card-text"><b>Address:</b> {card.address}</h6>
                 <h6 className="card-text"><b>Card Number:</b> {card.bizNumber}</h6>
                 <button onClick={()=>handlelLike(card)} className="btn"><i className="bi bi-hand-thumbs-up"></i></button>
              </div>
              {
                 userId===card.user_id &&
              <div className="card-body mx-auto">
                <Link to={`/updatecard/${card._id}`} className="btn btn-light me-3"><i className="bi bi-pencil-fill "></i></Link>
                <button onClick={()=>delCard(card)} className="btn btn-light"><i className="bi bi-trash3-fill"></i></button>
              </div>
              }
              <div className="mx-auto">
                <Link to={`/details/${card._id}`} className="btn btn-light ">See Deatails</Link>
              </div>

            </div>  
            )
           } 
         </div>
        </> 
  }

  {
    !userEmail &&
    <div className="text-center mt-5">
      <h1>HELLO</h1>
      <br/>
      <h4>Please login to see all the business card!</h4>
      <br/>
      <Link to={'/login'} className="btn btn-primary ">Go Login</Link>
    </div>
  }
  
        <Footer/>  
        </>
     );
}

export default Home;