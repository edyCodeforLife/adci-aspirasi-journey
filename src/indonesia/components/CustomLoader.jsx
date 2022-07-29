import React from "react";
import '../sass/loader.scss';
import Spinner from 'react-bootstrap/Spinner';
import aspirasiLogo from '../../assets/images/aspirasi-logo.gif';

function PageLoader() {
  return (
    <div className="page-loader-half">
    {/* <div> */}
      <img src={aspirasiLogo} alt="loader"></img>
      <div className="loader-holder">
        <Spinner animation="grow" variant="primary" className="loader"style={{marginRight: "5px"}}/>
        <Spinner animation="grow" variant="primary" className="loader" />
        <Spinner animation="grow" variant="primary" className="loader"style={{marginLeft: "5px"}} />
      </div>

      {/* <div className="spinner-border" role="status">
        <span className="sr-only">Loading...</span>
      </div> */}
    </div>
  );
}

export default PageLoader;
