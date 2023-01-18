import {useEffect, useState } from "react";
import {Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import ButtonsBar from "../components/ButtonsBar";
import DisplayCard from "../components/DisplayCard";
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
   handleLike:Function;
   isAdmin:boolean;
   likesArr:Array<Icard>;
  }

function Home({userId,handleLike,isAdmin,likesArr}:Props) {
    
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
        <> 
          <BackButton/> 

        <Title 
          main= "Business Card App"
          sub="Here you will find business cards"
        />

        <Link to={`/businesscard`} className="btn btn-primary mb-3 ms-3">
            <i className="bi bi-plus-circle-fill me-2"></i> Add Card
        </Link>

        <ButtonsBar
            updateDisplay={setDisplay}
            search={search}
            handleSearch={handleSearch}
        />

        <DisplayCard
         handleLike={handleLike} display={display} cardsArr={filtered} userId={userId} isAdmin={isAdmin} delCard={delCard} likesArr={likesArr}
        />

        </> 
  
        <Footer/>  
        </>
     );
}

export default Home;