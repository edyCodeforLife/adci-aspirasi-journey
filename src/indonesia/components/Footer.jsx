import React from 'react';
import PhoneIcon from '@material-ui/icons/Phone';
import juloLogo from '../../assets/images/julo-logo.png';
import { aspirasiFlags } from '../../helpers/common';
import {Link} from "react-router-dom";
import '../sass/footer.scss';

const Footer = (props) => {
  return (  
    <>
      {/*<img className="footer-logo" src={juloLogo} alt="logo" /> */}
      <div className="footer3">
        <div className="container">
          <div className="help-link">
          <Link to="/contacts" target="_blank">Kontak</Link>
            <a target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2022/02/FAQBoost.pdf">FAQ</a>
            <a target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2022/02/Syarat-dan-Ketentuan.pdf">Syarat & Ketentuan Umum</a>
            <a target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2021/10/Kebijakan-Privasi.pdf">Kebijakan</a>
            <div className="afpi-logo">
              
          <img className="whiteOutline" alt="logo" height="60" src={aspirasiFlags.afpiLogo2}></img>
          <img className="whiteOutline" alt="logo" height="60" src={aspirasiFlags.afpiLogo}></img>
        </div>    
          </div>
          <div className="contact-info">
            <div>

              <a href="tel:+021 395 099 57">
                <PhoneIcon /> {' '}
                021 510 109 99
            </a>

            </div>
          </div>
        </div>
      </div>
    </>    
  );
};
export default Footer;
