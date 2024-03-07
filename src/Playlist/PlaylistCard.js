import React from "react";
import { Link } from "react-router-dom";

function PlaylistCard({ playlist }){
    return(
        <div className="card m-4">
            <div className="card-body">
                <h5 className="card-title">{playlist.playlistname}</h5>
                {playlist.dayofweek ? (
                    <p className="card-text">Days: {playlist.dayofweek}</p>
                ) : (
                    <p className="card-text">No assigned days</p>
                )}
                <Link to={`/playlist/${playlist.playlistid}`} className="btn btn-primary">View Details</Link>
            </div>
        </div>
    );
}

export default PlaylistCard;