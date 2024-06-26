import React from "react";

function DaySelection({ selectedDays }){
    // Shows the selected days for workouts

    return(
        <div>
            <h2>Selected Days</h2>
            <ul>
                {selectedDays.map((day) => (
                    <li key={day}>{day}</li>
                ))}
            </ul>
        </div>
    );
}

export default DaySelection;