import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Backend from "../api";
import UserContext from "../auth/UserContext";

function Profile(){
    // const [user, setUser] = useState(null);

    // useEffect(() => {
    //     const fetchUserData = async () => {
    //         try {
    //             const userData = await Backend.getCurrentUser();
    //             setUser(userData);
    //         } catch (error) {
    //             console.error("Error fetching user data", error);
    //         }
    //     };
    //     fetchUserData();
    // }, []);

    const { currentUser, setCurrentuser } = useContext(UserContext);

    return(
        <div>
            <h2>Profile</h2>
            {currentUser ? (
                <div>
                    <p>Username: {currentUser.username}</p>
                    <p>First Name: {currentUser.firstName}</p>
                    <p>Last Name: {currentUser.lastName}</p>
                    <p>Email: {currentUser.email}</p>

                    <Link to="/profile/edit">
                        <button>Change Profile</button>
                    </Link>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
    );
}

export default Profile;