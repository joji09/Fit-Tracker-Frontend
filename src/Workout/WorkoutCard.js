import React, { useState } from "react";
import "./styles/WorkoutCard.css";
import AddWorkoutToPlaylist from "./AddWorkoutToPlaylist";
import WorkoutDetailsCard from "./WorkoutDetailsCard";


function WorkoutCard({ workout, userPlaylists }){
    const [showDetailsModel, setshowDetailsModel] = useState(false);
    const [showAddToPlaylist, setshowAddToPlaylist] = useState(false);

    

    const handleShowDetails = (e) => {
        e.preventDefault();
        console.log(workout.id);
        setshowDetailsModel(true);
    };

    const handleShowAddToPlaylist = () => {
        setshowAddToPlaylist(true);
    };

    const handleCloseModal = () => {
        setshowDetailsModel(false);
        setshowAddToPlaylist(false);
    }

    return (
        <div className="workout-card-container">
        <div className="workout-card">
            <div onClick={handleShowDetails} style={{ cursor: "pointer" }}>
            <img src={workout.gifUrl} className="card-img-top" alt="{workout.name}" />
            <h5 className="card-title">{workout.name}</h5>
            </div>
            <div className="card-body" >
                <p className="card-text">Body Part: {workout.bodyPart}</p>
                <p className="card-text">Equipment: {workout.equipment}</p>
                <button onClick={handleShowAddToPlaylist}>Add To Playlist</button>
                {showAddToPlaylist && (
                    <AddWorkoutToPlaylist userPlaylists={userPlaylists} show={showAddToPlaylist} onHide={handleCloseModal} workout={workout} />
                )}

                {showDetailsModel && (
                    <WorkoutDetailsCard exerciseId={workout.id} workoutName={workout.name} show={showDetailsModel} onHide={handleCloseModal} />
                )}
            </div>
        </div>
    </div>
    );
}

export default WorkoutCard;