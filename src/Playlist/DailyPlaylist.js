import React, { useState, useEffect, useContext } from "react";
import PlaylistCard from "./PlaylistCard";
import UserContext from "../auth/UserContext";
import Backend from "../api";

function DailyPlaylist() {
    const [dailyPlaylist, setDailyPlaylist] = useState(null);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        const fetchDayPlaylist = async () => {
            try {
                // get current date
                const currentDate = new Date();
                const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                const currentDayOfWeek = daysOfWeek[currentDate.getDay()];


                // fetch user's playlist
                const userId = await Backend.getUserId(currentUser.username);
                const playlists = await Backend.getUserPlaylist(userId);

                // find playlist for current day
                
                const dayPlaylist = playlists.find(
                    (playlist) => playlist.dayofweek === currentDayOfWeek
                );
                
                setDailyPlaylist(dayPlaylist);
            } catch (error) {
                console.error("Error fetching daily playlist", error);
            }
        };
        fetchDayPlaylist();
    }, [currentUser]);

    return (
        <div>
            {dailyPlaylist ? (
                <PlaylistCard playlist={dailyPlaylist} />
            ) : (
                <p>No Playlist assigned for today</p>
            )}
        </div>
    );
}

export default DailyPlaylist;