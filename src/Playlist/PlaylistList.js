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
                    console.log(currentUser.username);
                    const userId = await Backend.getUserId(currentUser.username);
                    const userPlaylists = await Backend.getUserPlaylist(userId);
                    setPlaylists(userPlaylists);
                    setLoading(false); 
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
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {loading ? (
                    <p>Loading...</p>
                ) : playlist.length === 0 ? (
                    <p>No playlists created</p>
                ) : (
                    playlist.map((playlist) => (
                        <div className="col" key={playlist.playlistid}>
                        <PlaylistCard key={playlist.playlistid} playlist={playlist} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PlaylistList;