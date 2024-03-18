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

    static async updateUserProfile(data){
        try {
            const res = await this.request(`users/update`, data, 'patch');
            return res.user;
        } catch (error) {
            console.error("Error updating profile", error);
            throw Error;
        }
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

    // User routes

    static async getUserId(username) {
        // console.log(`requesting username: ${username}`);
        try {
            console.log(username);
            const res = await this.request(`users/userId/${username}`);
            // console.log(res);
            // console.log(res.user);
            return res.user;
        } catch (error) {
            console.error("Error fetching userId", error);
            throw error;
        }
    }

    // Playlist routes

    static async addExerciseToPlaylist(data) {
        // adds exercises to playlist
        let res = await this.request(`playlist/playlist/add`, data, "post");
        return res.mappingId;
    }

    static async getUserPlaylist(userId) {
        // fetches the user's playlist
        let res = await this.request(`playlist/playlist`, { userId });
        return res.userPlaylist;
    }

    static async removeExerciseFromPlaylist(mappingId){
        // removes an exercise from a playlist
        await this.request(`playlist/playlist/remove/${mappingId}`, {}, "delete");
    }

    static async createPlaylist(data){
        // creates a new playlist
        await this.request('playlist/playlist/create', data, "post");
        console.log(data);
        console.log("playlist created");
    }

    static async removePlaylist(userId, playlistName) {
        // remove playlist
        await this.request(`playlist/playlist/remove/${userId}/${playlistName}`, {}, "delete");
        console.log("playlist deleted")
    }

    // Workout API Routes


    static async getExerciseByBodyPart(bodyPart) {
        try {
            const res = await this.request(`workout/exercises/${bodyPart}`);
            return res.exercises;
        } catch (error) {
            console.error("Error fetching exercises by body part", error);
            throw error;
        }
    }

    static async getExerciseByBodyPartAndEquipment(bodyPart, equipment) {
        try {
            const workouts = await this.getExerciseByBodyPart(bodyPart);
        if (equipment) {
            const filteredWorkouts = workouts.filter(workout => workout.equipment === equipment);
            return filteredWorkouts;
        } else {
            return workouts;
            }
        } catch (error) {
            console.error("Error fetching exercises by body part and equipment", error);
            throw error;
        }
    } 
}

Backend.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default Backend;