import React, { useContext } from "react";
import * as yup from 'yup';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Form, Field } from "formik";
import InputAdornment from '@material-ui/core/InputAdornment';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import PictureInPictureIcon from '@material-ui/icons/PictureInPicture';
import { StoreContext } from '../../../store/context';
import Camera from '../../components/Camera';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';
import { makeStyles } from '@material-ui/core/styles';
import Img from 'react-exif-orientation-img';
import { currencyFormatter } from "../../../utils"
import '../../sass/personal.scss';
import watermarkIndonesia from '../../../assets/images/watermark-indonesia.png';
import moment from 'moment';
import watermark from 'watermarkjs';

const useStyles = makeStyles(theme => ({
  root: {
    // paddingLeft: '80px',
    // '@media(min-width: 360px)': {
    //   paddingLeft: '20px',
    // }
  },
  formControl: {
    marginTop: '30px'
  },
  stepLabel: {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: "bold !important",
  },
  cardContent: {
    maxHeight: 400,
    maxWidth: 400,
    margin: 'auto'
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
  redText: {
    color: 'rgb(240,61,61)'
  },
  nextButton: {
    backgroundColor: theme.palette.error.main,
    color: "white",
    "&:disabled":
    {
      backgroundColor: "#C4C4C4"
    }
  }
}));

const personalSchema = yup.object().shape({
  gender: yup.string().required("Wajib Diisi"),
  maritalStatus: yup.string().required("Wajib Diisi"),
  educationLevel: yup.string().required("Wajib Diisi"),
  numberOfChild: yup.string().required("Wajib Diisi"),
  jobType: yup.string().required("Wajib Diisi"),
  totalAsset: yup.string().typeError("Input Dengan Angka"),
  icNumber: yup.string().matches(/^[0-9]{16}$/, 'Input Dengan Angka Harus Sesuai Nomor KTP 16 Digit').required("Wajib Diisi"),
  placeOfBirth: yup.string().matches(/^[a-zA-Z ]*$/, 'Input Dengan Huruf').required("Wajib Diisi"), // only alphabet
  religionID: yup.string().required("Wajib Diisi"),
  workingExperience: yup.string().required("Wajib Diisi"),
  homeOwnership: yup.string().required("Wajib Diisi"),
  selfie: yup.string().required("Wajib Diisi"),
  icImg: yup.string().required("Wajib Diisi"),
});

const Personal = () => {
  const { state, actions } = useContext(StoreContext);
  const classes = useStyles();
  const steps = [
    'Info Personal',
    'Foto Selfie dengan KTP',
    'Foto KTP',
  ];

  const {
    gender,
    maritalStatus,
    educationLevel,
    numberOfChild,
    jobType,
    totalAsset,
    icNumber,
    placeOfBirth,
    religionID,
    workingExperience,
    homeOwnership,
    selfie,
    icImg,
  } = state.personalStates;
  const { repayment: { insurancePremium } } = state.financialStates;
  const { isLoading, isInsuranceProduct, insurance, customer: { dob } } = state.generalStates;

  const { previousStep, submitApplication } = actions.generalActions;
  const { setPersonalFormData, checkKTP } = actions.personalActions;
  const dobDate = moment(dob?.split(" ")[0], 'YYYY-MM-DD');
  const age = moment().diff(dobDate, 'years');
  const [localState, setLocalState] = React.useState({
    loadUserImg: false,
    loadIcImg: false,
  });

  const getActive = (index, values) => {
    if (index === 0) {
      return true;
    } else if (
      index === 1 &&
      values.gender &&
      values.maritalStatus &&
      values.educationLevel &&
      values.numberOfChild &&
      values.jobType &&
      values.icNumber &&
      values.placeOfBirth &&
      values.religionID &&
      values.workingExperience &&
      values.homeOwnership &&
      values.totalAsset
    ) {
      return true;
    } else if (
      index === 2 &&
      values.selfie
    ) {
      return true;
    }
    return false;
  }

  const getCompleted = (index, values) => {
    if (
      index === 0 &&
      values.gender &&
      values.maritalStatus &&
      values.educationLevel &&
      values.numberOfChild &&
      values.jobType &&
      values.icNumber &&
      values.placeOfBirth &&
      values.religionID &&
      values.workingExperience &&
      values.homeOwnership &&
      values.totalAsset
    ) {
      return true;
    } else if (
      index === 1 &&
      values.selfie
    ) {
      return true;
    } else if (
      index === 2 &&
      values.icImg
    ) {
      return true;
    }
    return false;
  }

  const handleBack = () => {
    previousStep();
  };

  const openCamera = async (e) => {
    if (e.currentTarget.id === 'userIcon') {
      setLocalState(prevState => ({ ...prevState, loadUserImg: true, loadIcImg: false }));
    } else if (e.currentTarget.id === 'icIcon') {
      setLocalState(prevState => ({ ...prevState, loadIcImg: true, loadUserImg: false }));
    }
  }

  const resetCaptureImg = (e, setFieldValue) => {
    e.preventDefault();
    if (e.currentTarget.id === 'resetCaptureUser') {
      setFieldValue('selfie', "")
    } else if (e.currentTarget.id === 'resetCaptureIc') {
      setFieldValue('icImg', "")
    }
  }

  const getStepContent = step => {
    switch (step) {
      case 0:
        return (
          <div className="paper" style={{ maxWidth: "600px" }}>
            <div className="section section-personal">
              <FormControl className={classes.formControl}>
                <p className="question">No KTP</p>
                <Field
                  name="icNumber"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Input
                        {...field}
                        placeholder="Example: 7105074205820001"
                        error={Boolean(touched[field.name] && errors[field.name])}
                        fullWidth
                      />
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" className={classes.formControl}>
                <p className="question">Jenis Kelamin </p>
                <Field
                  name="gender"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value='Laki'>Laki</MenuItem>
                        <MenuItem value='Perempuan'>Perempuan</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <p className="question">Tempat Lahir</p>
                <Field
                  name="placeOfBirth"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Input
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                        fullWidth
                      />
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" style={{ marginTop: "30px" }} className={classes.formControl}>
                <p className="question">Agama</p>
                <Field
                  name="religionID"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value="1">Islam</MenuItem>
                        <MenuItem value="2">Katholik</MenuItem>
                        <MenuItem value="3">Protestan</MenuItem>
                        <MenuItem value="4">Hindu</MenuItem>
                        <MenuItem value="5">Budha</MenuItem>
                        <MenuItem value="6">Konghucu</MenuItem>
                        <MenuItem value="7">Lainnya</MenuItem>
                        <MenuItem value="8">Badan Hukum</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" style={{ marginTop: "30px" }} className={classes.formControl}>
                <p className="question">Tingkat Pendidikan </p>
                <Field
                  name="educationLevel"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value="1">SD</MenuItem>
                        <MenuItem value="2">SMP</MenuItem>
                        <MenuItem value="3">SMA/SMAL</MenuItem>
                        <MenuItem value="4">Diplomat</MenuItem>
                        <MenuItem value="5">Sarjana</MenuItem>
                        <MenuItem value="6">Magister</MenuItem>
                        <MenuItem value="7">Doktor</MenuItem>
                        <MenuItem value="8">Badan Hukum</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" style={{ marginTop: "30px" }} className={classes.formControl}>
                <p className="question">Pekerjaan Anda</p>
                <Field
                  name="jobType"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value="0"><em>Tidak Ada</em></MenuItem>
                        <MenuItem value="1">PNS</MenuItem>
                        <MenuItem value="2">TNI/Polri</MenuItem>
                        <MenuItem value="3">Karyawan BUMN</MenuItem>
                        <MenuItem value="4">Karyawan Swasta</MenuItem>
                        <MenuItem value="5">Wiraswata</MenuItem>
                        <MenuItem value="6">Pelajar/Mahasiswa</MenuItem>
                        <MenuItem value="7">Lain-lain</MenuItem>
                        <MenuItem value="8">Tidak bekerja/bukan pelajar</MenuItem>
                        <MenuItem value="9">Badan Hukum</MenuItem>

                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" style={{ marginTop: "30px" }} className={classes.formControl}>
                <p className="question">Pengalaman Kerja</p>
                <Field
                  name="workingExperience"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value="0">Belum pernah Bekerja</MenuItem>
                        <MenuItem value="1">Kurang dari 1 Tahun</MenuItem>
                        <MenuItem value="2">1 - 2 Tahun</MenuItem>
                        <MenuItem value="3">2 - 3 Tahun</MenuItem>
                        <MenuItem value="4">Lebih dari 3 Tahun</MenuItem>
                        <MenuItem value="5">Badan Hukum</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" style={{ marginTop: "30px" }} className={classes.formControl}>
                <p className="question">Status Perkawinan</p>
                <Field
                  name="maritalStatus"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value="Lajang">Lajang</MenuItem>
                        <MenuItem value="Menikah">Menikah</MenuItem>
                        <MenuItem value="Duda/Janda">Duda/Janda</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" style={{ marginTop: "30px" }} className={classes.formControl}>
                <p className="question">Jumlah Anak</p>
                <Field
                  name="numberOfChild"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value="0"><em>Tidak Ada</em></MenuItem>
                        <MenuItem value="1">1</MenuItem>
                        <MenuItem value="2">2</MenuItem>
                        <MenuItem value="3">3</MenuItem>
                        <MenuItem value="4">4</MenuItem>
                        <MenuItem value="5">5</MenuItem>
                        <MenuItem value="6">6</MenuItem>
                        <MenuItem value="7">7 Atau Lebih</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl variant="outlined" style={{ marginTop: "30px" }} className={classes.formControl}>
                <p className="question">Status Kepemilikan Rumah</p>
                <Field
                  name="homeOwnership"
                  render={({ field, form: { touched, errors } }) => (
                    <>
                      <Select
                        {...field}
                        error={Boolean(touched[field.name] && errors[field.name])}
                      >
                        <MenuItem value="1">Milik Sendiri</MenuItem>
                        <MenuItem value="2">Tidak Memiliki Rumah Sendiri</MenuItem>
                        <MenuItem value="3">Badan Hukum</MenuItem>
                      </Select>
                      {
                        touched[field.name] && errors[field.name]
                        && <div style={{ color: "red", marginTop: ".5rem" }}>{errors[field.name]}</div>
                      }
                    </>
                  )}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <p className="question">Jumlah Asset</p>
                <Field
                  name="totalAsset"
                  render={({ field, form: { touched, errors, setFieldValue } }) => (
                    <>
                      <Input
                        {...field}
                        onChange={(e) => {
                          const currency = currencyFormatter(e.target.value);
                          setFieldValue(field.name, currency)
                        }}
                        error={Boolean(touched[field.name] && errors[field.name])}
                        fullWidth
                        startAdornment={<InputAdornment position="start">IDR</InputAdornment>}
                      />
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
            <div style={{ fontWeight: 'bold' }}>
              Mohon Pastikan KTP tidak menutupi muka - Foto Selfie dan KTP terlihat jelas
              - KTP milik anda pribadi - Foto diambil langsung dari kamera HP anda
              </div>
            <Field
              name="selfie"
              render={({ field, form: { touched, errors, setFieldValue } }) => (
                <>
                  {
                    field.value ?
                      <>
                        <Img src={field.value} className={classes.imgPreview} alt="selfie" />
                        <div>
                          <IconButton
                            id="resetCaptureUser"
                            onClick={(e) => resetCaptureImg(e, setFieldValue)}
                          >
                            <RotateLeftIcon />
                          </IconButton>
                        </div>
                      </>
                      : (localState.loadUserImg ?
                        <>
                          <Camera facingMode="user" getImage={(img) => setFieldValue("selfie", img)} />
                        </>
                        : <>
                          <p>Silakan, Ambil foto diri Anda</p>
                          <IconButton
                            color="primary"
                            onClick={openCamera}
                            id="userIcon"
                            aria-label="upload picture"
                            component="span">
                            <PhotoCamera className={classes.iconImg} color="disabled" />
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
              name="icImg"
              render={({ field, form: { touched, errors, setFieldValue } }) => (
                <>
                  {
                    field.value ?
                      <>
                        <div className="ic-holder">
                          {/* <img className="watermark" src={watermarkIndonesia} alt="watermark"></img> */}
                          <Img src={field.value} className={classes.imgPreview} alt="ic-number" />
                        </div>
                        <div>
                          <IconButton
                            id="resetCaptureIc"
                            onClick={(e) => resetCaptureImg(e, setFieldValue)}
                          >
                            <RotateLeftIcon />
                          </IconButton>
                        </div>
                      </>
                      : (localState.loadIcImg ?
                        <>
                          <Camera getImage={(img) => {
                            watermark([img, watermarkIndonesia])
                              // .image(watermark.image.center())
                              .image((uploadImage, logo) => {
                                const context = uploadImage.getContext('2d')
                                let percentage = 0;

                                if (uploadImage.width > uploadImage.height) {
                                  percentage = uploadImage.height / logo.height;
                                } else {
                                  percentage = uploadImage.width / logo.width;
                                }

                                const logoHeight = logo.height * percentage;
                                const LogoWidth = logo.width * percentage;

                                const posX = (uploadImage.width / 2 - LogoWidth / 2)
                                const posY = (uploadImage.height / 2 - logoHeight / 2)
                                // context.save()
                                context.drawImage(logo, posX, posY, LogoWidth, logoHeight);
                                // context.restore()
                                return uploadImage;
                              })
                              .then(function (watermarkIc) {
                                setFieldValue("icImg", watermarkIc.src)
                              });

                          }} />
                        </>
                        : <>
                          <p>Silakan, Masukan Foto KTP Anda</p>
                          <IconButton
                            color="primary"
                            onClick={openCamera}
                            id="icIcon"
                            aria-label="upload picture"
                            component="span"
                          >
                            <PictureInPictureIcon className={classes.iconImg} color="disabled" />
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
    <div className="page-personal">
      <div className="content">
        <Formik
          initialValues={{
            gender: `${gender ? gender : ''}`,
            maritalStatus: `${maritalStatus ? maritalStatus : ''}`,
            educationLevel: `${educationLevel ? educationLevel : ''}`,
            numberOfChild: `${numberOfChild ? numberOfChild : '0'}`,
            jobType: `${jobType ? jobType : ''}`,
            totalAsset: `${totalAsset ? totalAsset : '0'}`,
            icNumber: `${icNumber ? icNumber : ''}`,
            placeOfBirth: `${placeOfBirth ? placeOfBirth : ''}`,
            religionID: `${religionID ? religionID : '8'}`,
            workingExperience: `${workingExperience ? workingExperience : ''}`,
            homeOwnership: `${homeOwnership ? homeOwnership : ''}`,
            selfie: `${selfie ? selfie : ''}`,
            icImg: `${icImg ? icImg : ''}`,
          }}
          validationSchema={personalSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(false);
            if (isInsuranceProduct && insurancePremium > 0) {
              const genderInt = values.gender === "Laki" ? 1 : 2;
              checkKTP({ age: age, ktp: values.icNumber, gender: genderInt }).then(respond => {

                if (respond) {
                  setPersonalFormData(values);
                  submitApplication(values, insurance.id);
                }
              });
            } else {
              setPersonalFormData(values);
              submitApplication(values);
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Stepper classes={{ root: classes.root }}
                className="stepper"
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
                <Button type="submit" variant="contained" color="primary" disabled={isLoading || isSubmitting} className={classes.nextButton}>
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

export default Personal
