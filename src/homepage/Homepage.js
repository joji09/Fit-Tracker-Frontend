import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Homepage.css";

function Homepage(){
    const { currentUser } = useContext(UserContext)

    return (
        <div className="container">
            <div className="content">
            <div className="info">
            <h1>Plan your workout split!</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus odit nihil ullam nesciunt quidem iste, Repellendus odit nihi</p>
            </div>
            <div className="homepage-links">
            {currentUser ?
            <h2>Welcome back, {currentUser.firstName || currentUser.username}!</h2>
            : (
                <p>
                    <Link to="/login" className="homepage-link">Login</Link>
                    <Link to="/signup" className="homepage-link">Signup</Link>
                </p>
            )}
            </div>
            <div className="image">
                <img src="https://v2.exercisedb.io/image/9IYIbADzSzVXiQ" alt="Workout"></img>
            </div>
            </div>
        </div>
    )
}

export default Homepage;