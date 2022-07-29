import { useEffect, useContext } from 'react';
import _ from 'lodash'
import { withRouter } from "react-router-dom";
import { StoreContext } from '../../store/context';

const VerifySessionKey = (props) => {
  const { state } = useContext(StoreContext);
  const code = sessionStorage.getItem("code")
  const reference = localStorage.getItem("referenced");
  const amountInput = localStorage.getItem("amount");
  var appendedText = '/?code='+code;

  useEffect(() => {
    if (_.isEmpty(state.generalStates.sessionKey)) {
      if (reference!="")
      {
        var temp = '&ref='+reference;
        appendedText += temp;
        // props.history.push(`/?ref=${reference}&code=${code}`)
      }
      
      if(amountInput || amountInput!="null" || amountInput!=""){
        var temp = '&amount='+amountInput;
        appendedText += temp;
      }

      props.history.push(appendedText);
    }

    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (_.isEmpty(state.generalStates.sessionKey) ? null : props.children);
};

export default withRouter(VerifySessionKey);








