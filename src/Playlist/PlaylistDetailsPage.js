import React, { userState, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Backend from "../api";
import PlaylistDetails from "./PlaylistDetails";

function PlaylistDetailsPage(){
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [playlistWorkouts, setPlaylistWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { playlistId } = useParams();


    useEffect(() => {
        const fetchPlaylistData = async () => {
            try {
                console.log(`requesting playlistDetails Data for: ${playlistId}`);
                const playlistData = await Backend.getPlaylistDetails(playlistId);
                console.log(playlistData);
                setPlaylistDetails(playlistData);
                console.log(`requesting playlistWorkoutData for: ${playlistId}`);
                const playlistWorkoutsData = await Backend.getPlaylistWorkouts(playlistId)
                console.log(playlistWorkoutsData);
                setPlaylistWorkouts(playlistWorkoutsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching playlist details", error);
                setLoading(false);
            }
        };
        fetchPlaylistData();
    }, [playlistId]);

    if(loading){
        return <p>Loading playlist details...</p>
    }

    if(!playlistDetails) {
        return <p>Error: Playlist details not found.</p>
    }

    return (
        <div>
            {/* <h2>{playlistDetails.playlistname}</h2> */}
            <PlaylistDetails playlistDetails={playlistDetails} />
            <h5>Playlist: {playlistDetails.playlistname}</h5>
            <p>Days: {playlistDetails.dayofweek}</p>
            <h3>Workouts</h3>
            <ul>
                {playlistWorkouts.map(workout => (
                    <li key={workout.playlistWorkoutId}>
                        {workout.workout_name} - {workout.bodypart}
                        <button>Delete</button>
                        <input type="number" placeholder="Sets" />
                        <input type="number" placeholder="Reps" />
                        <input type="number" placeholder="Weight" />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlaylistDetailsPage;