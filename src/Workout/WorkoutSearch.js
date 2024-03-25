import React, { useEffect, useState, useContext } from "react";
import Backend from "../api";
import WorkoutCard from "./WorkoutCard";
import UserContext from "../auth/UserContext";
import AddWorkoutToPlaylist from "./AddWorkoutToPlaylist";
import './styles/WorkoutSearch.css';
import "./styles/WorkoutCard.css";


function WorkoutSearch() {
    const { currentUser } = useContext(UserContext);
    const [bodyPart, setBodyPart] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [selectedEquipment, setSelectedEquipment] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [showAddToPlaylist, setShowAddToPlaylist] = useState(false);
    const [selectedWorkout, setSelectedWorkout] = useState(null);
    const [userPlaylists, setUserPlaylists] = useState([]);

    useEffect(() => {
        const fetchUserPlaylists = async () => {
          try {
            const userId = await Backend.getUserId(currentUser.username);
            const playlists = await Backend.getUserPlaylist(userId);
            setUserPlaylists(playlists);
            } catch (error) {
                console.error("Error fetching user's playlist", error);
            }
        };
        fetchUserPlaylists();
    }, []);

    // const handleAddToPlaylist = (workout) => {
    //     console.log("button clicked");
    //     setSelectedWorkout(workout);
    //     setShowAddToPlaylist(true);
    // };

    const handleSearch = async () => {
        try {
            const exercises = await Backend.getExerciseByBodyPartAndEquipment(bodyPart, selectedEquipment);
            if(exercises.length === 0) {
                setErrorMessage("No workouts found using that equipment");
            } else {
                setErrorMessage("");
            }
            setSearchResults(exercises);
        } catch (error) {
            console.error("Error searching for exercises", error);
            setErrorMessage("Error while searching for exercises");
        }
    };

    return (
        <div className="workout-search-container">
            <h2>
                Workout Search
            </h2>
            <div className="search-form">
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

                {/* Equipment Filter */}
                <select id="equipment" value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
                <option value="">Select Equipment</option>
                <option value="assisted">Assisted</option>
                <option value="band">Band</option>
                <option value="barbell">Barbell</option>
                <option value="body weight">Body Weight</option>
                <option value="bosu ball">Bosu Ball</option>
                <option value="cable">Cable</option>
                <option value="dumbbell">Dumbbell</option>
                <option value="elliptical machine">Elliptical Machine</option>
                <option value="ez barbell">Ez Barbell</option>
                <option value="hammer">Hammer</option>
                <option value="kettlebell">Kettlebell</option>
                <option value="leverage machine">Leverage Machine</option>
                <option value="medicine ball">Medicine Ball</option>
                <option value="resistance band">Resistance Band</option>
                <option value="roller">Roller</option>
                <option value="rope">Rope</option>
                <option value="skierg machine">Skierg Machine</option>
                <option value="sled machine">Sled Machine</option>
                <option value="smith machine">Smith Machine</option>
                <option value="stability ball">Stability Ball</option>
                <option value="tire">Tire</option>
                <option value="weighted">Weighted</option>
                <option value="wheel roller">Wheel Roller</option>
                
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className="search-results">
                <h3>Search Results</h3>
                {errorMessage && <p>{errorMessage}</p>}
                <div className="workout-card-container">
                    {searchResults.map((workout) => (
                        <div className="workout-card-container" key={workout.id}>
                        <WorkoutCard key={workout.id} workout={workout} userPlaylists={userPlaylists} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default WorkoutSearch;