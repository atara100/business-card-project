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
   description:string;
   address:string;
   phone:string;
   image:string;
   bizNumber:string;
   createdAt:Date;
}

interface Props{
  userEmail:string;
}

function Home({userEmail}:Props) {
    
    const [displayCards,setDisplayCards]=useState<Array<Icard>>([]);
    const [display,setDisplay]=useState('grid');
    const [filtered,setFiltered]=useState([...displayCards]);
    const [search,setSearch]=useState('');

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

    return ( 
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
                 <h6 className="card-title">{card.description}</h6>
                 <hr />
                 <h6 className="card-text"><b>Tel:</b> {card.phone}</h6>
                 <h6 className="card-text"><b>Address:</b> {card.address}</h6>
                 <h6 className="card-text"><b>Card Number:</b> {card.bizNumber}</h6>
                 <i className="bi bi-hand-thumbs-up"></i>
              </div>
              <div className="card-body mx-auto">
                <Link to={`/updatecard/${card._id}`} className="btn"><i className="bi bi-pencil-fill me-3"></i></Link>
                <button onClick={()=>delCard(card)} className="btn"><i className="bi bi-trash3-fill"></i></button>
              </div>
            </div>  
            )
           } 
         </div>

        <Footer/>

        </>
     );
}

export default Home;