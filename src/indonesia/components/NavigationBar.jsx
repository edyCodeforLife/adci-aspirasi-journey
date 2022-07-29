import React, {useContext} from 'react';
import {StoreContext} from '../../store/context';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx'
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import StorefrontRoundedIcon from '@material-ui/icons/StorefrontRounded';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import '../sass/navigation-bar.scss';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    top: 22,
  },
  active: {
    '& $line': {
    borderColor: 'red',
    borderBottomStyle: 'none',
//       backgroundImage:
//         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  completed: {
    '& $line': {
    borderBottomStyle: 'none',
    borderColor: 'red'
//       backgroundImage:
//         'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
    },
  },
  line: {
    height: 3,
//     border: 0,
    backgroundColor: '#eaeaf0',
    borderRadius: 1,
    borderBottomStyle: 'dotted'
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundImage:
    'linear-gradient( 315.49deg, rgb(178,2,24) 13.75%, rgb(239,69,57) 86.88%)',
    boxShadow: '0px 2px 4px 0 rgba(0, 0, 0, 0.15)'
  },
  completed: {
    backgroundImage:
      'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
  },
});

const ColorlibStepIcon = props => {
  const classes = useColorlibStepIconStyles();
  const { active, completed } = props;

  const icons = {
    1: <AttachMoneyIcon />,
    2: <StorefrontRoundedIcon />,
    3: <PersonOutlineIcon />,
    4: <VerifiedUserIcon />,
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {icons[String(props.icon)]}
    </div>
  );
}

const NavigationBar = props => {
  // const classes = useStyles();
  const { state } = useContext(StoreContext);
  const steps = ['Keuangan', 'Bisnis', 'Pribadi', 'Verifikasi'];
  
  return (
    <div className="navigation-bar">
      <Stepper alternativeLabel activeStep={state.generalStates.step} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default NavigationBar;


