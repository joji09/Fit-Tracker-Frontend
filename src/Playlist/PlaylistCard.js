import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlaylistDetails from "./PlaylistDetails";
import "./styles/PlaylistCard.css";

function PlaylistCard({ playlist }){
    const [showDetails, setShowDetails] = useState(false);
    
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
            </div>
        </div>
    );
}

export default PlaylistCard;