import React, { userState, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import Backend from "../api";
import PlaylistDetails from "./PlaylistDetails";
import WorkoutSearch from "../Workout/WorkoutSearch";
import "./styles/PlaylistDetailsPage.css";

function PlaylistDetailsPage(){
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [playlistWorkouts, setPlaylistWorkouts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [changes, setChanges] = useState(false);
    const [userPlaylists, setUserPlaylists] = useState([]);
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

        await Backend.removeWorkoutFromPlaylist(playlistDetails.playlistid, workout.playlistworkoutid);
        console.log("Workout removed!");
        setPlaylistWorkouts(prevWorkouts => prevWorkouts.filter(w => w.playlistworkoutid !== workout.playlistworkoutid));
        console.log("Updated playlistWorkouts:", playlistWorkouts);
      } catch (error) {
        console.error("Error removing workout from playlist", error);
      }
    }

    const handleInputChange = (index, field, value) => {
      const updatedWorkouts = [...playlistWorkouts];
      updatedWorkouts[index][field] = value;
      setPlaylistWorkouts(updatedWorkouts);
      setChanges(true);
    }

    // const handleSave = async (playlistDetails, workout, sets, reps, weight) => {
    //   try {
    //     console.log(workout.playlistworkoutid);
    //     await Backend.UpdateWorkoutVal(playlistDetails.playlistid, workout.playlistworkoutid, sets, reps, weight);
    //     setChanges(false);
    //   } catch (error) {
    //     console.error("Error saving changes", error);
    //   }
    // }

    const handleSave = async () => {
      try {
        console.log(playlistWorkouts);
          await Promise.all(playlistWorkouts.map(workout =>
              Backend.UpdateWorkoutVal(playlistId, workout.playlistworkoutid, workout.sets, workout.reps, workout.weight)
          ));
          setChanges(false); // Reset changes made flag after saving
          console.log("Workout values saved successfully");
      } catch (error) {
          console.error("Error saving workout values", error);
      }
  }

//   const handleDelete = async (deletedPlaylistId) => {
//     try {
//         await Backend.removePlaylist(deletedPlaylistId);
//         const updatedPlaylists = playlist.filter(playlist => playlist.playlistid !== deletedPlaylistId);
//         setPlaylists(updatedPlaylists);
//     } catch (error) {
//         console.error("Error deleting playlist", error);
//     }
// };

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
      <table className="playlist-table">
        <thead>
          <tr>
            <th>Workout Name</th>
            <th>Sets</th>
            <th>Reps</th>
            <th>Weight</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {playlistWorkouts.map((workout, index) => (
            <tr key={workout.playlistWorkoutId} className="workout-item">
              <td>{workout.workout_name}</td>
              <td><input type="number" placeholder="0" value={workout.sets || ""} onChange={(e) => handleInputChange(index, "sets", e.target.value)}/></td>
              <td><input type="number" placeholder="0" value={workout.reps || ""} onChange={(e) => handleInputChange(index, "reps", e.target.value)}/></td>
              <td>
                <div className="weight-input-container">
                <input type="number" placeholder="0" value={workout.weight || ""} onChange={(e) => handleInputChange(index, "weight", e.target.value)}/>
                <span className="unit">lbs</span>
                </div>
                </td>
              <td>
                <button onClick={() => removeWorkout(playlistDetails, workout)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {changes && <button onClick={handleSave}>Save</button>}

      <div className="workoutsearch-container">
        <h2>Add Workouts!</h2>
      <WorkoutSearch userPlaylists={userPlaylists}/>
      </div>
    </div>
  );
}

export default PlaylistDetailsPage;