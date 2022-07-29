import React, {useContext} from "react";
import {StoreContext} from '../../store/context';
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { aspirasiFlags } from '../../helpers/common';
import '../sass/header.scss';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Header = () => {
  // const language = "en";
  const query = useQuery();
  let code = sessionStorage.getItem("code") ? sessionStorage.getItem("code") : query.get("code");
  const {state} = useContext(StoreContext);
  const {reference} = state.generalStates;

  var toPath = "";
  if(reference==null || reference==undefined)
  {
    toPath = `/?code=${code}`
  }else{
    toPath = `/?ref=${reference}&code=${code}`
  }

  return (
    <header>
      <div className="container">
        <div className='header3'>
          <div className="question-holder">
          <Link to={toPath} >
              <img className="float-left" alt="logo" height="42" src={aspirasiFlags.aspirasiLogo}></img>
              </Link>
          </div>
          <div className="logo-holder">
          </div>
          <div className="language-holder">
          {
                reference=="bk"?
                <img className="float-left" alt="logo" height="60" src={aspirasiFlags.boostKedaiLogo}></img>:null
              }
            {/* <div className="language">
              <label className={classNames({"selected": language === "en"})} id="en" onClick={onLanguageChange}>EN</label>
              <label className={classNames({"selected": language === "bm"})} id="bm" onClick={onLanguageChange}>BM</label>
            </div> */}
          </div> 
        </div>
      </div>
    </header>
  );
};

// function onLanguageChange(e) {
//   e.persist();
// };

export default Header;
