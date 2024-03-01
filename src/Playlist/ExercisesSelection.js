import React from "react";

function ExercisesSelection({ exercises, onAddExercises }) {
    // Displays available exercises and allows users to add exercises to their playlist.

    return (
        <div>
            <h2>Available Exercises</h2>
            <ul>
                {exercises.map((exercise) => (
                    <li key={exercise.id}>
                        {exercise.name} - {exercise.bodyPart}
                        <button onClick={() => onAddExercises(exercise)}>Add</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ExercisesSelection;