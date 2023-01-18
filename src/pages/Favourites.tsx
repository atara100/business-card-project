import { useState } from "react";
import BackButton from "../components/BackButton";
import DisplayCard from "../components/DisplayCard";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { Icard } from "./Home";
interface Props{
   userId:string;
   handleLike:Function;
   isAdmin:boolean;
   likesArr:Array<Icard>;
   deleteLike:Function;
  }

function Favourites({userId,handleLike,isAdmin,likesArr,deleteLike}:Props) {

    const [display,setDisplay]=useState('grid');

    
    function delCard(card:Icard){
      const index=likesArr.indexOf(card);
      deleteLike(index);     
    }

    return ( 
        <>
        <BackButton/>
        <Title 
          main= "Favourits Cards"
          sub="Here you will find your favourits cards"
        />
        <DisplayCard
         display={display} cardsArr={likesArr} userId={userId} isAdmin={isAdmin} delCard={delCard} likesArr={likesArr} handleLike={handleLike}
        />

        <Footer/>  
        </>
     );
}

export default Favourites;