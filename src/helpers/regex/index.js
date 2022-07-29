import {
    PERCENTAGE_REPLACE_SPACE
} from './types'

export const formatStringByRegex = (value, condition) =>{
    let val = "";
    switch(condition)
    {
        case PERCENTAGE_REPLACE_SPACE:
            val = value.replace(/[%]/g, ' ');
        break;
        default:
            val = value;
    }
    return val;
}

export const formatToSpace = (value)=>{
    let str = value;
    str.replace(/%20/g, " ");
    return decodeURI(str);
}

// export default formatStringByRegex;