import Joi from "joi";
import {useState } from "react";
import { useNavigate} from "react-router-dom";
import Title from "../components/Title";
import {postRequest } from "../services/apiService";
import { Icard } from "./Home";

function BusinessCard() {
    
    const navigate=useNavigate();
    const [title,setTitle]=useState<string>('');
    const [shortdescription,setshortdescription]=useState<string>('');
    const [description,setdescription]=useState<string>('');
    const [address,setaddress]=useState<string>('');
    const [phone,setphone]=useState<string>('');
    const [image,setimage]=useState<string>('');


    function handleClick(){
         const schema = Joi.object().keys({
            title: Joi.string().required().min(3),
            shortdescription:Joi.string().required().min(10).max(20),
            description: Joi.string().required().min(10),
            address: Joi.string().required().min(3),
            phone: Joi.string().required().min(9),
            image: Joi.string().min(10),
        });

        const { error, value } = schema.validate({
            title,
            shortdescription,
            description,
            address,
            phone,
            image
        });

        if (error) {
            console.log(error.message);
            return;
        }
        
        createCard(value);
    }

    function createCard(card:Icard){
     const res=postRequest(`cards/`,card)
        if(!res) return;
            res.then(res => res.json())
             .then(json => {
                    if (json.error) {
                    console.log(json.error);
                    return;
                }
         navigate('/login');
            })

    }
    
    return ( 
    <>
        <Title main="Business Registration Form"
                sub="Open business card"
        />

        <div className=" form-max-w m-aotu row w-50 p-3 mx-auto mt-5">

            <div className="mb-3 ">
                <label className="mb-2" htmlFor="">Business Name</label>
                <input className="form-control" type="text"
                 value={title} onChange={(e)=>setTitle(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Short description</label>
               <input className="form-control" type="text" 
                value={shortdescription} onChange={(e)=>setshortdescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Description</label>
               <input className="form-control" type="text" 
                value={description} onChange={(e)=>setdescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Address</label>
               <input className="form-control" type="text" 
                value={address} onChange={(e)=>setaddress(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Phone</label>
               <input className="form-control" type="text" 
                value={phone} onChange={(e)=>setphone(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label className="mb-2" htmlFor="">Business Image</label>
               <input className="form-control" type="text" 
                value={image} onChange={(e)=>setimage(e.target.value)}/>
            </div>

            <button onClick={handleClick} className="btn btn-primary btn-lg w-50 mx-auto">
                Create Card
            </button>

        </div>
     </>
     );
}

export default BusinessCard;