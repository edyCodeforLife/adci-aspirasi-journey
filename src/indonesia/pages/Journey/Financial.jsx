import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import * as yup from 'yup';
import { Formik, Form, Field } from "formik";
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import AgreementTerm from '../../components/AgreementTerm';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { StoreContext } from '../../../store/context';
import { toNumber, getDurationUnit, currencyFormatter } from '../../../utils';
import '../../sass/financial.scss';
import _ from 'lodash';
import { useStyles } from './styles/index.jsx'
import { checkAmountInput } from '../../../utils';

const formatter = new Intl.NumberFormat("en-ID", {
  style: 'currency',
  currency: 'IDR',
  minimumFractionDigits: 0,
});

const reg = new RegExp(',', 'g');

const Financial = () => {
  const classes = useStyles();
  const { state, actions } = useContext(StoreContext);
  const { financingAmount, duration, agreement1, agreement2, agreement3, repayment } = state.financialStates;
  const { setFinancingAmount, calculateFinancing, setDuration, setAgreement1, setAgreement2, setAgreement3 } = actions.financialActions;
  const { allowedDenom, financingOption, allowFlexibleAmount, product, merchant, preAuthToken, isInsuranceProduct, reference } = state.generalStates;
  const [minAmount, maxAmount] = [product.minimumDenom, merchant.maxAmount];
  const steps = [`${allowFlexibleAmount ? 'Input' : 'Pilih'} Jumlah Modal`, 'Pilih Periode Pembayaran', 'Jangka Waktu Modal Boost'];
  const active = [financingAmount, duration, (agreement1 || agreement2 || agreement3)];
  const amountHealthDeclaration = 100000000;
  const amountInput = localStorage.getItem("amount");
  const [currency, setCurrency] = useState(checkAmountInput(amountInput) ? amountInput : 0);


  const financialSchema = yup.object().shape({
    financingAmount: yup.string()
      .required('Wajib Diisi')
      .test('Jumlah tidak valid', 'Jumlah tidak valid',
        function (item) {
          const value = toNumber(item);
          return value >= minAmount && value <= maxAmount;
        }
      ),
    duration: yup.number().required('Wajib Diisi')
  });

  const getActive = (index) => {
    var tempIndex = 0;
    if (checkAmountInput(amountInput)) {
      tempIndex = 1
    } else {
      tempIndex = 0;
    }
    return index === tempIndex || (active[index - 1] !== 0 && active[index - 1] !== "");
  }

  const getCompleted = (index) => {
    return active[index] ? true : false;
  }

  const isDisable = () => 
      (!(
        (agreement3 || (agreement2 && (toNumber(financingAmount) < amountHealthDeclaration || agreement1))) &&
        financingAmount &&
        duration
      ));

  const getDurationLayout = () => {
    let layout = [];
    for (let i = 0; i < financingOption.length; i++) {
      layout.push(
        <FormControlLabel
          key={i}
          // className={classNames("radio-label", {"selected": duration === financingOption[i].tenure.toString()})} 
          className={classNames("radio-label", { "selected": duration === financingOption[i].tenure })}
          // value={financingOption[i].tenure.toString()} control={<Radio />} 
          value={financingOption[i].tenure} control={<Radio />}
          label={`${financingOption[i].tenure} ${getDurationUnit(financingOption[i].timeUnit)}`} />
      )
    }
    return layout;
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <div className="paper" style={{ maxWidth: "780px" }}>
            <div className="section section-amount">
              <FormControl component="fieldset" >
                {allowFlexibleAmount
                  ? <div>
                    <p style={{ fontSize: "18px" }}>{(formatter.format(minAmount)).replace(reg, ".")} - {(formatter.format(maxAmount)).replace(reg, ".")}</p>
                    <Field name="financingAmount">
                      {({ field, form: { touched, errors, setFieldValue } }) => (
                        <div>
                          <Input
                            {...field}
                            onChange={(e) => {
                              const currencyd = currencyFormatter(e.target.value);
                              setCurrency(currencyFormatter(e.target.value));
                              if (financingAmount !== currencyd) {
                                setFinancingAmount(currencyd);
                                setFieldValue('financingAmount', currencyd);
                                calculateFinancing({ amount: currencyd, duration })
                              }
                            }}
                            style={{ maxWidth: "300px" }}
                            error={Boolean(touched[field.name] && errors[field.name])}
                            fullWidth
                            disabled={checkAmountInput(amountInput) ? true : false}
                            value={currency}
                            startAdornment={<InputAdornment position="start">IDR </InputAdornment>}
                          />
                          {
                            touched[field.name] && errors[field.name]
                            && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                          }
                        </div>
                      )}
                    </Field>
                  </div>
                  : <Field name="financingAmount">
                    {({ field, form: { touched, errors, setFieldValue } }) => (
                      <div>
                        <RadioGroup
                          {...field}
                          aria-label="amount"
                          name="amount"
                          className="radio-group"
                          value={financingAmount}
                          onChange={(e) => {
                            handleSelectionChange(e)
                            setFieldValue('financingAmount', e.target.value);
                          }}>
                          {
                            allowedDenom.map(({ denomValue }, i) =>
                              <FormControlLabel key={i} className={classNames("radio-label", { "selected": financingAmount === denomValue.toString() })} value={denomValue.toString()} control={<Radio />} label={`${formatter.format(denomValue).replace(reg, ".")}`} />
                            )
                          }
                        </RadioGroup>
                        {
                          touched[field.name] && errors[field.name]
                          && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                        }
                      </div>
                    )}
                  </Field>
                }
              </FormControl>
            </div>
          </div>
        );
      case 1:
        return (
          <div className="paper" style={{ maxWidth: "420px" }}>
            <div className="section section-duration">
              <FormControl component="fieldset" >
                <Field name="duration">
                  {({ field, form: { touched, errors, setFieldValue } }) => (
                    <div>
                      <RadioGroup
                        {...field}
                        aria-label="duration"
                        name="duration"
                        className="radio-group"
                        value={duration}
                        onChange={(e) => {
                          handleSelectionChange(e)
                          if (checkAmountInput(amountInput)) {
                            setFieldValue('financingAmount', currency);
                          }
                          setFieldValue('duration', parseInt(e.target.value));
                        }}>
                        <>
                          {getDurationLayout()}
                        </>
                      </RadioGroup>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </div>
                  )}
                </Field>
              </FormControl>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="paper summary" style={{ maxWidth: "710px" }}>
            <div className="section section-agreement">
              <AgreementTerm duration={duration} />

              {(isInsuranceProduct && repayment.insurancePremium > 0 && toNumber(financingAmount) >= amountHealthDeclaration) && (

                <FormControlLabel
                  className="checkbox-holder"
                  control={
                    <Checkbox checked={agreement1}
                      name="agreement1"
                      className="checkbox"
                      onChange={handleSelectionChange}
                      value={agreement1}
                    />
                  }
                  label={<span className="checkbox-label">Saya menyatakan bahwa saya saat ini dalam keadaan kesehatan yang baik, dan saat ini saya tidak menjalani perawatan medis / kesehatan (termasuk Covid-19)</span>}
                />
              )}
              {(isInsuranceProduct && repayment.insurancePremium > 0) && (
                <FormControlLabel
                  className="checkbox-holder"
                  control={
                    <Checkbox checked={agreement2}
                      name="agreement2"
                      className="checkbox"
                      onChange={handleSelectionChange}
                      value={agreement2}
                    />
                  }
                  label={
                  reference=="bk"?
                  <span className="checkbox-label">Saya telah membaca dan menyetujui setiap dan seluruh syarat dan ketentuan dalam {" "}
                    <a target="_blank" rel="noopener noreferrer" >Syarat dan Ketentuan Umum</a>,{" "}
                    <a target="_blank" rel="noopener noreferrer" >Syarat dan Kebijakan Privasi</a> serta{" "}
                    <a target="_blank" rel="noopener noreferrer" >Syarat dan Ketentuan Asuransi</a>.
                  </span>:
                    <span className="checkbox-label">Saya telah membaca dan menyetujui setiap dan seluruh syarat dan ketentuan dalam {" "}
                    <a target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2022/02/Syarat-dan-Ketentuan.pdf">Syarat dan Ketentuan Umum</a>,{" "}
                    <a target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2021/10/Kebijakan-Privasi.pdf">Syarat dan Kebijakan Privasi</a> serta{" "}
                    <a target="_blank" rel="noopener noreferrer" href="https://aspirasi-assets.s3-ap-southeast-1.amazonaws.com/prima/STC_Great_ProInsure_Life.pdf">Syarat dan Ketentuan Asuransi</a>.
                  </span>
                }
                />
              )}

              {(!isInsuranceProduct || repayment.insurancePremium === 0) && (
                <FormControlLabel
                  className="checkbox-holder"
                  control={
                    <Checkbox checked={agreement3}
                      name="agreement3"
                      className="checkbox"
                      onChange={handleSelectionChange}
                      value={agreement3}
                    />
                  }
                  label={
                    reference=="bk"?
                    <span className="checkbox-label">Saya telah membaca dan menyetujui setiap dan seluruh syarat dan ketentuan dalam {" "}
                    <a className="a-link" target="_blank" rel="noopener noreferrer" >Syarat dan Ketentuan Umum</a> serta {" "}
                    <a className="a-link" target="_blank" rel="noopener noreferrer" >Syarat dan Kebijakan Privasi</a>.
                    {/* <a className="a-link" target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2022/02/Syarat-dan-Ketentuan.pdf">Syarat dan Ketentuan Umum</a> serta {" "}
                    <a className="a-link" target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2021/10/Kebijakan-Privasi.pdf">Syarat dan Kebijakan Privasi</a>. */}
                  </span>:
                      <span className="checkbox-label">Saya telah membaca dan menyetujui setiap dan seluruh syarat dan ketentuan dalam {" "}
                      <a className="a-link" target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2022/02/Syarat-dan-Ketentuan.pdf">Syarat dan Ketentuan Umum</a> serta {" "}
                      <a className="a-link" target="_blank" rel="noopener noreferrer" href="https://myboost.co.id/wp-content/uploads/2021/10/Kebijakan-Privasi.pdf">Syarat dan Kebijakan Privasi</a>. 
                    </span>
                 
                  }
                />
              )}
            </div>
          </div>
        );
      default:
        return 'Unknown step';
    }
  }

  const handleSelectionChange = e => {
    if (e.target.name === 'amount') {
      if (financingAmount !== e.target.value) {
        setFinancingAmount(e.target.value);
        calculateFinancing({ amount: e.target.value, duration })
      }
    } else if (e.target.name === 'duration') {

      const value = parseInt(e.target.value)
      if (duration !== value) {
        setDuration(value);
        if (checkAmountInput(amountInput)) {
          setFinancingAmount(currency);
          // setFieldValue('financingAmount', currency);
          calculateFinancing({ amount: currency, duration: value })
        } else {
          calculateFinancing({ amount: financingAmount, duration: value })
        }
      }
    } else if (e.target.name === 'agreement1') {
      setAgreement1(!(e.target.value === 'true'));
    } else if (e.target.name === 'agreement2') {
      setAgreement2(!(e.target.value === 'true'));
    } else if (e.target.name === 'agreement3') {
      setAgreement3(!(e.target.value === 'true'));
    }
  }

  return (
    <div className="page-financing">
      <div className="content">

        <Formik
          initialValues={{
            financingAmount: `${financingAmount ? financingAmount : ''}`,
            duration: `${duration ? duration : ''}`

          }}
          validationSchema={financialSchema}
          onSubmit={(values) => {
            if (!_.isEmpty(preAuthToken)) { // re-submit, skip business and personal step 
              actions.generalActions.submitPreauthorizedApplication(values)
            } else {
              actions.generalActions.nextStep();
            }
          }}
        >
          {({ isSubmitting, values, errors, touched }) => (
            <Form>
              <Stepper className="stepper"
                orientation="vertical">
                {steps.map((label, index) => (
                  <Step key={label} active={getActive(index)} completed={getCompleted(index)}>
                    <StepLabel
                      StepIconProps={{ classes: { root: classes.icon } }}
                      classes={{
                        active: classes.stepLabel,
                        label: classes.stepLabel,
                      }}>
                      {label}
                    </StepLabel>
                    <StepContent>
                      {getStepContent(index)}
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
              <div className="action-holder">
                <Button type="submit" variant="contained" disabled={isDisable()} className={classes.nextButton}>Lanjut</Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Financial;
