import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyToken } from "./tokenManager";

interface Props{
    children: React.ReactNode;
    userBiz:boolean;
}

function RouteGuardOnlyBiz({children,userBiz}:Props) {

    return verifyToken() &&  userBiz ? (
        <>{children}</>
    ) : (
        <>
        {
        toast.error('You are not buziness user!',
         {
             position: "top-center",
             autoClose: 5000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
             progress: undefined,
             theme: "light",
             })
             
        }
        <Navigate to={'/'}  />
        </>       
    )
}

export default RouteGuardOnlyBiz;