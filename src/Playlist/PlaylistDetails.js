import React, { useEffect, useState } from "react";
import Backend from "../api";

function PlaylistDetails( {playlistId }) {
    const [playlist, setPlaylist] = useState(null);
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                // fetch playlist details
    
                // fetch workouts in the playlist
            } catch (error) {
                console.error("Error fetching playlist", error);
                setLoading(false);
            }
        };
        fetchPlaylistDetails();
    }, [playlistId]);

    const handleInputChange = (event, workoutId) => {
        // handle input change
    };

    const handleSave = async (workoutId) => {
        // handle save button and post request
    }

    if (loading) {
        return <p>Loading...</p>
    }

    if(!playlist){
        return <p>Playlist not found</p>
    }

    return (
        <div className="container">
            <div className="d-flex justify-content-between align-items0center mb-3">
            <h2>{playlist.playlistname}</h2>
            <Link to="/" className="bt btn-primary">Add Exercerses</Link>
            </div>
            <div className="row">
            {workouts.map((workout) => (
                <div key={workout.workoutid} className="col-md-6">
                    <h4>{workout.workoutname}</h4>
                    <p>Sets: <input type="number" onChange={(event) => handleInputChange(event, workout.workoutid)} /></p>
                    <p>Sets: <input type="number" onChange={(event) => handleInputChange(event, workout.workoutid)} /></p>
                    <p>Sets: <input type="number" onChange={(event) => handleInputChange(event, workout.workoutid)} /></p>
                    <button className="btn btn-primary" onClick={() => handleSave(workout.workoutid)}>Save</button>
                    </div>
            ))}
            </div>
        </div>
    );
}

export default PlaylistDetails;