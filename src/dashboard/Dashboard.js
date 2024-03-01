import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";

function Dashboard(){
    const { currentUser } = useContext(UserContext);
    const [dayWorkouts, setDayWorkouts] = useState([]);
    
    return(
        <div>
            <h1>Welcome back {currentUser.firstName || currentUser.username}!</h1>

            <div className="card-container">
                <Link to="/track-progress" className="card">
                    <h2>Track Progress</h2>
                    <p>View your progress over time</p>
                </Link>

                <Link to="/create-playlist" className="card">
                    <h2>Create Workout Playlist</h2>
                    <p>Plan your workout splits!</p>
                </Link>
            </div>

            <h2>Today's Workouts</h2>
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