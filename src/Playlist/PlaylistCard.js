import React from "react";
import { Link } from "react-router-dom";

function PlaylistCard({ playlist }){
    return(
        <div className="card m-4">
            <div className="card-body">
                <h5 className="card-title">{playlist.name}</h5>
                <p className="card-text">Days: {playlist.days.join(", ")}</p>
                <Link to={`/playlist/${playlist.id}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
}

export default PlaylistCard;