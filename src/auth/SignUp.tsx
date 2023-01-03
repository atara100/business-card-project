import Joi from "joi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Title from "../components/Title";
import { postRequest } from "../services/apiService";

interface ISignUpData{
   email:string;
   password:string;
   name:string;
}

function SignUp() {

 const navigate=useNavigate();
 const [email,setEmail]=useState<string>('');
 const [password,setPassword]=useState<string>('');
 const [name,setName]=useState<string>('');
  const [isBiz,setIsBiz]=useState<boolean>(false);

 function submit(){
      const schema = Joi.object().keys({
            email: Joi.string().required().min(6).max(255).email({tlds:{allow:false}}),
            password: Joi.string().required().min(6).max(30),
            name: Joi.string().required().min(2).max(56),
            isBiz: Joi.boolean().required()
        });

        const { error, value } = schema.validate({
            name,
            email,
            password,
            isBiz
        });

        if (error) {
            console.log(error.message);
            return;
        }

      register(value);
 }

 function register(data:ISignUpData){
    const res=postRequest('users/signup',data,false)
        if(!res) return;
            res.then(response => response.json())
            .then(json => {

                if (json.error) {
                    toast.error(json.error, {
                        position: "top-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark", });
                    return;
                }

               navigate('/login')
            })
 }

    return ( 
    <>
        <Title main="Signup For Real App"
               sub="you can open new account for free"
        />

        <div className=" form-max-w m-aotu row w-50 p-3 mx-auto mt-5">

            <div className="mb-3 ">
               <input className="form-control" type="email" placeholder="Email"
                value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>

            <div className="mb-3">
               <input className="form-control" type="password" placeholder="Password"
                value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>

            <div className="mb-3">
               <input className="form-control" type="text" placeholder="Name"
                value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>

            <button onClick={submit} className="btn btn-primary btn-lg w-50 mx-auto">
                Sign Up
            </button>

        </div>
     </>
     );
}

export default SignUp;