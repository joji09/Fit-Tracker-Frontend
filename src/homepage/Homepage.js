import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "../images/homepage.png"
import "./Homepage.css";

function Homepage(){
    const { currentUser } = useContext(UserContext)

    return (
        <div className="container">
            <div className="content">
            <div className="info">
            <h1>Plan your workout split!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihi</p>
            <div className="homepage-links">
            {currentUser ?
            <Link to="/dashboard" className="homepage-link">Dashboard</Link>
            : (
                <p>
                    <Link to="/login" className="homepage-link">Login</Link>
                    <Link to="/signup" className="homepage-link">Signup</Link>
                </p>
            )}
            </div>
            </div>
            <div className="image">
                <img src="https://v2.exercisedb.io/image/wXqlsc9kIGx5ne" alt="Workout"></img>
            </div>
            </div>
        </div>
    )
}

export default Homepage;