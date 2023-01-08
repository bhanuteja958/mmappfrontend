import { CREATE_TRANSACTION, DELETE_TRANSACTION, GET_TRANSACTIONS, LOGIN_USER, LOGOUT_USER, REGISTER_USER, SERVER_URL, TRANSACTION_AGGREGATIONS, TRANSACTION_STATIC_DATA } from "../config/server";

export const login = async (username:string, password:string) => {
    const payload = {
        username,
        password
    };
    return await fetch(SERVER_URL + LOGIN_USER, {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": 'application/json'
        }
    }).then((res) => res.json());
};

export const logout = async (authToken: string) => {
    return await fetch(SERVER_URL + LOGOUT_USER , {
        method: 'POST',
        headers: {
            Authorization: `Token ${authToken}`
        }
    }).then((res) => res.json()); 
};

export const register = async (username: string, email: string, password: string) => {
    const payload = {
        username,
        email,
        password
    };
    return await fetch(SERVER_URL + REGISTER_USER, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}

export const getTransactionsForAMonth = async (month:number, year:number, authToken:string) => {
    return await fetch(SERVER_URL + GET_TRANSACTIONS + `${month}/${year}/`,{
        method: 'GET',
        headers: {
            Authorization: `Token ${authToken}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json());
}

export const createTransaction = async(amount: number, category: string, mode: string, type:string, description:string, authToken: string) => {
    const payload = {
        amount: amount, 
        category_id: category,
        payment_mode_id: mode,
        transaction_type_id: type,
        description,
    }
    return await fetch(SERVER_URL + CREATE_TRANSACTION, {
        method: 'POST',
        body:JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${authToken}`,
        }
           
    }).then((res) => res.json());
}

export const deleteTransaction = async (transactionId: string, authToken:string) => {
    return await fetch(SERVER_URL + DELETE_TRANSACTION + `${transactionId}/` ,{
        method: 'DELETE',
        headers: {
            Authorization: `Token ${authToken}`
        }
    }).then((res) => res.json());
}   

export const getTransactionsStaticData = async (authToken:string) => {
    return await fetch(SERVER_URL + TRANSACTION_STATIC_DATA, {
        method: 'GET',
        headers: {
            Authorization: `Token ${authToken}`
        }
    }).then((res) => res.json())
}

export const getTransactionAggregations = async (authToken:string, month:number, year:number) => {
    return await fetch(SERVER_URL + TRANSACTION_AGGREGATIONS +  `${month}/${year}/`, {
        method: 'GET',
        headers: {
            Authorization: `Token ${authToken}`
        }
    }).then((res) => res.json())
}