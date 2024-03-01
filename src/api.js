import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class Backend {
    static token;

    static async request(endpoint, data = {}, method= "get"){
        console.debug("API call:", endpoint, data, method);
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

    static async signup(data){
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    // Playlist routes

    static async addExerciseToPlaylist(data) {
        let res = await this.request(`/playlist/add`, data, "post");
        return res.mappingId;
    }

    static async getUserPlaylist(userId) {
        let res = await this.request(`/playlist/playlist`, { userId });
        return res.userPlaylist;
    }

    static async removeExerciseFromPlaylist(mappingId){
        await this.request(`/playlist/remove/${mappingId}`, {}, "delete");
    }
}

Backend.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default Backend;