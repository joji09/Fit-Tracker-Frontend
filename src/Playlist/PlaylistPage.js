import React, { useState } from "react";
import PlaylistForm from "./PlaylistForm";
import ExercisesSelection from "./ExercisesSelection";
import DaySelection from "./DaySelection";
import Backend from "../api";

function PlaylistPage() {
    // Brings together all playlist components and handles submission and state.
    
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);
    const [playlistName, setPlaylistName] = useState("");

    const handleAddExercises = (exercises) => {
        setSelectedExercises([...selectedExercises, exercises]);
    };

    const handleCreatePlaylist = async () => {
        // Create the playlist on the backend
        try {
            const playlistData = {
                userId: "userId",
                playlistName: playlistName,
                exercises: selectedExercises,
                days: selectedDays
            };
            await Backend.createPlaylist(playlistData);

            // Resets state after successful creation
            setSelectedExercises([]);
            setSelectedDays([]);
            setPlaylistName("");
        } catch (error) {
            console.error("Error creating playing", error);
        }
    }

    return (
        <div>
            <h1>Manage Your Playlist</h1>
            <PlaylistForm playlistName={playlistName} onSubmit={handleCreatePlaylist} onNameChange={setPlaylistName} />
            <ExercisesSelection exercises={exercises} onAddExercises={handleAddExercises} />
            <DaySelection selectedDays={selectedDays} />
        </div>
    );
}

export default PlaylistPage;