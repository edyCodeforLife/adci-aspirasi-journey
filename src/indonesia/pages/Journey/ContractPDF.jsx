import React from 'react';
import _ from 'lodash'

const ContractPDF = () => {

  const masterAgreement = sessionStorage.getItem("masterAgreement");
  return (
      <>
      {!_.isEmpty(masterAgreement) &&
        <object
          style={{ width: '100%', height: '100vh' }}
          type="application/pdf"
          data={masterAgreement}
        >
        </object>
      }
      </>
  );
}

export default ContractPDF;








