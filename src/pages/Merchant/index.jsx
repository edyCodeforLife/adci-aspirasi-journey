import React, { useContext, useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import api from '../../utils/api';
import Registration from "./Registration";

import {
  SV_MERCHANT_DISTRIBUTOR_LIST,
  SV_MERCHANT_CONTRACT_LIST,
} from "../../helpers/endpoints";
import PageLoader from "../../indonesia/components/CustomLoader";
import { StoreContext } from '../../store/context';
import CustomButton from "../../indonesia/components/CustomButton";
import styles from '../../indonesia/sass/aspirasi.module.scss';
import CustomTemplate from "../../indonesia/components/CustomTemplate";
import { getUrlParam } from '../../utils/index';
import { formatToSpace, formatStringByRegex } from "../../helpers/regex";
// import useTimerToken from "../../components/TimerToken";

const queryString = require('query-string');
var user = process.env.REACT_APP_CLIENT_ID;
var password = process.env.REACT_APP_CLIENT_SECRET;
var base64encodedData = Buffer.from(user + ':' + password).toString('base64');

const Aspirasi = (props) => {
  const [isLoaded, setLoaded] = useState(false);
  // const [isTokenable, setTokenable] = useState("")
  const [isNew, setNew] = useState(true);
  const [dataMerchant, setDataMerchant] = useState("kkooaa");
  const { state, actions } = useContext(StoreContext);
  const [initialIndex, setIndex] = useState(0);
  const [errorHappen, setErrorHappen] = useState(false);
  // const {counter, resetCounter, setCounterVal} = useTimerToken();
  const data = state.aspirasiStates;
  var payloadMDL = generateMDLPayload();

  useEffect(() => {
    function fetchData() {
      return api.postWithHeader(
        SV_MERCHANT_DISTRIBUTOR_LIST, payloadMDL,
        {
          headers: {
            'Authorization': 'Bearer ' + payloadMDL.tknVal
          }
        }
      ).then(response => {
        actions.aspirasiActions.setMerchantDistributorList(response.data);
        setLoaded(true);
      }).catch(error => {
        if (error.data.error == "invalid_token") {
          setLoaded(false);
          setErrorHappen(true);
          alert("Access Denied")
        } else if (error.status == "404") {
          setLoaded(false);
          setErrorHappen(true)
          alert("Data Not Found")
        }
      });
    }

    function fetchContractList() {
      var payload = {
        merchantId: data.distributorDetails[initialIndex].merchantId,
        distributorId: data.distributorDetails[initialIndex].distributorId,
        distributorName: data.distributorDetails[initialIndex].distributorName,
        // merchantIdentity: 
      }
      api.postWithHeader(
        SV_MERCHANT_CONTRACT_LIST,
        payload, {
        headers: {
          'Authorization': 'Bearer ' + payloadMDL.tknVal
        }
      }
      ).then(response => {
        setNew(false);
        actions.aspirasiActions.setMerchantDistributorList(response.data);
      }).catch(error => {
        setNew(true);
      })
    }

    fetchData()
      .then(
        fetchContractList()
      )

  }, [!isLoaded]);

  //todo
  const handleClick = (index) => {
    setLoaded(false);
    setIndex(index);
  }

  return (
    <CustomTemplate>
      <div style={
        {
          paddingRight: "0px",
          paddingLeft: "0px",
          marginBottom: "25px",
        }
      } className="container bodyContainer">
        <div className={styles.containerAspirasi}
        >
          <div className={styles.btnAspirasiContainer}>
            {
              isLoaded ?
                generateButtonAspirasi(data, handleClick) : null
            }
          </div>
          <div>
            {
              isLoaded ?
                <Registration initIndex={initialIndex} isNew={isNew} data={dataMerchant} />
                : (errorHappen) ? <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  flexDirection: 'column',
                  minHeight: '25vh'
                }}><p>The Data is missing</p><p>Please Contact Customer Service</p></div> : <PageLoader />
            }
          </div>
        </div>
      </div>
    </CustomTemplate >
  )
}

function generateMDLPayload() {
  // alert("==> "+formatToSpace(formatStringByRegex(""+getUrlParam("merchantName"), 0)));
  const payload = {
    merchantName: formatStringByRegex("" + formatToSpace(getUrlParam("merchantName")), 0),
    merchantEmail: formatStringByRegex("" + getUrlParam("merchantEmail"), 0),
    merchantPhone: formatStringByRegex("" + getUrlParam("merchantPhone"), 0),
    merchantIdentity: formatStringByRegex("" + getUrlParam("merchantIdentity"), 0),
    tknVal: getUrlParam("code")
  }
  return payload
}

function generateButtonAspirasi(data, event) {
  var xx = data.distributorDetails.map((value, index) =>
    <CustomButton classX="blank" onClick={() => event(index)}>
      {data.distributorDetails[index].distributorName}
    </CustomButton>
  )
  return xx;
}

export default withRouter(Aspirasi);