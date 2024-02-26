import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Backend {
    static token;

    static async request(endpoint, data = {}, method= "get"){
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${Backend.token}` };
        const params = (method === "get")
            ? data 
            : {};

        try {
            return (await axios({url, method, data, params, headers })).data;
        } catch (err) {
            console.error("Backedn Error", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    // user Routes

    static async getCurrentUser(username){
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    // auth routes

    static async login(data){
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    static async singup(data){
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }
}

export default Backend;