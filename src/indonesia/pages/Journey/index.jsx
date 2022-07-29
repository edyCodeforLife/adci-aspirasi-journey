import React, {useContext} from "react";
import { withRouter } from "react-router-dom";
import {StoreContext} from '../../../store/context';
import TemplateFullHeight from "../../components/TemplateFullHeight";
import VerifySessionKey from '../../components/VerifySessionKey'
import NavigationBar from "../../components/NavigationBar";
import Financial from "./Financial";
import Business from "./Business";
import Personal from "./Personal";
import OTP from "./OTP";
import Paper from '@material-ui/core/Paper';
import GeneralModal from '../../components/GeneralModal';

import '../../sass/journey.scss';

function getStepContent(step) {
  switch (step) {
    case 0:
      return <Financial/>
    case 1:
      return <Business/>;
    case 2:
      return <Personal/>;
    case 3:
      return <OTP/>;
    default:
      return <Financial/>;
  }
}

const Journey = (props) => {
  const {state} = useContext(StoreContext);
  const { dialogTitle, dialogContent } = state.generalStates.dialog

  return (  
    <TemplateFullHeight>
      <VerifySessionKey>
        <div className="container flex-container">
          <Paper className="flex-paper" >
            <NavigationBar />
            <div className="page-journey">
              {getStepContent(state.generalStates.step)}
            </div>
          </Paper>
        </div>
        <GeneralModal data={{ dialogTitle, dialogContent }} />
      </VerifySessionKey>
    </TemplateFullHeight>
  );
}

// export {Journey};
export default withRouter(Journey);