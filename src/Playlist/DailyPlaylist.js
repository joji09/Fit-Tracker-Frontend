import React, { useState, useEffect, useContext } from "react";
import PlaylistCard from "./PlaylistCard";
import UserContext from "../auth/UserContext";
import Backend from "../api";
import "./styles/DailyPlaylist.css";

function DailyPlaylist() {
    const [dailyPlaylists, setDailyPlaylists] = useState([]);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchDayPlaylists = async () => {
            try {
                // get current date
                const currentDate = new Date();
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const currentDayOfWeek = daysOfWeek[currentDate.getDay()];


                // fetch user's playlist
                const userId = await Backend.getUserId(currentUser.username);
                const playlists = await Backend.getUserPlaylist(userId);

                // find playlist for current day
                
                const dayPlaylists = playlists.filter(
                    (playlist) => playlist.dayofweek.includes(currentDayOfWeek)
                );
                
                setDailyPlaylists(dayPlaylists);
            } catch (error) {
                console.error("Error fetching daily playlist", error);
            }
        };
        fetchDayPlaylists();
    }, [currentUser]);

    return (
        <>
        <div className="row row-cols-1 row-cols-md-2 g-4 justify-content-center">
            {dailyPlaylists.length > 0 ? (
                dailyPlaylists.map((playlist, index) => (
                    <div key={index} className="col m-b3">
                    <PlaylistCard playlist={playlist} />
                    </div>
                ))
            ) : (
                <p>No Playlist assigned for today</p>
            )}
            </div>
        </>
    );
}

export default DailyPlaylist;