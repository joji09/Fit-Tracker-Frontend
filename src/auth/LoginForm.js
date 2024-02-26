import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function LoginForm({ login }){
    const history = useHistory();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [formError, setFormError] = useState([]);

    async function handleSubmit(evt){
        evt.preventDefault();
        let result = await login(formData);
        if(result.success){
            history.push("/homepage");
        } else {
            setFormError(result.err);
        }
    }

    function handleChange(evt){
        const { name, value } = evt.target;
        setFormData(log => ({ ...log, [name]: value }));
    }

    return (
        <div className="LoginForm">
            <div className="container">

            <form onSubmit={handleSubmit}>

                <div>
                    <label>Username</label>
                    <input name="username" value={formData.username} onChange={handleChange} required />
                </div>

                <div>
                    <label>Password</label>
                    <input name="password" type="password" value={formData.password} onChange={handleChange} required />
                </div>

                <button onSubmit={handleSubmit}>Submit</button>
            </form>
            </div>
        </div>
    );
}

export default LoginForm;