import React, { useState, useContext } from "react";
import { Modal } from "react-bootstrap";
import UserContext from "../auth/UserContext";
import Backend from "../api";
import "./styles/Modal.css";

function AddWorkoutToPlaylist({ show, onHide, workout, userPlaylists }) {
    const [selectedPlaylist, setSelectedPlaylist] = useState("");
    const { currentUser } = useContext(UserContext);

    const handleConfirmAddToPlaylist = async () => {
        try {
            const workoutId = workout.id
            const workoutName = workout.name;
            const workoutBodyPart = workout.bodyPart;
            console.log(userPlaylists);
            const userId = await Backend.getUserId(currentUser.username);

            // check if playlist is selected
            if(!selectedPlaylist){
                console.error("No playlist selected");
            }

            const selectedPlaylistObject = userPlaylists.find(playlist => playlist.playlistid = selectedPlaylist);

            const playlistId = selectedPlaylist;
            console.log(playlistId);
            const playlistName = selectedPlaylistObject.playlistname;
            console.log(playlistName);

            console.log(selectedPlaylist);
            // TODO: get PlaylistName to pass to API
            await Backend.addExerciseToPlaylist(userId, workoutId, workoutName, workoutBodyPart, playlistId, playlistName);
            console.log(`Workout: ${workoutId}, ${workoutName} has been added`);
            // TODO: Add message or update UI
            onHide();
        } catch (error) {
            console.error("Error adding workout to playlist", error);
            // TODO: add error message
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
            <Modal.Title>Add To Playlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <label htmlFor="playlist">Select Playlist:</label>
            <select id="playlist" value={selectedPlaylist} onChange={(e) => setSelectedPlaylist(e.target.value)}>
                <option value="">Select Playlist</option>
                {userPlaylists.map((playlist) => (
                    <option key={playlist.playlistid} value={playlist.playlistid}>
                        {playlist.playlistname}
                    </option>
                ))}
            </select>
        </Modal.Body>
        <Modal.Footer>
            <button variant="primary" onClick={handleConfirmAddToPlaylist}>Add</button>
            <button variant="secondary" onClick={onHide}>Cancel</button>
        </Modal.Footer>
    </Modal>
    );
}

export default AddWorkoutToPlaylist;