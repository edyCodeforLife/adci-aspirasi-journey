import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {StoreContext} from '../../store/context';


export default function GeneralModal(props) {
  const title = props.data.dialogTitle;
  const content = props.data.dialogContent;
  const {actions, state} = useContext(StoreContext);
  const open = state.generalStates.isVerifyCodeFailureDialogShow;

  const handleClose = () => {
    actions.generalActions.setVerifyCodeFailureDialog({ show: false});  
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button> */}
          <Button onClick={handleClose} color="primary" style={{outline: "none"}}>
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}