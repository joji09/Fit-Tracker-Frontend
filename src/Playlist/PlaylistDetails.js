import React, { useState, useEffect } from "react";
import Backend from "../api";

function PlaylistDetails({ playlistId }) {
    const [playlistDetails, setPlaylistDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaylistDetails = async () => {
            try {
                const playlistData = await Backend.getPlaylistDetails(playlistId);
                console.log(`Playlist data: ${playlistData}`);
                setPlaylistDetails(playlistData);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching playlist details", error);
                setLoading(false);
            }
        };
        fetchPlaylistDetails();
    }, [playlistId]);

    if(loading) {
        return <p>Loading playlist details...</p>;
    }
    if(!playlistDetails) {
        return <p>Error: Playlist details not found</p>;
    }

    return (
        <div>
            <h2>{playlistDetails.playlistname}</h2>
            <p>Days: {playlistDetails.dayofweek}</p>
        </div>
    );
}

export default PlaylistDetails;