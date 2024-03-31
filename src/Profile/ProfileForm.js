import React, { useContext, useState } from "react";
import Backend from "../api";
import UserContext from "../auth/UserContext";
import "./style/ProfileForm.css";

function ProfileForm(){
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const [formData, setFormData] = useState({
        username: currentUser.username,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        let profileData = {
            username: formData.username,
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
        };

        let updateUser;

        try {
           updateUser = await Backend.updateUserProfile(formData);
            alert("Profile updated!");
        } catch (error) {
            console.error("Error updating profile", error);
            alert("Failed to update profile, please try again");
        }

        setFormData(f => ({ ...f }));
        setCurrentUser(updateUser);
    };

    return(
        <div>
            <h2>Edit Profile:</h2>
            <form onSubmit={handleSubmit}>
            
            <label>
                First Name: 
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
            </label>

            <label>
                Last Name:
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
            </label>
            
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
            </label>

            <button type="submit">Save Changes</button>

            </form>
        </div>
    );
}

export default ProfileForm;