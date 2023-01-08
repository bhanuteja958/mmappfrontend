import {addCircle, airplane, barChart, basketball, bed, book, bus, business, cash, colorFill, eyedrop, home, medkit, person, pizza, recording, shieldCheckmark, shirt, storefront, videocam, wallet} from 'ionicons/icons';

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
        backendKey: 'credit card',
        displayName: 'Credit Card',
    },
    {
        backendKey: 'debit card',
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
];

export const DATE_FILTER_NEEDED_TABS = ['dashboard', 'transactions'];

export const SPINNER_STYLE = 'circles';

export const MIN_TRANSACTION_AMOUNT = 5;

export const MAX_TRANSACTION_AMOUNT = 100000000

export const MONTH_NUMBER_MAP = [
    {
        value: 1,
        name:'January'
    },
    {
        value: 2,
        name:'February'
    },
    {
        value: 3,
        name:'March'
    },
    {
        value: 4,
        name:'April'
    },
    {
        value: 5,
        name:'May'
    },
    {
        value: 6,
        name:'June'
    },
    {
        value: 7,
        name:'July'
    },
    {
        value: 8,
        name:'August'
    },
    {
        value: 9,
        name:'September'
    },
    {
        value: 10,
        name:'October'
    },
    {
        value: 11,
        name:'November'
    },
    {
        value: 12,
        name:'December'
    },
]

export const CATEGORY_ICON_MAPPING: any = {
    food: pizza,
    sports: basketball,
    medical: medkit,
    fuel: colorFill,
    clothes: shirt,
    rent: home,
    transportation: bus,
    groceries: storefront,
    'personal care': eyedrop,
    education: book,
    entertainment: videocam,
    furniture: bed,
    'home maintainance': '',
    travel: airplane,
    insurance: shieldCheckmark,
    investement: business,
    salary: wallet,
    others: addCircle
}