import React, { useContext, useState } from 'react'
import * as yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import { withRouter } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import { StoreContext } from '../../../store/context';
import '../../sass/otp.scss';
import ContractPreview from '../../components/ContractPreview';
import { useStyles } from './styles/index.jsx';
import ReCAPTCHA from "react-google-recaptcha";

const SITEKEY_GR = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITEKEY;

const otpSchema = yup.object().shape({
  otp: yup.number()
    .required("Wajib Diisi")
});

const OTP = (props) => {
  const classes = useStyles();
  const { state, actions } = useContext(StoreContext);
  const { submittedOTPRequest, isLoading } = state.generalStates;
  const { requestOTP, verifyOTP } = actions.generalActions;
  const [captchaValue, setCaptchaValue] = useState("");
  const [seconds, setSeconds] = useState(0);
  var timer = null;

  const startTimer = () => {
    setSeconds(30000);
    timer = setInterval(
      () => {
        setSeconds(sec => {
          if (sec <= 1000) {
            clearInterval(timer);
            return 0;
          } else {
            return sec - 1000;
          }
        });
      },
      1000
    );
  }

  const onChange = (value) => {
    console.log("Captcha value:", value);
    setCaptchaValue(value);
  }

  console.log(captchaValue)

  // const handleBack = () => {
  //   previousStep();
  // };

  const onRequestOtpClick = () => {
    startTimer();
    requestOTP();
  }

  return (
    <div className="page-otp">
      <div className="content">
        <div className="paper" style={{ maxWidth: "850px", margin: "0 auto 20px auto" }}>
          <div className="section section-contract">
            <ContractPreview />
          </div>
          <div className="section section-otp">
            <Formik
              initialValues={{
                otp: '',
              }}
              validationSchema={otpSchema}
              onSubmit={async (values, { setSubmitting }) => {
                verifyOTP(values, props.history);
                setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <FormControl fullWidth>
                    <p className="question">Kode OTP</p>
                    <Field
                      name="otp"
                      render={({ field, form: { touched, errors } }) => (
                        <>
                          <Input
                            {...field}
                            error={Boolean(touched[field.name] && errors[field.name])}

                          />
                          {
                            touched[field.name] && errors[field.name]
                            && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                          }
                        </>
                      )}
                    />
                  </FormControl>
                  <Button fullWidth style={{ marginTop: "20px", height: "50px", outline: "none" }} variant="contained"
                    className={classes.nextButton}
                    disabled={Boolean(seconds)} onClick={onRequestOtpClick}>Dapatkans Kodes{seconds ? ` (${seconds / 1000})` : ''}</Button>
                  <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: 20 }}>
                    <ReCAPTCHA
                      sitekey={SITEKEY_GR}
                      onChange={onChange}
                    />
                  </div>

                  <div className="action-holder" style={{ margin: "20px 0px 15px 10px" }}>
                    {/* <Button onClick={handleBack}>
                      Kembali
                    </Button> */}
                    <Button type="submit" variant="contained"
                      className={classes.nextButton}
                      disabled={isLoading || isSubmitting || !submittedOTPRequest || captchaValue === ""}>
                      Lanjut
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(OTP);