import React, { useState } from "react";
import "./WorkoutCard.css";
import AddWorkoutToPlaylist from "./AddWorkoutToPlaylist";

function WorkoutCard({ workout }){
    const [showModel, setShowModel] = useState(false);

    const handleAddToPlaylist = () => {
        setShowModel(true);
    }

    return (
        <div className="card">
            <img src={workout.gifUrl} className="card-img-top" alt="{workout.name}" />
            <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">Body Part: {workout.bodyPart}</p>
                <p className="card-text">Equipment: {workout.equipment}</p>
                <button onClick={handleAddToPlaylist}>Add To Playlist</button>
                {showModel && (
                    <AddWorkoutToPlaylist show={showModel} onHide={() => setShowModel(false)} workout={workout} />
                )}
            </div>
        </div>
    );
}

export default WorkoutCard;