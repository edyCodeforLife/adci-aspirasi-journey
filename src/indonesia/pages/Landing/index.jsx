import React, { useContext, useEffect } from "react";
import Template from "../../components/Template";
import { withRouter, useLocation } from "react-router-dom";
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import {StoreContext} from '../../../store/context';
import GeneralModal from '../../components/GeneralModal';
import landingLogo from '../../../assets/images/landing-logo.png';
import { generateRandomID } from '../../../utils'

import '../../sass/landing.scss';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Landing(props) {
  const {state, actions} = useContext(StoreContext);
  const { setGeneralData, resetGeneralData, getVerifyToken, setReferenceImage, setEncodeBK} = actions.generalActions;
  const { resetFinancialData } = actions.financialActions;
  const { resetBusinessData } = actions.businessActions;
  const { resetPersonalData } = actions.personalActions;
  const code = useQuery().get("code");
  const reference = useQuery().get("ref");
  const amountInput = useQuery().get("amount");
  const callbackUri = useQuery().get("callback");
  const { dialogTitle, dialogContent} = state.generalStates.dialog

  useEffect(() => {
    resetGeneralData();
    resetFinancialData();
    resetBusinessData();
    resetPersonalData();

    if (!code) {
      sessionStorage.clear();
      alert("Invalid Url")
      return
    }
    
    const transID = generateRandomID();
    sessionStorage.setItem("code", code);
    localStorage.setItem('referenced', reference==null || reference==undefined?"":reference);
    localStorage.setItem('amount', amountInput);
    localStorage.setItem('callback', callbackUri)
    setReferenceImage(reference);
    setEncodeBK(callbackUri);
    setGeneralData({ code, transID });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
    
  const handleVerifyToken = ()=>{
    getVerifyToken({ code }, props.history);
  }
  return (
    <Template>
      <div className="container">
        <div className="page-landing3">  
          <img className="page-logo" src={landingLogo} alt="logo" />
          <h1 className="title">Selamat Datang di Modal Boost</h1>
          <h2 className="sub-title">Ajukan permohonan untuk top-up Modal Boost</h2>
          <div className="point-outer">
            <div className="point-container">
              <div className="point-holder">
                <img className="indicator" alt="point"/>
                <p>Proses mendapatkan saldo cepat dan mudah</p>
              </div>
              <div className="point-holder">
                <img className="indicator" alt="point"/>
                <p>Pembayaran sesuai dengan jangka waktu yang dipilih</p>
              </div>
              <div className="point-holder">
                <img className="indicator" alt="point"/>
                <p>Biaya pengolahan rendah</p>
              </div>
            </div>
          </div>
          <div>
            <Button color="primary" disabled={!code} variant="contained" className={classNames("next", "redStyle")}  onClick={handleVerifyToken}>
              Ajukan permohonan untuk Modal
            </Button>
          </div>
        </div>
      </div>
      <GeneralModal data={{ dialogTitle, dialogContent}} />
    </Template>
  );
}

export default withRouter(Landing);
