import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlaylistForm from "./PlaylistForm";
import ExercisesSelection from "./ExercisesSelection";
import DaySelection from "./DaySelection";
import PlaylistList from "./PlaylistList";
import Backend from "../api";

function PlaylistPage() {
    // Brings together all playlist components and handles submission and state.
    
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [playlists, setPlaylists] = useState([
        {id: 1, name: "Playlist 1", days: ["Monday", "Wednesday", "Friday"] },
        {id: 2, name: "Playlist 2", days: ["Tuesday", "Thursday", "Saturday"] }
    ]);

    const handleAddExercises = (exercises) => {
        setSelectedExercises([...selectedExercises, exercises]);
    };

    return (
        <div className=" container text-center">
            <h1>Manage Your Playlist</h1>

            <div className="card-deck">
                <div className="card text-center m-3">
                    <Link to="/create-playlist" className="card text-center">
                        <h2>Create Playlist</h2>
                        <p>Plan your workouts splits!</p>
                    </Link>
                </div>

                <div>
                    <PlaylistList playlists={playlists} />
                </div>
            </div>
        </div>
    );
}

export default PlaylistPage;