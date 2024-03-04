import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import PlaylistCard from "./PlaylistCard";
import Backend from "../api";
import UserContext from "../auth/UserContext";

function PlaylistList({ playlists }){
    // const [userPlaylists, setUserPlaylists] = useState([]);
    const { currentUser } = useContext(UserContext);
    const [playlist, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserPlaylists = async () => {
            try {
                if(currentUser){
                    const userPlaylists = await Backend.getUserPlaylist(currentUser.userId);
                    setPlaylists(userPlaylists);
                }
            } catch (error) {
                console.error("Error fetching user's playlist", error);
                setLoading(false);
            }
        };
        fetchUserPlaylists();
    }, [currentUser]);

    return (
        <div className="container">
            <h2 className="text-center">Your Playlist</h2>
            <div className="row">
                {loading ? (
                    <p>Loading...</p>
                ) : playlist.length === 0 ? (
                    <p>No playlist created</p>
                ) : (
                    playlist.map((playlists) => (
                        <div key={playlists.id}>
                            <h2>{playlists.name}</h2>
                            <p>Assigned days: {playlists.days.join(", ")}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PlaylistList;