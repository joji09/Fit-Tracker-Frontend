import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SingupForm from "../auth/SignUpForm";
import PrivateRoute from "./PrivateRoute";
import PlaylistPage from "../Playlist/PlaylistPage";
import Dashboard from "../dashboard/Dashboard";

function Routes({ login, signup }){

    return(
        <div>
            <Switch>
                <Route exact path="/"><Homepage /></Route>
                <Route exact path="/login"><LoginForm login={login} /></Route>
                <Route exact path="/signup"><SingupForm signup={signup} /></Route>
                <PrivateRoute exact path="/dashboard"><Dashboard /></PrivateRoute>
                <PrivateRoute exact path="/create-playlist"><PlaylistPage /></PrivateRoute>

                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;