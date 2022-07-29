import React, { useContext, useEffect } from "react";

import styles from '../../indonesia/sass/aspirasi.module.scss';
import useTranslation from "../../utils/i18n/translations";
import DataGrid from './DataGrid';
import { makeStyles } from "@material-ui/core/styles";
import { aspirasiFlags } from '../../helpers/common'
import { StoreContext } from '../../store/context';
import { numberWithCommas, dateFormatter, convertInterestRate } from '../../utils';
import List from '@material-ui/core/List';
import DataList from "./DataList";

const Registration = (props) => {
    const mainBanner = "mainBanner";
    const { isNew, initIndex } = props;
    const { state } = useContext(StoreContext);
    const data = state.aspirasiStates;
    const i18n = useTranslation();

    const mainTitle = [
        "merchantName",
        "distributorName",
        "merchantLimit.InfoLimitGrosir",
        "interestRate",
        "virtualAccount"
    ];

    const titleStatus = [
        "id",
        "statusDesc",
        "principalAmount",
        "remainingAmount",
        "contractDueDate"
    ];

    const filterContract = (data) => {
        var arr = data.filter(function (el) {
            return el.statusCode === "0" || el.statusCode === "1" || el.statusCode === "2" || el.statusCode == "6"
        }
        );
        return arr;
    }

    const filterClosedContract = (data) => {
        var arr = data.filter(function (el) {
            return el.statusCode === "5"
        }
        );
        return arr;
    }

    function setPreRegistration(data, index) {
        var interest = convertInterestRate(data.distributorDetails[index].interestRate);
        const disData = [
            data.merchantName,
            data.distributorDetails[index].distributorName,
            numberWithCommas(data.distributorDetails[index].merchantLimit, "Rp"),
            interest,
            data.virtualAccount
        ];
        return disData;
    }

    function setPostRegistration(data, index) {
        if (data.statusCode === "0" || data.statusCode === "1" || data.statusCode === "2") {
            return [
                data.statusDesc,
                numberWithCommas(data.principalAmount, "Rp"),
                data.remainingAmount == 0 ? "-" : numberWithCommas(data.remainingAmount, "Rp"),
                data.contractDueDate == null ? "-" : dateFormatter(data.contractDueDate),
            ];
        } else {
            return [
                data.statusDesc,
                numberWithCommas(data.principalAmount, "Rp"),
                data.remainingAmount == 0 ? "-" : numberWithCommas(data.remainingAmount, "Rp"),
                data.contractDueDate == null ? "-" : dateFormatter(data.contractDueDate),
            ];
        }
        // return disData;
    }

    function filterTitle(title, data) {
        const copTitle = [...title];
        if (data.statusCode === "6") {
            return copTitle;
        } else {
            return copTitle.splice(0, 2);
        }
    }

    return (
        <div>
            {
                isNew ?
                    <div className={styles.bgWhite}>
                        <img className="page-logo" height="300" src={aspirasiFlags[mainBanner]} alt="logo" />
                        <div className={styles.congratText}>Selamat!</div>
                        <div className={styles.congratText2}>Pengajuan BoostTempo telah disetujui</div>
                    </div> : null
            }
            <div className={styles.bgWhites}>
                {
                    // data.distributorDetails.map((val, index)=>
                    // <DataGrid data={setPreRegistration(data, initIndex)} title={generateTitle(mainTitle, isNew)} />
                    <div>
                        <List component='nav' aria-labelledby='nested-list-subheader'>
                            {
                                    <DataList key={mainTitle[0]} title={mainTitle} data={setPreRegistration(data, initIndex)} />
                            }
                        </List>
                    </div>
                    // )
                }
            </div>
            {
                isNew ? null :
                    <div>
                        <List component='nav' aria-labelledby='nested-list-subheader'>
                            {
                                <DataList key="list-is-new" collapseTitle="currentStatus" title={titleStatus}
                                    datas={filterContract(data.contractDetailList)}
                                    setPostRegistration={setPostRegistration} />
                            }
                        </List>
                        <List component='nav' aria-labelledby='nested-list-subheader'>
                            {
                                <DataList key="list-is-new-2" collapseTitle="boostTempoHistory" title={titleStatus}
                                    datas={filterClosedContract(data.contractDetailList)}
                                    setPostRegistration={setPostRegistration}
                                />
                            }
                        </List>
                    </div>
                // <div>
                //     <p className={styles.textStats}>{i18n["currentStatus"]}</p>
                //     <div>
                //         {
                //             filterContract(data.contractDetailList).map((val, index) =>
                //                 <DataGrid key={index + 11} number={index} numbered={true} data={setPostRegistration(val, index)} title={filterTitle(titleStatus, val, index)} />
                //             )
                //         }
                //     </div>
                // </div>
            }

        </div>
    );
}

export default Registration;