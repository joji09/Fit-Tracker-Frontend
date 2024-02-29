import React, { useState } from "react";
import PlaylistForm from "./PlaylistForm";

function PlaylistPage() {
    const [exercises, setExercises] = useState([]);
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [selectedDays, setSelectedDays] = useState([]);

    const handleAddExercises = (exercises) => {
        setSelectedExercises([...selectedExercises, exercises]);
    };

    const handleCreatePlaylist = ({ playlistName, selectedDays }) => {
        // TODO
    };

    return (
        <div>
            <h1>Manage Your Playlist</h1>
            <PlaylistForm onSubmit={handleCreatePlaylist} />
        </div>
    )
}