// server domain
export const SERVER_LOCAL_URL = 'http://127.0.0.1:8000/';
export const SERVER_PROD_URL = 'http://bhanuteja.pythonanywhere.com/'

export const SERVER_URL = SERVER_PROD_URL;


// api base endpoints
export const TRANSACTIONS_BASE_URL = 'api/transactions/';
export const USER_AUTH_BASE_URL = 'api/auth/';

//api individual endpoints
export const LOGIN_USER = USER_AUTH_BASE_URL + 'signin/';
export const LOGOUT_USER = USER_AUTH_BASE_URL + 'signout/';
export const REGISTER_USER = USER_AUTH_BASE_URL + 'register_user/';
export const GET_TRANSACTIONS = TRANSACTIONS_BASE_URL;
export const CREATE_TRANSACTION = TRANSACTIONS_BASE_URL;
export const DELETE_TRANSACTION = TRANSACTIONS_BASE_URL;
export const TRANSACTION_STATIC_DATA = TRANSACTIONS_BASE_URL + 'static_data/'
export const TRANSACTION_AGGREGATIONS = TRANSACTIONS_BASE_URL + 'aggregations/'






