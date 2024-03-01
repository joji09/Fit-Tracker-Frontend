import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SingupForm({ signup }){
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "",
    });

    const [formError, setFormError] = useState([]);

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await signup(formData);
        if(result.sucess){
            history.push("/dashboard");
        } else {
            console.log(formData);
            setFormError(result.err);
        }
    }

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(data => ({ ...data, [name]: value }));
    }

    return (
        <div className="SingupForm">
            <div className="container">
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
            
            <div>
                <label>Username</label>
                <input name="username" value={formData.username} onChange={handleChange} />
            </div>

            <div>
                <label>Password</label>
                <input name="password" type="password" value={formData.password} onChange={handleChange} />
            </div>

            <div>
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} />
            </div>

            <div>
                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>

            <div>
                <label>Email</label>
                <input name="email" value={formData.email} onChange={handleChange} />
            </div>

            {formError.length ? <p>Error</p> : null}

            <button type="submit" onSubmit={handleSubmit}>Submit</button>

            </form>
            </div>
        </div>
    );
}

export default SingupForm;