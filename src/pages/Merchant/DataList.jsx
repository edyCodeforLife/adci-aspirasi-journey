import React, { useState, useEffect } from "react";
import useTranslation from "../../utils/i18n/translations";
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Snackbar from '@material-ui/core/Snackbar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import PropTypes from 'prop-types';
import { dataListStyle } from './styles';
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles({
  text: {
    marginTop: 10,
    marginBottom: 10
  },
  bodyFont: {
    marginTop: 1000,
    fontFamily: "Raleway",
    fontSize: 1000000
  }
});

const filteringTitle = (title, data) => {
  const copTitle = [...title];
  if (data.statusCode === "6") {
    return copTitle;
  } else {
    return copTitle.splice(title.length - 2, 2);
  }
}

const DataList = (props) => {

  const { data, datas, title, collapseTitle, setPostRegistration } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [isSnack, setSnack] = useState(false);
  // const [VA, setVA] = useState([]);

  const handleCopied = (val) => {
    // console.log("isi val "+val)
    handleSnack();
    navigator.clipboard.writeText(val)
  }

  const handleSnack = () => {
    setSnack(!isSnack);
  }

  const handleClick = () => {
    setOpen(!open);
  };

  function generateListData(index) {
    let tempStoreString = [];
    
    if (Array.isArray(data[index])) {
      // console.log("iiii "+JSON.stringify(data[index]));
      var tempArr = data[index];
      let storeVal;

      tempArr.forEach(val=> {
        tempStoreString.push(
          <div style={{ alignSelf: 'center', height: 'fit-content' }}>
            <ListItemText
              style={{ alignSelf: 'center', display: 'inline-flex' }}
              primaryTypographyProps={{ style: dataListStyle.primaryRight }}
              secondaryTypographyProps={{ style: dataListStyle.secondary }}
              key={val+"asas"} edge="end"
              primary={val["virtualAccount"] + " - " + val["bankName"]}
            />
            <IconButton className={dataListStyle.copyButton}
              onClick={() => handleCopied(val["virtualAccount"])} style={{ color: 'red' }}
            >
              <FileCopyIcon />
            </IconButton>
          </div>)
      });

      return (
        <div style={{ flex: '1 1 auto', flexDirection: 'row', flexWrap: 'wrap', float: 'right', height: '100%' }}>
          {
            tempStoreString
          }
        </div>
      );
      
    } else {
      return (
        <ListItemText
          primaryTypographyProps={{ style: dataListStyle.primaryRight }}
          secondaryTypographyProps={{ style: dataListStyle.secondary }}
          key={index + data[index] + "lis" + index} edge="end"
          primary={data[index]}
        />
      );
    }
  }

  const addCopyText = (val, varu, index) => {

    const validFilter = ["remainingAmount"];

    let data = validFilter.find((el) => el === varu) ?
      <div style={{ display: 'inline-flex' }}>
        <ListItemText style={{ alignSelf: 'center' }} key={varu + index + "lis" + index}
          primaryTypographyProps={{ style: dataListStyle.primary }}
          secondaryTypographyProps={{ style: dataListStyle.secondary }}
          edge="end" primary={val[varu]} />
        <IconButton
          onClick={() => handleCopied(val[varu])} style={{ color: 'red' }}
        >
          <FileCopyIcon />
        </IconButton>
      </div> :
      <ListItemText key={varu + index + "lis" + index}
        primaryTypographyProps={{ style: dataListStyle.primary }}
        secondaryTypographyProps={{ style: dataListStyle.secondary }}
        edge="end" primary={val[varu]} />

    return (
      data
    )
  }

  const i18n = useTranslation();

  const splitTitle = (word, type) => {
    if (type == 0) {
      if (word.includes(".")) {
        let dot = word.indexOf(".");
        let temp = word.substring(0, dot);
        return temp;
      } else {
        return word;
      }
    } else {
      if (word.includes(".")) {
        let dot = word.indexOf(".");
        let temp = word.substring(dot + 1, word.length);
        return temp;
      }
    }
  }

  const filterCopyButton = (data) => {
    const validFilter = ["virtualAccount"];

    if (validFilter.find((el) => el === data)) {
      return {
        height: '90px',
        width: '120px'
      }
    } else {
      return {
        height: 'fit-content'
      }
    }
  }

  const generatorData = () => {
    if (datas) {
      var temp = [];
      datas.length == 0 ? temp.push(<p className={classes.text}>{i18n["NoDataAvailable"]}</p>) :
        datas.map((val, index) => {
          title.map((varu, indeks) =>
            temp.push(<div>
              <List component='li' disablePadding key={index}>
                <ListItem key={varu + index + "li" + index}>
                  <ListItemText
                    classes={{
                      body1: classes.bodyFont
                    }}
                    primaryTypographyProps={{ style: dataListStyle.primary }}
                    secondaryTypographyProps={{ style: dataListStyle.secondary }}
                    key={varu + index + "lit" + index} primary={i18n[varu]} />
                  <ListItemSecondaryAction>
                    {
                      addCopyText(val, varu,)
                    }
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>)
          )
          temp.push(<Divider />);
        })
      return temp;
    } else {
      return title.map((val, index) =>
        <div>
          <List component='li' disablePadding key={index}>
            {/* {console.log("nilai val " + val)} */}
            <ListItem style={filterCopyButton(val)} alignItems="flex-start" key={val + data[index] + "li" + index}>
              <ListItemText key={val + index + "lit" + index}
                primaryTypographyProps={{ style: dataListStyle.primary }}
                secondaryTypographyProps={{ style: dataListStyle.secondary }}
                primary={i18n["" + splitTitle(val, 0)]} secondary={i18n["" + splitTitle(val, 1)]} />
              <ListItemSecondaryAction>
                {
                    generateListData(index)
                }
                {/* <ListItemText
                  primaryTypographyProps={{ style: dataListStyle.primary }}
                  secondaryTypographyProps={{ style: dataListStyle.secondary }}
                  key={val + data[index] + "lis" + index} edge="end"
                // primary={data[index]} 
                /> */}
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Snackbar
            open={isSnack}
            autoHideDuration={750}
            onClose={handleSnack}
            message="Text Succesfully Copied"
          />
          <Divider />
        </div>
      )
    }
  }

  return (
    <div>
      {
        collapseTitle != null ?
          <ListItem button key="1" onClick={handleClick}>
            <ListItemText primary={i18n[collapseTitle]} />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem> : null
      }
      {
        collapseTitle != null ?
          <Collapse
            key="3"
            in={open}
            timeout='auto'
            unmountOnExit
          >
            {
              generatorData()
            }
          </Collapse> :
          generatorData()
      }

      <Divider />
    </div>
  )
}

DataList.propTypes = {
  filteringTitle: PropTypes.func
};

export default (DataList)