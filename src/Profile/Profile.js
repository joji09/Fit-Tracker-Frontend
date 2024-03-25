import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Backend from "../api";
import UserContext from "../auth/UserContext";
import "./style/Profile.css";

function Profile(){

    const { currentUser, setCurrentuser } = useContext(UserContext);

    return(
        <div className="profile-container">
            <h2 className="profile-title">Profile</h2>
            {currentUser ? (
                <div className="profile-details">
                    <p>Username: {currentUser.username}</p>
                    <p>First Name: {currentUser.firstName}</p>
                    <p>Last Name: {currentUser.lastName}</p>
                    <p>Email: {currentUser.email}</p>

                    <Link to="/profile/edit">
                        <button className="change-profile-btn">Change Profile</button>
                    </Link>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Profile;