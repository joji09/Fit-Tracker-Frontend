import React, { userState, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Backend from "../api";
import PlaylistDetails from "./PlaylistDetails";
import "./styles/PlaylistDetailsPage.css";

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
                console.log(`PlaylistWorkoutData: ${playlistWorkoutsData[0].playlistworkoutid}`);
                setPlaylistWorkouts(playlistWorkoutsData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching playlist details", error);
                setLoading(false);
            }
        };
        fetchPlaylistData();
    }, [playlistId]);

    const removeWorkout = async (playlistDetails, workout) => {
      try {
        console.log("Removing workout:", workout);
        //playlistid
        // console.log(playlistDetails.playlistid);
        // playlistworkoutid
        // console.log(workout.playlistworkoutid);
        // console.log(playlistWorkoutsData[0].playlistworkoutid);
        await Backend.removeWorkoutFromPlaylist(playlistDetails.playlistid, workout.playlistworkoutid);
        setPlaylistWorkouts(prevWorkouts => prevWorkouts.filter(w => w.workoutId !== workout.playlistworkoutid));
        console.log("Updated playlistWorkouts", playlistWorkouts);
      } catch (error) {
        console.error("Error removing workout from playlist", error);
      }
    }

    if(loading){
        return <p>Loading playlist details...</p>
    }

    // if(!playlistDetails) {
    //     return <p>Error: Playlist details not found.</p>
    // }

    return (
        <div className="playlist-details-container">
      <h5 className="playlist-name">Playlist: {playlistDetails.playlistname}</h5>
      <p className="days-info">Days: {playlistDetails.dayofweek}</p>
      <h3 className="workouts-heading">Workouts</h3>
      <ul className="workouts-list">
        {playlistWorkouts.map(workout => (
          <li key={workout.playlistWorkoutId} className="workout-item">
            <div className="workout-info">
              <span className="workout-name">{workout.workout_name}</span>
              <div className="workout-controls">
                <button onClick={() =>removeWorkout(playlistDetails, workout)}>Remove</button>
                <input type="number" placeholder="Sets" />
                <input type="number" placeholder="Reps" />
                <input type="number" placeholder="Weight" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistDetailsPage;