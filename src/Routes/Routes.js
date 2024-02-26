import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SingupForm from "../auth/SignUpForm";

function Routes({ login, signup }){

    return(
        <div>
            <Switch>
                <Route exact path="/"><Homepage /></Route>
                <Route exact path="/login"><LoginForm login={login} /></Route>
                <Route exact path="/signup"><SingupForm signup={signup} /></Route>

                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;