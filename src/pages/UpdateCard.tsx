import Joi from "joi";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
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
    const [error, setError] = useState<string>('');

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
            setError(error.message);
            return;
        }
        setError('');
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
        <BackButton/>
        <Title main="Update Business Registration Form"
                sub="update business card"
        />        
            {
                error &&
                <div className="text-danger text-center">
                    {error}
                </div>
            }

        <div className="form-max-w  bg-light m-4 w-50 mx-auto" >

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

            <button onClick={handleClick} className="btn btn-info ms-3">
                Update Card
            </button>

            <Link to='/' className="btn btn-secondary ms-3 me-3" >
                Cancele
            </Link>
            
        </div>

     </>
     );
}

export default UpdateCard;