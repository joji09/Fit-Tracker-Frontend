import React, { useContext } from "react";
import {Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";

function NavBar({ logout }){
    const { currentUser } = useContext(UserContext);

    function loggedInNav(){
        return(
            <ul>
                <li>
                    <Link to="/" onClick={logout}>Logout {currentUser.username }</Link>
                </li>
            </ul>
        );
    }

    // function loggedOutNav(){
    //     return(
    //         <ul>
    //             <li>
    //                 <NavLink to="/login">Login</NavLink>
    //             </li>
    //             <li>
    //             <NavLink to="/singup">Singup</NavLink>
    //             </li>
    //         </ul>
    //     );
    // }

    return(
        <nav>
            <Link to="/">
                Fit-Tracker
            </Link>
            {currentUser ? loggedInNav() : null }
        </nav>
    );
}

export default NavBar;
