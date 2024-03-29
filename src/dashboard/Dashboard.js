import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Backend from "../api";
import WorkoutSearch from "../Workout/WorkoutSearch";
import DailyPlaylist from "../Playlist/DailyPlaylist";
import "./Dashboard.css";

function Dashboard(){
    const { currentUser } = useContext(UserContext);
    const [dayWorkouts, setDayWorkouts] = useState([]);
    const [userPlaylists, setUserPlaylists] = useState([]);

    // useEffect(() => {
    //     const fetchUserPlaylists = async () => {
    //         try {
    //             const userId = await Backend.getUserId(currentUser.username);
    //             console.log(userId);
    //             const playlists = await Backend.getUserPlaylist(userId);
    //             console.log(playlists);
    //             setUserPlaylists(playlists);
    //         } catch (error) {
    //             console.error("Error fetching user's playlist", error);
    //         }
    //     };
    //     fetchUserPlaylists();
    // }, []);
    
    return(
        // <div className="container text-center">
        <div className="dashboard-container">
            <div className="dashboard-heading">
            <h2 className="mt-5">Welcome back {currentUser.firstName || currentUser.username}!</h2>
            </div>
            <div className="dashboard-card-container">
                {/* <div className="col-md-4 mb-4"> */}
                <div className="dashboard-card">
                {/* <Link to="/playlists" className="card text-center"> */}
                <Link to="/playlists" className="dashboard-link">
                    <div className="card-body">
                    <h5>Manage Playlist</h5>
                    <p className="card-text">Manage your playlists!</p>
                    </div>
                </Link>
            </div>

            {/* <div className="col-md-4 mb-4"> */}
            <div className="dashboard-card">
                {/* <Link to="/workout-search" className="card text-center"> */}
                <Link to="/workout-search" className="dashboard-link">
                    <div className="card-body">
                    <h5>Find Workouts</h5>
                    <p className="card-text">Plan your workouts!</p>
                    </div>
                </Link>
            </div>

            <div className="dashboard-card">
                {/* <Link to="/workout-search" className="card text-center"> */}
                <Link to="/profile" className="dashboard-link">
                    <div className="card-body">
                    <h5>Profile</h5>
                    <p className="card-text">Edit your profile</p>
                    </div>
                </Link>
            </div>
            </div>

            <div className="dailyplaylist-container">
            <h2 className="today-title">Today's Playlist</h2>
            <DailyPlaylist />
            </div>

            <WorkoutSearch userPlaylists={userPlaylists} />
        </div>
    );
}

export default Dashboard;