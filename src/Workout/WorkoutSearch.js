import React, { useState } from "react";
import Backend from "../api";
import WorkoutCard from "./WorkoutCard";

function WorkoutSearch() {
    const [bodyPart, setBodyPart] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        try {
            const exercises = await Backend.getExerciseByBodyPart(bodyPart);
            setSearchResults(exercises);
        } catch (error) {
            console.error("Error searching for exercises", error);
        }
    };

    return (
        <div>
            <h2>
                Workout Search
            </h2>
            <div>
                <label htmlFor="bodyPart">Select Body Part</label>
                <select id="bodyPart" value={bodyPart} onChange={(e) => setBodyPart(e.target.value)}>

                    <option value="">Select Body Part</option>
                    <option value="back">Back</option>
                    <option value="cardio">Cardio</option>
                    <option value="chest">Chest</option>
                    <option value="lower arms">Lower Arms</option>
                    <option value="lower legs">Lower Legs</option>
                    <option value="neck">Neck</option>
                    <option value="shoulders">Shoulders</option>
                    <option value="upper arms">Upper Arms</option>
                    <option value="upper legs">Upper Legs</option>
                    <option value="waist">Waist</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div>
                <h3>Search Results</h3>
                <div className="card-deck">
                    {searchResults.map((workout) => (
                        <WorkoutCard key={workout.id} workout={workout} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkoutSearch;