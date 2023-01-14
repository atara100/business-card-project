import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface Props{
    children: React.ReactNode
    userBiz:boolean;
}

function RouteGuardBiz({children,userBiz}:Props) {

    return userBiz ? (
        <>{children}</>
    ) : (
        <>
        {
        toast.error('You are not buziness user!', {
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

export default RouteGuardBiz;