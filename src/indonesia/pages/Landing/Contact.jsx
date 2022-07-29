import React from "react";
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';
import Template from '../../components/Template'

const Contact = (props) => {

  return (
    <Template>
      <div className="container">
        <div className="page-landing3">
          <h1 className="title">Hubungi kami</h1>
          <h4 className="sub-title">(6 hari/ Jam) 9:00 - 18:00</h4>
         
          <label>
            <PhoneIcon />
            {' '}
            021 510 109 99 
            </label>
          <br />
          <label>
            <EmailIcon />
            {' '}
            {/* info@julofinance.com */}
            </label> 
         
        </div>
      </div>
    </Template>
  );
}

export default Contact;
