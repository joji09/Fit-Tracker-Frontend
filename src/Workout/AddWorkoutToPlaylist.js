import React, { useState } from "react";
import Backend from "../api";

function AddWorkoutToPlaylist({ show, onHide, workout, userPlaylists }) {
    const [selectedPlaylist, setSelectedPlaylist] = useState("");

    const handleConfirmAddToPlaylist = async () => {
        try {
            await Backend.addExerciseToPlaylist(selectedPlaylist, workout.id);
            // TODO: Add message or update UI
            onHide();
        } catch (error) {
            console.error("Error adding workout to playlist", error);
            // TODO: add error message
        }
    };

    return (
        show && (
            <div className="model">
                <div className="model-content">
                <h3>Add To Playlist</h3>
                <label htmlFor="playlist">Select Playlist:</label>
                <select id="playlist" values={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                    <option value="">Select Playlist</option>
                    {userPlaylists.map((playlist) => (
                        <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleConfirmAddToPlaylist}>Add</button>
                <button onClick={onHide}>Cancel</button>
                </div>
            </div>
        )
    );
}

export default AddWorkoutToPlaylist;