import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Dashboard(){
    const { currentUser } = useContext(UserContext);
    const [dayWorkouts, setDayWorkouts] = useState([]);
    
    return(
        <div className="container text-center">
            <h1 className="mt-5">Welcome back {currentUser.firstName || currentUser.username}!</h1>

            <div className="row justify-content-center mt-5">
                <div className="col-md-4 mb-4"></div>
                <Link to="/track-progress" className="card text-cent">
                    <div className="card-body">
                    <h2>Track Progress</h2>
                    <p className="card-text">View your progress over time</p>
                    </div>
                </Link>
            </div>

                <div className="col-md-4 mb-4">
                <Link to="/playlists" className="card text-center">
                    <div className="card-body">
                    <h2>Manage Playlist</h2>
                    <p className="card-text">Manage your playlists!</p>
                    </div>
                </Link>
            </div>

            <h2 className="mt-5">Today's Workouts</h2>
            {dayWorkouts.length > 0 ? (
                <ul>
                    {dayWorkouts.map(workout => (
                        <li key={workout.id}>
                            <Link to={`/workouts/${workout.id}`}>{workout.name}</Link>
                        </li>
                    ))}
                </ul>
            ): (
                <p>No workouts found for today.</p>
            )}
        </div>
    );
}

export default Dashboard;