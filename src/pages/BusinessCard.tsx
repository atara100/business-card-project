import { useNavigate } from "react-router-dom";
import Title from "../components/Title";

function BusinessCard() {
    
    const navigate=useNavigate();

    function passLogin(){
        navigate('/login')
    }
    
    return ( 
    <>
        <Title main="Business Registration Form"
                sub="Open business card"
        />

        <div className=" form-max-w m-aotu row w-50 p-3 mx-auto mt-5">

            <div className="mb-3 ">
                <label className="mb-2" htmlFor="">Business Name</label>
               <input className="form-control" type="email"
               />
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Description</label>
               <input className="form-control" type="password" 
               />
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Address</label>
               <input className="form-control" type="text" 
               />
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Phone</label>
               <input className="form-control" type="text" 
               />
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Image</label>
               <input className="form-control" type="text" 
               />
            </div>

            <button onClick={passLogin} className="btn btn-primary btn-lg w-50 mx-auto">
                Create Card
            </button>

        </div>
     </>
     );
}

export default BusinessCard;