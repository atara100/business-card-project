import { useContext } from "react";
import { AppContext } from "../App";


function Logout() {

    const context=useContext(AppContext);
     if(!context) return <div>Error</div>

    return ( 
       <button className="btn btn-link nav-link" onClick={(e)=>context.handlelogout()}>Logout</button>
     );
}

export default Logout;