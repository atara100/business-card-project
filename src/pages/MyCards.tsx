import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import ButtonsBar from "../components/ButtonsBar";
import DisplayCard from "../components/DisplayCard";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { deleteRequest, getRequest } from "../services/apiService";
import { Icard } from "./Home";

interface Props{
   userId:string;
   handleLike:Function;
   isAdmin:boolean;
   likesArr:Array<Icard>;
  }

function MyCards({userId,isAdmin,handleLike,likesArr}:Props) {
    const {id}=useParams();
    const [cards,setCards]=useState<Array<Icard>>([]);
    const [display,setDisplay]=useState('grid');
    const [filtered,setFiltered]=useState([...cards]);
    const [search,setSearch]=useState('');

    function fetchMyCards(){
       const res=getRequest(`cards/user/${id}`);
        if(!res) return;
         res.then(res=>res.json())
            .then(json=>{           
            setCards(json);
            setFiltered(json);                       
            })
    }
    useEffect(fetchMyCards,[id]);



    function handleSearch(e:React.ChangeEvent<HTMLInputElement>){
      //get value
      const value=e.target.value;
      let res=[...cards]
      if(value ){
      //filter cards
      const stripVal=value.trim().toLowerCase()
      res=[...cards].filter(card=>card.title.toLowerCase().includes(stripVal));      
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
              fetchMyCards();
              setCards([...cards]);
             })
    }


    return (
        <>
        <BackButton/>
        <Title main="Your Card List"
                sub="Here you can view your card list"
        />

        <hr className=" w-50 mx-auto"/>

        <Link to={`/businesscard`}  className="btn btn-primary mb-3 ms-3">
            <i className="bi bi-plus-circle-fill me-2"></i> Add Card
        </Link>


        <ButtonsBar
            updateDisplay={setDisplay}
            search={search}
            handleSearch={handleSearch}
        />

        <DisplayCard
         display={display} cardsArr={filtered} handleLike={handleLike} userId={userId} isAdmin={isAdmin} delCard={delCard} likesArr={likesArr}
        />

        <Footer/>
        </> 
        
     );
}

export default MyCards;