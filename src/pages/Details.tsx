import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Title from "../components/Title";
import { getRequest } from "../services/apiService";
import { formatDate } from "../utils/utils";

function Details() {

   const {id}=useParams();

    const [title,setTitle]=useState<string>('');
    const [shortdescription,setshortdescription]=useState<string>('');
    const [description,setdescription]=useState<string>('');
    const [address,setaddress]=useState<string>('');
    const [phone,setphone]=useState<string>('');
    const [image,setimage]=useState<string>('');
    const [cardnumber,setcardnumber]=useState<string>('');
    const [ceratedat,setcreateat]=useState<string>('');
    
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
                setcardnumber(json.bizNumber);
                setcreateat(json.createdAt);
               })
    },[id]);

    return ( 
        <>
        <Title
         main="Card Details" sub="Here you will find all the details about the card:"
        /> 
        <hr className="mx-5" />

        <div className="row w-75 p-3 col position-absolute top-50 start-50 translate-middle  mt-5 mx-auto">
            <div className="col d-flex align-items-center ">
               {description}
            </div>

            <div className="card w-25 p-3 col-md-auto ">
              <img src={image} className="card-img-top" alt="..."/>
              <div className="card-body">
                 <h5 className="card-title">{title}</h5>
                 <h6 className="card-title">{shortdescription}</h6>
                 <hr />
                 <h6 className="card-text"><b>Tel:</b> {phone}</h6>
                 <h6 className="card-text"><b>Address:</b> {address}</h6>
                 <h6 className="card-text"><b>Card Number:</b> {cardnumber}</h6>
                 <h6 className="card-text"><b>Created At:</b> {formatDate(ceratedat)}</h6>
              </div>
            </div>
            <Footer/>
        </div>

        
     </>
     );
}

export default Details;