import { useEffect, useState } from "react";
import { getToken } from "../auth/tokenManager";
import ButtonsBar from "../components/ButtonsBar";
import Footer from "../components/Footer";
import Title from "../components/Title";
import './Home.css';

interface Icard{
  _id:number;
  title:string;
  description:string;
}

function Home() {

    const data=[{id:1,name:'atara'},{id:2,name:'beni'},{id:3,name:'calvine'},{id:4,name:'david'}];

    const [display,setDisplay]=useState('grid');
    const [filtered,setFiltered]=useState([...data]);
    const [search,setSearch]=useState('');
    const [displayCards,setDisplayCards]=useState<Array<Icard>>([]);

    function handleSearch(e:React.ChangeEvent<HTMLInputElement>){
      //get value
      const value=e.target.value;
      let res=[...data]
      if(value ){
        //filter cards
        const stripVal=value.trim().toLowerCase()
        res=[...data].filter(card=>card.name.toLowerCase().includes(stripVal))
      
      }
      //update state
       setSearch(value);
       setFiltered(res);
    }

    function fetchDisplayCards(){
      fetch('http://localhost:3000/cards/',{
          method:'GET',
          headers:{
             'x-auth-token': getToken()
          }
        })
            .then(res=>res.json())
            .then(json=>{
                setDisplayCards(json)
            })
    }

    useEffect(fetchDisplayCards,[]);

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
           displayCards.map((card)=>
          <div key={card._id} className="card m-4"  >
           <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.description}</p>
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