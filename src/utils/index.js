import moment from 'moment';
import { useLocation } from "react-router-dom";

export const generateRandomID = () => parseInt(Date.now() + ((Math.random() * 100000).toFixed()));

export const currencyFormatter = (currency) => {
  return new Intl.NumberFormat(['id'], {
    currency: 'IDR',
  }).format(currency.replace(/[^0-9]/g, ''));
}

export const toNumber = (value) => {
  if (typeof value === "undefined") return 0;
  return parseInt(value.toString().replace(/\./g, ""))
}

export const checkAmountInput = (amountInput) => {
  if(amountInput!="null")
  {
    return true;
  }else{
    return false;
  }
}

export const getDurationUnit = (timeUnit) => {
  switch (timeUnit) {
    case 1:
      return "Mingguan";
    case 2:
      return "Bulanan";
    case 3:
      return "Bulan";
    case 4:
      return "Harian";
    default:
      return "";
  }
}

export const isMiui = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MiuiBrowser/i)) return true;
  return false;
}

export const getUrlParam = (variable) => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return (false);
}

// export const getUrlParam = (param)=>{
//     return new URLSearchParams(useLocation().search)
// }

export const numberWithCommas = (number, currency) => {
  return currency + " " + number.toLocaleString();
}

export const dateFormatter = (dates) => {
  var dateObj = new Date(dates);
  var momentObj = moment(dateObj);
  var momentString = momentObj.format('DD/MM/YYYY'); // 2016-07-15
  return momentString;
}

export function convertInterestRate(data) {
  var temp = "";
  for (var i = 0; i < data.length; i++) {
      if (i == data.length - 1) {
          temp += data[i] + "%"
      }
      else {
          temp += data[i] + "%, "
      }

  }
  return temp;
}