import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import Backend from "../api";
import WorkoutSearch from "../Workout/WorkoutSearch";
import DailyPlaylist from "../Playlist/DailyPlaylist";

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
        <div className="container text-center">
            <h1 className="mt-5">Welcome back {currentUser.firstName || currentUser.username}!</h1>

            <div>
            <h2 className="mt-5">Today's Playlist</h2>
            <DailyPlaylist />
            </div>

                <div className="col-md-4 mb-4">
                <Link to="/playlists" className="card text-center">
                    <div className="card-body">
                    <h2>Manage Playlist</h2>
                    <p className="card-text">Manage your playlists!</p>
                    </div>
                </Link>
            </div>

            <div className="col-md-4 mb-4">
                <Link to="/workout-search" className="card text-center">
                    <div className="card-body">
                    <h2>Find Workouts</h2>
                    <p className="card-text">Plan your workouts!</p>
                    </div>
                </Link>
            </div>

            <WorkoutSearch userPlaylists={userPlaylists} />
        </div>
    );
}

export default Dashboard;