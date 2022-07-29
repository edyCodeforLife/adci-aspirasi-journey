import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  stepLabel: {
    textAlign: 'left',
    fontSize: '18px',
    fontWeight: "bold !important",
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