import React from "react";
import Grid from "@material-ui/core/Grid";
import styles from '../../indonesia/sass/aspirasi.module.scss';
import useTranslation from "../../utils/i18n/translations";

const DataGrid = (props) => {

    const {data, title, number, numbered} = props;

    const i18n = useTranslation();

    return(
        <div>
            {numbered?<div className={styles.loanTextBg}>Loan {number+1}</div>:null}
            <div className={styles.bgWhites}>
            {
                title.map((val,index)=>
                <Grid className={styles.gridData} container justifyContent={"space-between"}>
                    <Grid item>
                        {i18n[val]}
                    </Grid>
                    <div>
                    {
                        generateGridList(data, index)
                    }
                {/* <Grid className={styles.gridItem2} item>
                        {data[index]}
                </Grid> */}
                </div>
                </Grid>
                )
            }
            </div>
        </div>
    );
}

function generateGridList(data, index){
    if(Array.isArray(data[index]))
    {
        var tempArr = data[index];
        var temp = [];
            for(var x=0; x<tempArr.length; x++)
            {
                temp.push(
                    <Grid className={styles.gridItem2} item>
                       {tempArr[x]["virtualAccount"] +" - "+ tempArr[x]["bankName"]}
                   </Grid>  
                   )
           
            }
            return temp;
    }else{
        return (
                 <Grid className={styles.gridItem2} item>
                        {data[index]}
                </Grid>    
        );
    }

}

export default DataGrid;