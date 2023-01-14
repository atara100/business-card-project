import Joi from "joi";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Title from "../components/Title";
import { getRequest, patchRequest } from "../services/apiService";
import { Icard } from "./Home";

function UpdateCard() {
   
    const {id}=useParams();
    const navigate = useNavigate();

    const [title,setTitle]=useState<string>('');
    const [shortdescription,setshortdescription]=useState<string>('');
    const [description,setdescription]=useState<string>('');
    const [address,setaddress]=useState<string>('');
    const [phone,setphone]=useState<string>('');
    const [image,setimage]=useState<string>('');

    useEffect(()=>{
      const res=getRequest(`cards/${id}`);
       if(!res) return;
            res.then(res=>res.json())
               .then(json=>{
                if(json.ok === false){
                    console.log('error get the data');
                    return;
                }
                setTitle(json.title);
                setshortdescription(json.shortdescription)
                setdescription(json.description);
                setaddress(json.address);
                setphone(json.phone);
                setimage(json.image);
               })
    },[id]);

    function handleClick(){
        const schema = Joi.object().keys({
            title: Joi.string().required().min(3),
            shortdescription:Joi.string().required().min(10).max(20),
            description: Joi.string().required().min(10),
            address: Joi.string().required().min(3),
            phone: Joi.string().required().min(9),
            image: Joi.string().min(10)
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
        updateCard(value)
    }

    function updateCard(card:Icard){
       const res=patchRequest(`cards/${id}`,card)
        if(!res) return;
            res.then(res => res.json())
            .then(json => {
                if (json.error) {
                    console.log(json.error);
                    return;
                }

                navigate('/');
            })
    }

    return ( 
            <>
        <Title main="Update Business Registration Form"
                sub="update business card"
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
                Update Card
            </button>

        </div>
     </>
     );
}

export default UpdateCard;