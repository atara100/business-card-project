import { useState } from "react";
import { Icard } from "./Home";

interface Props{
    likesArr:Array<Icard>;
}
function Favourites({likesArr}:Props) {

    const [likes,setLikes]=useState<Array<Icard>>(likesArr) ;
    function b(){
        console.log(`arr:${likesArr}`);
    }

    return ( 
        <>
        <h2>Favourites</h2>
        {
            
        likesArr.map(card=>
            <div>{card.title}</div>
        )
        }
        <button onClick={b}>click</button>
        </>
     );
}

export default Favourites;