import React from 'react';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
// import aspirasiLogoBlue from '../../assets/images/aspirasi-logo-blue.png';
import { aspirasiFlags } from '../../helpers/common';
import '../sass/header.scss';

const CustomHeader = () => {
  // const language = "en";
  return (
      <div style={
          {
              paddingLeft: "0px",
              paddingRight: "0px",
              marginBottom: "8px",
              overflowY: "hidden",
              borderBottom: "1px solid #C4C4C4",
              backgroundColor: "white"
          }
      } className="container">
        <div className='header3'>
          <div className="question-holder">
          </div>
          <div className="logo-holder">
              <img className="float-left" alt="logo" height="60" src={aspirasiFlags.aspirasiLogo}></img>
              <img className="float-left" alt="logo" height="60" src={aspirasiFlags.boostKedaiLogo}></img>
          </div>
          <div className="language-holder">
            {/* <div className="language">
              <label className={classNames({"selected": language === "en"})} id="en" onClick={onLanguageChange}>EN</label>
              <label className={classNames({"selected": language === "bm"})} id="bm" onClick={onLanguageChange}>BM</label>
            </div> */}
          </div> 
        </div>
      </div>
  );
};

// function onLanguageChange(e) {
//   e.persist();
// };

export default CustomHeader;
