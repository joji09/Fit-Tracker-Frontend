import React, { useContext } from "react";
import {Link, NavLink } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./NavBar.css";

function NavBar({ logout }){
    const { currentUser } = useContext(UserContext);

    function loggedInNav(){
        return(
            <ul className="navbar-nav ml-auto">

                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/dashboard">Dashboard</NavLink>
                </li>

                <li className="nav-item mr-4">
                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                </li>

                <li className="nav-item mr-4">
                    <Link className="nav-link" to="/" onClick={logout}>Logout {currentUser.username }</Link>
                </li>
                
            </ul>
        );
    }

    function loggedOutNav(){
        return(
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li>
                <NavLink className="nav-link" to="/signup">Singup</NavLink>
                </li>
            </ul>
        );
    }

    return(
        <nav className="navbar">
            <Link to="/" className="nav-link">
                Fit-Tracker
            </Link>
            {currentUser ? loggedInNav() : loggedOutNav() }
        </nav>
    );
}

export default NavBar;