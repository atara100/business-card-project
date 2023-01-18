import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import BackButton from "../components/BackButton";
import DisplayCard from "../components/DisplayCard";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { Icard } from "./Home";
interface Props{
   userId:string;
   handleLike:Function;
   isAdmin:boolean;
   deleteLike:Function;
   likesArr:Array<Icard>;
  }

function Favourites({userId,handleLike,isAdmin,deleteLike,likesArr}:Props) {

    const [display,setDisplay]=useState('grid');
    const [likes,setLikes]=useState<Array<Icard>>([]);
    const [error, setError] = useState<string>('');

    function setArr (){
      if(localStorage.likesArrLocal){
        var likeArrLocal = JSON.parse(localStorage.likesArrLocal);
        setLikes(likeArrLocal);
      }else{
         setError('You have not selected favourites yet!');
         return;
      }
    }
    useEffect(setArr,[]);

    function delCard(card:Icard){
      const index=likes.indexOf(card);
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
         likesArr={likesArr} userId={userId} display={display} cardsArr={likes}  isAdmin={isAdmin} delCard={delCard} handleLike={handleLike}
        />
        {
          error &&
          <div className="h-50">
          <h3 className="text-danger text-center">
                {error}
          </h3>
          </div>
        }

        <Footer/>  
        </>
     );
}

export default Favourites;