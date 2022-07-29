import React, { useContext } from "react";
import * as yup from 'yup';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import StorefrontIcon from '@material-ui/icons/Storefront';
import BookIcon from '@material-ui/icons/Book';
import { Formik, Form, Field } from "formik";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {StoreContext} from '../../../store/context';
import MenuItem from '@material-ui/core/MenuItem';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import IconButton from '@material-ui/core/IconButton';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import Camera from '../../components/Camera';
import Img from 'react-exif-orientation-img';
import { currencyFormatter, toNumber } from "../../../utils"
import '../../sass/business.scss';

const useStyles = makeStyles(theme => ({
  root: {
    // paddingLeft: '80px',
    // '@media(min-width: 360px)': {
    //   paddingLeft: '20px',
    // }
  },
  stepLabel: {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: "bold !important",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  iconImg: {
    height: "100%",
    width: "100%"
  },
  imgPreview: {
    objectFit: 'contain',
    width: "100%"
  },
  icon: {
    color: 'rgb(240,61,61) !important'
  },
  redText:{
    color: 'rgb(240,61,61)'
  },
  nextButton:{
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:disabled":
      {
        backgroundColor: "#C4C4C4"
      }
  }
}));

const businessSchema = yup.object().shape({
  requireSsmImg: yup.boolean(),
  monthlyIncome: yup.string().required("Wajib Diisi")
    .required("Wajib Diisi").typeError("Input Dengan Angka"),
  totalOutlet: yup.number()
    .required("Wajib Diisi"),
  storeImg: yup.string().required("Wajib Diisi"),
  ssmImg: yup
    .string()
    .when("requireSsmImg", {
      is: true,
      then: yup.string().required("Wajib Diisi")
    })
});

const Business = () => {
  const {state, actions} = useContext(StoreContext);
  const { financingAmount } = state.financialStates;
  const {monthlyIncome, totalOutlet, storeImg, ssmImg} = state.businessStates;
  const classes = useStyles(); 
  const requireSSM = toNumber(financingAmount) > 15000000;
  const steps = [ 'Bisnis', 'Foto Toko', 'Foto Ijin Usaha'];

  const handleBack = () => {
    actions.generalActions.previousStep();
  };

  const [localState, setLocalState] = React.useState({
    loadStoreImg: false,
    loadSSMImg: false,
  });

  const openCamera = async (e) => {
    if (e.currentTarget.id === 'storeIcon') {
      setLocalState(prevState => ({ ...prevState, loadStoreImg: true, loadSSMImg: false }));
    } else if (e.currentTarget.id === 'ssmIcon') {
      setLocalState(prevState => ({ ...prevState, loadSSMImg: true, loadStoreImg: false }));
    }
  }

  const resetCaptureImg = (e, setFieldValue) => {
    e.preventDefault();
    if (e.currentTarget.id === 'resetCaptureStore') {
      // actions.businessActions.setStoreImg("")
      setFieldValue('storeImg', "")
    }  else if (e.currentTarget.id === 'resetCaptureSSM') {
      setFieldValue('ssmImg', "")
      // actions.businessActions.setSSMImg("")
    }
  }

  const getActive = (index, values) => {
    //return true
    if(index === 0) {
      return true;
    } else if (
      index === 1 &&
      values.monthlyIncome &&
      values.totalOutlet
    ){
      return true;
    } else if (
      index === 2 &&
      values.storeImg
    ) {
      return true;
    }
    return false;
  }
  
  const getCompleted = (index, values) => {
    //return true
    if(
      index === 0 &&
      values.monthlyIncome &&
      values.totalOutlet
    ) {
      return true;
    } else if (
      index === 1 &&
      values.storeImg
    ) {
      return true;
    } else if (
      index === 2 &&
      values.ssmImg
    ) {
      return true;
    }
    return false;
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="paper" style={{maxWidth: "600px"}}>
            <div className="section section-business">
              <FormControl variant="outlined" style={{marginTop: "30px"}}>
                <p className="question">Rata-Rata Pendapatan Dalam Sebulan Rp.</p>
                <Field
                  name="monthlyIncome"
                  render={({ field, form: { touched, errors, setFieldValue } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}                     
                      >
                        <MenuItem value="1">0 - 2.967.020</MenuItem>
                        <MenuItem value="2">2.967.021 - 5.934.040</MenuItem>
                        <MenuItem value="3">5.934.041 - 11.868.080</MenuItem>
                        <MenuItem value="4">11.868.081 - 25.000.000</MenuItem>
                        <MenuItem value="5">25.000.001 - 208.333.333</MenuItem>
                        <MenuItem value="6">208.333.334 - 4.166.666.667</MenuItem>
                        <MenuItem value="7">Lebih dari 4.166.666.667</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name] 
                          && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>   
              <FormControl variant="outlined" style={{marginTop: "30px"}}>
                <p className="question">Jumlah Toko</p>

                <Field
                    name="totalOutlet"
                    render={({ field, form :{ touched, errors } }) => (
                      <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}                     
                      >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4 Atau Lebih</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name] 
                          && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                      </>
                    )}
                />
              </FormControl>                      
            </div>
          </div>
        );
      case 1:
        return (
          <div className="paper" style={{ maxWidth: "700px" }}>
            <Field
              name="storeImg"
              render={({ field, form: { touched, errors, setFieldValue } }) => (
                <>
                  {
                    field.value?
                      <>
                        <Img src={field.value} className={classes.imgPreview} alt="store-number"/>
                        <div>
                          <IconButton
                            id="resetCaptureStore"
                            onClick={(e) => resetCaptureImg(e, setFieldValue)}
                          >
                            <RotateLeftIcon />
                          </IconButton>
                        </div>
                      </> 
                      : (localState.loadStoreImg ?
                        <>
                          <Camera getImage={(img) => setFieldValue("storeImg", img)} />
                        </>
                        : <>
                          <p>Silahkan, Masukan Foto Toko Anda</p>
                          <IconButton
                            color="primary"
                            onClick={openCamera}
                            id="storeIcon"
                            aria-label="upload picture"
                            component="span"
                          >
                            <StorefrontIcon className={classes.iconImg} color="disabled" />
                          </IconButton>
                        </>
                      )
                  }
                  {
                    touched[field.name] && errors[field.name]
                    && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                  }
                </>
              )}
            /> 
        </div>
      );
      case 2:
        return (
          <div className="paper" style={{ maxWidth: "700px" }}>
            <Field
              name="ssmImg"
              render={({ field, form: { touched, errors, setFieldValue } }) => (
                <>
                  {
                    field.value ?
                      <>
                        <Img src={field.value} className={classes.imgPreview} alt="ssm-img" />
                        <div>
                          <IconButton
                            id="resetCaptureSSM"
                            onClick={(e) => resetCaptureImg(e, setFieldValue)}
                          >
                            <RotateLeftIcon />
                          </IconButton>
                        </div>
                      </>
                      : (localState.loadSSMImg ?
                        <>
                          <Camera isChooseFile getImage={(img) => setFieldValue('ssmImg', img)} />
                        </>
                        : <>
                          <p>Silahkan, Masukan Foto Ijin Usaha Anda</p>
                          <IconButton
                            color="primary"
                            onClick={openCamera}
                            id="ssmIcon"
                            aria-label="upload picture"
                            component="span"
                          >
                            <BookIcon className={classes.iconImg} color="disabled" />
                          </IconButton>
                        </>
                      )
                  }
                
                  {
                    touched[field.name] && errors[field.name]
                    && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                  }
                </>
              )}
            />
        </div>
      );
      default:
        return null;
    }
  }

 

  return (
    <div className="page-business">
      <div className="content">
      <Formik
        initialValues={{
          requireSsmImg: requireSSM,
            monthlyIncome: `${monthlyIncome ? monthlyIncome : ''}`,
          totalOutlet: `${totalOutlet ? totalOutlet : ''}`,
          storeImg: `${storeImg ? storeImg : ''}`,
          ssmImg: `${ssmImg ? ssmImg : ''}`,
        }}
        validationSchema={businessSchema}
        onSubmit={async (values, { setSubmitting }) => {
          actions.businessActions.setBusinessFormData(values);
          setSubmitting(false);
          actions.generalActions.nextStep();          
        }}
      >
      {({ isSubmitting, values }) => (
        <Form>
           <Stepper className="stepper" classes={{ root: classes.root }}
            // activeStep={activeStep} 
            orientation="vertical">
            {steps.map((label, index) => (
              <Step key={label} active={getActive(index, values)} completed={getCompleted(index, values)}>
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
            <Button className={classes.button} onClick={handleBack}>
              Kembali
            </Button>
            <Button type="submit" variant="contained" disabled={isSubmitting} className={classes.nextButton}>
              Lanjut
            </Button>
            </div>
        </Form>
      )}
      </Formik>        
      </div>
    </div>
  )
}

export default Business