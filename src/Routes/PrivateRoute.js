import React, { useContext } from "react";
import UserContext from "../auth/UserContext";
import { Route, Redirect } from "react-router-dom/cjs/react-router-dom.min";

function PrivateRoute({ exact, path, children }){
    const { currentUser } = useContext(UserContext);

    if(!currentUser){
        return <Redirect to="/login" />;
    }
    return(
        <Route exact={exact} path={path}>
            {children}
        </Route>
    );

}

export default PrivateRoute;