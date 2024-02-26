import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import LoginForm from "../auth/LoginForm";
import SingupForm from "../auth/SingUpForm";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Routes({ login, singup }){

    return(
        <div>
            <Switch>
                <Route exact path="/"><Homepage /></Route>
                <Route exact path="/login"><LoginForm login={login} /></Route>
                <Route exact path="/singup"><SingupForm singup={singup} /></Route>

                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default Routes;