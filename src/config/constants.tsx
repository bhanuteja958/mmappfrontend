import {barChart, cash, person} from 'ionicons/icons';

export const HOME_TABS = [
    {
        key: 'dashboard',
        displayName: 'Dashboard',
        icon: barChart
    },
    {
        key: 'transactions',
        displayName: 'Transactions',
        icon: cash
    },
    {
        key: 'account',
        displayName: 'Account',
        icon: person
    }
];

export const MONEY_STATS = [
    {
        backendKey: 'expenses',
        displayName: 'Expenses',
    },
    {
        backendKey: 'income',
        displayName: 'Income'
    },
    {
        backendKey: 'balance',
        displayName: 'Balance'
    }
];

export const PAYMENT_AGGREGATIONS = [
    {
        backendKey: 'creditCard',
        displayName: 'Credit Card',
    },
    {
        backendKey: 'debitCard',
        displayName: 'Debit Card',
    },
    {
        backendKey: 'upi',
        displayName: 'UPI',
    },
    {
        backendKey: 'cash',
        displayName: 'Cash',   
    }
]