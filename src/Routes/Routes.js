import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SingupForm from "../auth/SignUpForm";
import PrivateRoute from "./PrivateRoute";
import PlaylistPage from "../Playlist/PlaylistPage";
import Dashboard from "../dashboard/Dashboard";
import PlaylistForm from "../Playlist/PlaylistForm";
import Profile from "../Profile/Profile";
import ProfileForm from "../Profile/ProfileForm";
import WorkoutSearch from "../Workout/WorkoutSearch";
import PlaylistDetailsPage from "../Playlist/PlaylistDetailsPage";

function Routes({ login, signup }){

    return(
        <div>
            <Switch>
                <Route exact path="/"><Homepage /></Route>
                <Route exact path="/login"><LoginForm login={login} /></Route>
                <Route exact path="/signup"><SingupForm signup={signup} /></Route>
                <Route exact path="/workout-search"><WorkoutSearch /></Route>
                <PrivateRoute exact path="/dashboard"><Dashboard /></PrivateRoute>
                <PrivateRoute exact path="/profile"><Profile /></PrivateRoute>
                <PrivateRoute exact path="/profile/edit"><ProfileForm /></PrivateRoute>
                <PrivateRoute exact path="/playlists"><PlaylistPage /></PrivateRoute>
                <PrivateRoute exact path="/create-playlist"><PlaylistForm /></PrivateRoute>
                <PrivateRoute exact path="/playlist/:playlistId"><PlaylistDetailsPage /></PrivateRoute>
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;