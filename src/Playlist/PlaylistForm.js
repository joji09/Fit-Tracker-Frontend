import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Backend from "../api";
import UserContext from "../auth/UserContext";

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
       try {
        // fetch userID
        console.log({ currentUser });
        console.log(currentUser.username);
        const userId = await Backend.getUserId(currentUser.username);
        console.log(userId);
        
        if(!userId){
            console.error("User ID not found");
            return;
        }

        const playlistData = {
            userId: userId,
            playlistName,
            days: selectedDays
        };
        console.log(playlistData);

        await Backend.createPlaylist(playlistData);

        // Reset Fields
        setPlaylistName("");
        setSelectedDays([]);
        history.push("/playlist");

       } catch (error) {
        console.error("Error creating playlist", error);
       }

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
            <button type="submit" onSubmit={handleSubmit}>Create Playlist</button>
        </form>
    );
}

export default PlaylistForm;