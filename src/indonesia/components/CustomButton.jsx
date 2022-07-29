import React, {useState, useRef} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
// import useStateWithCallback from 'use-state-with-callback';

const useStyles = makeStyles({
  root: {
    background: (props) =>
      props.color === "red"
        ? "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"
        : "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: (props) =>
      props.color === "red"
        ? "0 3px 5px 2px rgba(255, 105, 135, .3)"
        : "0 3px 5px 2px rgba(33, 203, 243, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
    margin: 8
  },
  blank: {
      fontFamily: "Raleway",
      fontSize: "12px",
    background: (props) => props.isClicked? "rgba(240, 61, 61, 1)" : "#FFFFFF",
  border: "1px solid #C4C4C4",
  borderRadius: "34px",
  boxSizing: "border-box",
//   boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "#464646",
  height: 48,
  padding: "8px 16px",
  margin: "0px 12px 12px 0px",
  "&:hover": {
    boxShadow: "none",
    background: "rgba(240, 61, 61, 1)",
    color: "#FFFFFF"
  }
  },
  // clicked:{
  //   boxShadow: "none",
  //   background: "rgba(240, 61, 61, 1)",
  //   color: "#FFFFFF" 
  // }
});


const CustomButton=(props)=> {
  const { classX, color, ...other } = props;
  const classes = useStyles(props);

  if(classX=="blank")
    return <Button className={classes.blank} {...other} />;
 else
    return <Button className={classes.root} {...other} />;
}

export default CustomButton;