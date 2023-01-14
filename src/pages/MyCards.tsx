import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonsBar from "../components/ButtonsBar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { deleteRequest, getRequest } from "../services/apiService";
import { Icard } from "./Home";

function MyCards() {
    const navigate=useNavigate();
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

    function navigateAddCard(){
       navigate('/businesscard')
    }

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
        <Title main="Your Card List"
                sub="Here you can view your card list"
        />

        <hr className=" w-50 mx-auto"/>

        <Link to={`/businesscard`} onClick={navigateAddCard} className="btn btn-primary mb-3 ms-3">
            <i className="bi bi-plus-circle-fill me-2"></i> Add Card
        </Link>


        <ButtonsBar
            updateDisplay={setDisplay}
            search={search}
            handleSearch={handleSearch}
        />

         <div className={`${display} p-5`}>
          {
           filtered.map((card)=>
           
           <div  key={card._id} className="card p-3 colms-5 cardWidth">
              <img src={card.image} className="card-img-top" alt={card.title}/>
              <div className="card-body">
                 <h5 className="card-title">{card.title}</h5>
                 <h6 className="card-title">{card.shortdescription}</h6>
                 <hr />
                 <h6 className="card-text"><b>Tel:</b> {card.phone}</h6>
                 <h6 className="card-text"><b>Address:</b> {card.address}</h6>
                 <h6 className="card-text"><b>Card Number:</b> {card.bizNumber}</h6>
                 <div><i className="bi bi-hand-thumbs-up"></i></div> 
              </div>
              <div className="card-body mx-auto">
                <Link to={`/updatecard/${card._id}`} className="btn btn-light"><i className="bi bi-pencil-fill me-3"></i></Link>
                <button onClick={()=>delCard(card)} className="btn btn-light"><i className="bi bi-trash3-fill"></i></button>
              </div>
              <div className="mx-auto">
                <Link to={`/details/${card._id}`} className="btn btn-light ">See Deatails</Link>
              </div>
            </div>  
            )
           } 
         </div>

        <Footer/>
        </> 
        
     );
}

export default MyCards;