import { NavLink } from "react-router-dom";
import Logout from "../auth/Logout";

function Header() {
    return ( 
<header>
   <nav className="navbar navbar-expand-lg navbar-light bg-light">
     <div className="container-fluid">   
    <NavLink className="navbar-brand" to="/">
      Business Card App
    </NavLink>

    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
     aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
    </button>

     <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/about"
                                >
                                    About
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/cardslist"
                                >
                                    My Cards
                                </NavLink>
                            </li>

                                  <li className="nav-item">
                                     <NavLink
                                          className="nav-link"
                                          aria-current="page"
                                          to="/"
                                      >
                                          My Favorite Cards
                                      </NavLink>
                                  </li>               
                        </ul>

                        <ul className="navbar-nav d-flex">
                          
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/signup"
                                >
                                    Sign Up
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/business"
                                >
                                    Business
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink
                                    className="nav-link"
                                    aria-current="page"
                                    to="/login"
                                >
                                    Login
                                </NavLink>
                            </li>
                    
                              <li className="nav-item">
                                  <Logout /> 
                              </li>

                        </ul>
                    </div>
                </div>
            </nav>
        </header>
     );
}

export default Header;