import { useState } from "react";
import { Link } from "react-router-dom";
import { Icard } from "../pages/Home";

interface Props{
 display:string
 cardsArr:Array<Icard>;
 userId:string;
 isAdmin:boolean;
 delCard:Function;
 handleLike:Function;
 likesArr:Array<Icard>;
}

function DisplayCard({display,cardsArr,userId,isAdmin,delCard,handleLike,likesArr}:Props) {
    
    function buttonLike(card:Icard){
      handleLike(card);         
    } 
    
    return ( 
        <div className={`${display} p-5 row`}>
          {
           cardsArr.map((card)=>         
           <div key={card._id} className="card p-3 me-3  col col-10 col-sm-12 col-md-4 col-lg-3 mb-3">
            
              <img src={card.image} className="card-img-top" alt={card.title}/>
              <div className="card-body">
                 <h5 className="card-title">{card.title}</h5>
                 <h6 className="card-title">{card.shortdescription}</h6>
                 <hr />
                 <h6 className="card-text"><b>Tel:</b> {card.phone}</h6>
                 <h6 className="card-text"><b>Address:</b> {card.address}</h6>
                 <h6 className="card-text"><b>Card Number:</b> {card.bizNumber}</h6>      
                 <button onClick={()=>buttonLike(card)} className="btn"><i className={`bi bi-hand-thumbs-up`}></i></button>
              </div>
              {
                 (userId===card.user_id || isAdmin) &&
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
     );
}

export default DisplayCard;