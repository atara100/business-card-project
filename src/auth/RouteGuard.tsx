import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyToken } from "./tokenManager";

interface Props{
    children: React.ReactNode
}

function RouteGuard({children}:Props) {
    return verifyToken() ? (
        <>{children}</>
    ) : (
        
       <Navigate to={'/login'}  />
        
    )
}

export default RouteGuard;