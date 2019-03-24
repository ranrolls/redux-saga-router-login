import React from 'react'
import { Route, Redirect } from "react-router-dom";
const PrivateRoute = ({ component: Component, ...rest }) => {
    let isAuth = false;
    return (
        <Route {...rest} render={(props) => (
            isAuth === true
                ? <Component {...props} />
                : <Redirect to={{
                    pathname: '/index/login',
                    state: { from: props.location }
                }} />
        )} />
    )
}
export default PrivateRoute;