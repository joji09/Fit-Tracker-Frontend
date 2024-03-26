import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Homepage(){
    const { currentUser } = useContext(UserContext)

    return (
        <div className="homepage-container">
            <h1>Fit Tracker</h1>
            <p>Plan your workout split!</p>

            {currentUser ?
            <h2>Welcome back, {currentUser.firstName || currentUser.username}!</h2>
            : (
                <p>
                    <Link to="/login" className="homepage-link">Login</Link>
                    <Link to="/signup" className="homepage-link">Signup</Link>
                </p>
            )}
        </div>
    )
}

export default Homepage;