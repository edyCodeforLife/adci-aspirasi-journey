
import React from "react";
import auth from "../utils/auth";
import { Route, Redirect } from "react-router-dom";

// const ProtectedRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={props => (
//     auth.authenticate() 
//       ? <Component {...props} />
//       : <Redirect to={{ pathname: '/', state: { from: props.location } }} />
//   )} />
// )

// export default ProtectedRoute;

function ProtectedRoute({ component: Component, ...rest }) {
  return (
    <Route {...rest} render={props =>
        auth.authenticate() 
        ? (<Component {...props} />) 
        : (<Redirect to={{ pathname: '/', state: { from: props.location }}} />)
      }
    />
  );
}

export default ProtectedRoute;
