import React from "react";
import { withRouter, Link } from "react-router-dom";
import Template from '../../components/Template'

const Complete = (props) => {

  const masterAgreement = sessionStorage.getItem("masterAgreement");

  return (
    <Template>
      <div className="container">
        <div className="page-landing3">
          {
            masterAgreement &&
            <>
              <h1 className="title">Perjanjian ditandatangani!</h1>
              {/* <h4 className="sub-title">Silahkan klik tautan di bawah ini untuk mendapatkan dokumen konfirmasi pinjaman dan Perjanjian Pinjam Meminjam</h4> */}
              {/*
              <h4 className="sub-title">
                  <a
                      download="Agreement.pdf"
                      href={masterAgreement}>
                      <p>Unduh Dokumen</p>
                  </a>
              </h4>
              */}
              <h4 className="sub-title">Terima kasih telah menggunakan Boost!</h4>
            </>
          }
        </div>
      </div>
    </Template>
  );
}
export default withRouter(Complete);