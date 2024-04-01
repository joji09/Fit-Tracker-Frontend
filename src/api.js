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

    // Fetches currentuser information by their username
    static async getCurrentUser(username){
        let res = await this.request(`users/${username}`);
        return res.user;
    }

    // Updates user's information
    static async updateUserProfile(data){
        try {
            console.log(data);
            const res = await this.request(`users/update`, data, 'patch');
            return res.user;
        } catch (error) {
            console.error("Error updating profile", error);
            throw Error;
        }
    }

    // auth routes

    // Handles login functionality
    static async login(data){
        let res = await this.request(`auth/token`, data, "post");
        return res.token;
    }

    // Handles login functionality
    static async signup(data){
        let res = await this.request(`auth/register`, data, "post");
        return res.token;
    }

    // User routes

    static async getUserId(username) {
        try {
            const res = await this.request(`users/userId/${username}`);
            return res.user;
        } catch (error) {
            console.error("Error fetching userId", error);
            throw error;
        }
    }

    // Playlist routes

    // Adds exercises to playlist
    static async addExerciseToPlaylist(userId, workoutId, workoutName, workoutBodyPart, playlistId, playlistName) {
        const exerciseId = workoutId;
        const bodyPart = workoutBodyPart;
        const data = { userId, exerciseId, workoutName, bodyPart, playlistId, playlistName };
        let res = await this.request(`playlist/playlist/add`, data, "post");
        console.log("exercise added to targeted playlist");
        return res.mappingId;
    }

    // Fetches the user's playlist.
    static async getUserPlaylist(userId) {
        let res = await this.request(`playlist/playlist`, { userId });
        return res.userPlaylist;
    }

    // Fetches user's playlist details.
    static async getPlaylistDetails(playlistId) {
        try {
            const res = await this.request(`playlist/playlist/${playlistId}`);
            return res.playlistDetails;
        } catch (error) {
            console.error("Error fetching playlist details - frontend", error);
            throw error;
        }
    }

    // Fetches Playlist's workouts.
    static async getPlaylistWorkouts(playlistId) {
            console.log(`Running getPlaylistWorkouts: ${playlistId}`);
            const response = await this.request(`playlist/playlist/workouts/${playlistId}`);
            return response.PlaylistWorkouts;
    }


    // Removes Workout from user's Playlist.
    static async removeWorkoutFromPlaylist(playlistId, playlistWorkoutId) {
        // removes an exercise from a playlist
        await this.request(`playlist/playlist/workouts/${playlistId}/${playlistWorkoutId}`, {}, "delete");
    }

    // Creates Playlist under an userId.
    static async createPlaylist(userId, playlistName, days){
        const data = { userId, playlistName, days }
        await this.request('playlist/playlist/create', data, "post");
        console.log("playlist created");
    }

    // Deletes the user's playlist
    static async removePlaylist(playlistId) {
        await this.request(`playlist/playlist/remove/${playlistId}`, {}, "delete");
        console.log("playlist deleted")
    }

     // Updates Sets, Reps and Weight from specific WorkoutId in User's Playlist
    static async UpdateWorkoutVal(playlistId, playlistWorkoutId, sets, reps, weight) {
        try {
            const data = { sets, reps, weight }
            await this.request(`playlist/playlist/workouts/${playlistId}/${playlistWorkoutId}`, data, "patch");
            console.log("Workout values updated");
        } catch (error) {
            console.error("Error updating workout values", error);
        }
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

    static async getExerciseByWorkoutId(workoutId) {
        let res = await this.request(`workout/exercise/find/${workoutId}`);
        return res;
    }
    
    static async getExerciseById(workoutId){
        console.log(workoutId);
        let res = await this.request(`workout/exercise/${workoutId}`);
        return res;
    } return (error) {
        console.error("Error fetching exercise", error);
        throw error;
    }
}

Backend.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
"SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
"FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

export default Backend;