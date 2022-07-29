import React, { useEffect, useState, useRef } from 'react';
import Webcam from "react-webcam";
import Dialog from '@material-ui/core/Dialog';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import CameraIcon from "@material-ui/icons/Camera";
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles({
  iconImg: {
    height: "100%",
    width: "100%",
    padding: "10px",
  },
  input: {
    display: 'none',
  },
  dialogCamera: {
    lineHeight: "0px"
  },
  cameraButton: {
    background: "white",
    position: "absolute",
    bottom: "5%",
    outline: "none",
    left: "50%",
    marginLeft: "-20px",
    border: "solid"
  }
});

const Camera = ({ getImage, facingMode = 'environment' }) => {

  const classes = useStyles();
  const webcamRef = useRef(null);
  const [openModelBox, setModelBox] = useState(true);
  const [hasUserMedia, setUserMedia] = useState(null);

  useEffect(() => {
    // alert(window.location.href)
    let videoConstraint = { video: true, audio: false }
    if (facingMode === 'environment') videoConstraint.video = { facingMode: 'environment' };

    async function requestCameraPermission() {

      if (!isMiui()) { // bypass MiUIbrowser
        window.stream = await navigator.mediaDevices.getUserMedia(videoConstraint).catch(err => console.log('webcam error', err));
      }

      return (window.stream) ? setUserMedia(true) : setUserMedia(false)
    }
    requestCameraPermission();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleImage = async (e) => {
    e.preventDefault();
    if (hasUserMedia) {
      const screenShot = webcamRef.current.getScreenshot();
      window.stream.getTracks().forEach(track => track.stop());
      getImage(screenShot)
      setModelBox(false)
    } else {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      fileReader.onload = (e) => {
        getImage(e.target.result)
      };
    }
  }

  if (hasUserMedia === null) {
    return (
      <div>
        <Skeleton variant="rect" width={250} height={150} />
        <Skeleton variant="text" width={250} />
        <Skeleton variant="text" width={250} />
      </div>
    );
  }

  return (
    <>
      {hasUserMedia ?
        <>
          <Dialog
            className={classes.dialogCamera}
            scroll="body"
            open={openModelBox}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              width="100%"
              height="100%"
              videoConstraints={{
                facingMode: { ideal: facingMode }
              }} />
            <IconButton
              className={classes.cameraButton}
              onClick={handleImage}>
              <CameraIcon />
            </IconButton>
          </Dialog>
        </>
        : <>
          <input
            accept="image/*"
            capture="camera"
            className={classes.input}
            id="contained-button-file"
            onChange={handleImage}
            type="file" />

          <label htmlFor="contained-button-file">
            <IconButton
              color="primary"
              component="span"
              className="iconBtn">
              <ImageSearchIcon className={classes.iconImg} color="disabled" />
            </IconButton>
          </label>
        </>
      }
    </>
  )
}

function isMiui() {
  const ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MiuiBrowser/i)) return true;
  return false;
}

export default Camera;