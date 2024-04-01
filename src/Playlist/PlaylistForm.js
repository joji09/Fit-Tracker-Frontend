import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Backend from "../api";
import UserContext from "../auth/UserContext";
import "./styles/PlaylistForm.css";

function PlaylistForm({ onSubmit }){
    // Allows users to enter a playlist name and select days for workouts

    const [playlistName, setPlaylistName] = useState("");
    const [selectedDays, setSelectedDays] = useState([]);
    const { currentUser } = useContext(UserContext);

    const history = useHistory();

    const fetchUserId = () => {
        if (currentUser && currentUser.userId) {
            return currentUser.userId;
        }
        return null;
    }

    const handleToggle = (day) => {
        if (selectedDays.includes(day)) {
            setSelectedDays(selectedDays.filter((d) => d !== day));
        } else {
            setSelectedDays([...selectedDays, day]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(!playlistName.trim()) {
            alert("Please provide a playlist name.");
            return;
        }
    
        if(selectedDays.length === 0) {
            alert("Please select at least one day for the playlist.");
            return;
        }

       try {
        // fetch userID
        const userId = await Backend.getUserId(currentUser.username);
        
        if(!userId){
            console.error("User ID not found");
            return;
        }

        const playlistData = {
            userId: userId,
            playlistName,
            days: selectedDays
        };


        await Backend.createPlaylist(playlistData.userId, playlistData.playlistName, playlistData.days);

        // Reset Fields
        setPlaylistName("");
        setSelectedDays([]);
        history.push("/playlists");

       } catch (error) {
        console.error("Error creating playlist", error);
       }

    };

    return (
        <div className="container">
        <div className="row justify-content-center">
            <div className="col-md-6">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
            <label htmlFor="playlistName" className="form-label">
                Playlist Name:
                </label>
                <input type="text" className="form-control" id="playlistName" value={playlistName} onChange={(e) => setPlaylistName(e.target.value)} />
                </div>
                <div className="mb-3">
                <p>Select Days:</p>
                {[ "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                    <div key={day} className="form-check form-check-inline">
                    <input type="checkbox" className="form-check-input" id={day} checked={selectedDays.includes(day)} onChange={() => handleToggle(day)} />
                    <label htmlFor={day} className="form-check-label">{day}</label>
                </div>
                ))}
                </div>
            <button type="submit" className="form-button" onSubmit={handleSubmit}>Create Playlist</button>
        </form>
        </div>
        </div>
        </div>
    );
}

export default PlaylistForm;