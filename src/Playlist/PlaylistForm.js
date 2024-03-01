import React, { useState } from "react";
import Backend from "../api";

function PlaylistForm({ onSubmit }){
    // Allows users to enter a playlist name and select days for workouts

    const [playlistName, setPlaylistName] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);

    const handleToggle = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ playlistName, selectedDays });
        console.log("submit button clicked");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Playlist Name:
                <input type="text" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
            </label>

            <div>
                <p>Select Days:</p>
                {[ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                <label key={day}>
                    <input type="checkbox" checked={selectedDays.includes(day)} onChange={() => handleToggle(day)} />
                    {day}
                </label>
                ))}
            </div>
            <button type="submit">Create Playlist</button>
        </form>
    );
}

export default PlaylistForm;