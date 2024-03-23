import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Backend from "../api";

function WorkoutDetails({ workoutId, onClose }){
    const [workout, setWorkout] = useState(null);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        const fetchWorkoutDetails = async () => {
            try {
                const response = await Backend.getExerciseById(workoutId);
                setWorkout(response);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching workout", error);
            }
        };
        fetchWorkoutDetails();
    }, [workoutId]);

   return (
    <Modal show={true} onHide={onClose}>
        <Modal.Header closeButton>
            <Modal.Title>Workout Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {loading ? (
                <p>Loading...</p>
            ): (
                <div>
                    <h4>{workout.name}</h4>
                    <img src={workout.gifUrl} alt={workout.name} />
                    <p>Body Part: {workout.bodyPart}</p>
                    <p>Equipment: {workout.equipment}</p>
                    <p>Instructions: {workout.instructions}</p>
                </div>
            )}
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={onClose}>Close</Button>
        </Modal.Footer>
    </Modal>
   );
}

export default WorkoutDetails;