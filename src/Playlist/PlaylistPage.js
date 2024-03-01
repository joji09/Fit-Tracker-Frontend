import React, { useState } from "react";
import PlaylistForm from "./PlaylistForm";
import ExercisesSelection from "./ExercisesSelection";
import DaySelection from "./DaySelection";

function PlaylistPage() {
    // Brings together all playlist components and handles submission and state.
    
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleAddExercises = (exercises) => {
        setSelectedExercises([...selectedExercises, exercises]);
    };

    const handleCreatePlaylist = ({ playlistName, selectedDays }) => {
        // TODO: logic for this function
    };

    return (
        <div>
            <h1>Manage Your Playlist</h1>
            <PlaylistForm onSubmit={handleCreatePlaylist} />
            <ExercisesSelection exercises={exercises} onAddExercises={handleAddExercises} />
            <DaySelection selectedDays={selectedDays} />
        </div>
    );
}

export default PlaylistPage;