import { MONTH_NUMBER_MAP } from "../config/constants";

export const formatDateForUI = (date:string) => {
    const [year, month, day] = date.split('-');
    return `${day} ${MONTH_NUMBER_MAP[parseInt(month)-1].name}, ${year}`;
}

export const formatAmountForUI = (amount: number) => {
    const absAmount = Math.abs(amount);
    if(absAmount>=1000 && absAmount <100000) {
        return `${(amount/1000).toFixed(1)}K`;
    }

    if(absAmount >= 100000 && absAmount <10000000) {
        return `${(amount/100000).toFixed(1)}L`;
    }

    if(absAmount>=10000000) {
        return `${(amount/10000000).toFixed(1)} Cr`;
    }

    return amount;
}