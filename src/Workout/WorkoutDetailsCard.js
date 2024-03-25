import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import Backend from "../api";

const WorkoutDetailsCard = ({ exerciseId, workoutName, onHide, show }) => {
    const [workoutDetails, setWorkoutDetails] = useState(null);
    const [showModal, setShowModal] = useState(false);

    // fetch workout details from backend
    const fetchWorkoutDetails = async () => {
        try {
            const details = await Backend.getExerciseById(exerciseId);
            setWorkoutDetails(details);
        } catch (error) {
            console.error('Error fetching workout details', error);
        }
    };

    // fetch workout details whe component is called
    useEffect(() => {
        fetchWorkoutDetails();
    }, []);

    // TODO: add workout to user's playlist

    return (
        <>
      {/* Button to open modal */}
      <span onClick={() => setShowModal(true)}>
        {workoutName}
      </span>

      {/* Modal to display workout details */}
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>{workoutName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {workoutDetails && (
            <div>
                <div>
                <img src={workoutDetails.exerciseIdx.gifUrl} className="card-img-top" alt="{workout.name}" />
                </div>
              <p>Exercise Name: {workoutDetails.exerciseIdx.name}</p>
              <p>Body Part: {workoutDetails.exerciseIdx.bodyPart}</p>
              <p>Equipment: {workoutDetails.exerciseIdx.equipment}</p>
              <p><strong>Instructions:</strong> </p>
              <ol>
              {workoutDetails.exerciseIdx.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
              </ol>
              {/* Add more details as needed */}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {/* Button to add workout to playlist */}
          {/* <Button variant="primary" onClick={addToPlaylist}>
            Add to Playlist
          </Button> */}
        </Modal.Footer>
      </Modal>
    </>
    );
}

export default WorkoutDetailsCard;