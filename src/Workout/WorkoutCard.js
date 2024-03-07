import React from "react";

function WorkoutCard({ workout }){
    return (
        <div className="card">
            <img src={workout.gifUrl} className="card-img-top" alt="{workout.name}" />
            <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">Body Part: {workout.bodyPart}</p>
            </div>
        </div>
    );
}

export default WorkoutCard;