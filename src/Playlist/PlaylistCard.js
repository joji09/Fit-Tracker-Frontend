import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles/PlaylistCard.css";
import Backend from "../api";

function PlaylistCard({ playlist, onDelete }){
    const [showDetails, setShowDetails] = useState(false);

    const handleDeleteClick = () => {
        onDelete(playlist.playlistid);
    };
    
    const debugButton = () => {
        console.log("Playlist Id:", playlist.playlistid);
    }

    return(
        <div className="playlist-card card m-4">
            <div className="card-body">
                <h5 className="card-title">{playlist.playlistname}</h5>
                {playlist.dayofweek ? (
                    <p className="card-text">Days: {playlist.dayofweek}</p>
                ) : (
                    <p className="card-text">No assigned days</p>
                )}

                <Link to={`/playlist/${playlist.playlistid}`} className="btn btn-primary" onClick={debugButton}>View Details</Link>
                <button className="btn btn-danger" onClick={handleDeleteClick}>Delete Playlist</button>
            </div>
        </div>
    );
}

export default PlaylistCard;