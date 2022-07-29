import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider as AlertProvider, positions, transitions } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import routes from "./router";
import "./App.css";
import ContextProvider from "./store/context";
import ProtectedRoute from "./router/ProtectedRoute"; 

import { createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import WithTracker from './indonesia/components/WithTracker';
// import GeneralModal from './indonesia/components/GeneralModal';

import ReactGA from 'react-ga';


const theme = createMuiTheme({
  palette: {  
    primary: {
      light: '#35699b',
      main: '#034483',
      dark: '#022f5b',
      contrastText: '#fff',
    },
    secondary: {
      light: '#e362a5',
      main: '#DD3B8F',
      dark: '#9a2964',
      contrastText: '#fff',
    },
  },
});

const alertOptions = {
  offset: "25px",
  timeout: 3000,
  transition: transitions.SCALE,
};


function App() {
  ReactGA.initialize('UA-146171471-3', 
    {debug: process.env.REACT_APP_ENV !== "production" ? true : false}
  );

  const renderComponents = routes.map((route, index) => (
    route.isProtected 
    ? <ProtectedRoute 
        path={route.path}
        exact={route.exact}
        component={WithTracker(route.component)}
        key={index}
      />
    : <Route
        path={route.path}
        exact={route.exact}
        component={WithTracker(route.component)}
        key={index}
      />
  ));

  return (
    <div className="App">
      <ContextProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AlertProvider
            template={AlertTemplate}
            position={positions.TOP_RIGHT}
            {...alertOptions}
          >
            <Router basename={process.env.PUBLIC_URL || ''}>
              <Switch>{renderComponents}</Switch>
              {/* <GeneralModal data={{title, content, open}}/> */}
            </Router>
          </AlertProvider>
        </ThemeProvider>
      </ContextProvider>
    </div>
  );
}

export default App;
