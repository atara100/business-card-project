import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Title from "../components/Title";

function CardsList() {
    const navigate=useNavigate()

    function navigateAddCard(){
       navigate('/businesscard')
    }
    return (
        <>
        <Title main="Your Card List"
                sub="Here you can view your card list"
        />

        <hr className=" w-50 mx-auto"/>

        <button onClick={navigateAddCard} className="btn btn-primary mt-3">
            <i className="bi bi-plus-circle-fill me-2"></i> Add Card
        </button>


        <Footer/>
        </> 
        
     );
}

export default CardsList;