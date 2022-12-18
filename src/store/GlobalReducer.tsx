import React, {ReducerAction} from 'react';

export const initialState = {
    isLoggedIn: false,
    userDetails: {}
}

export const GlobalReducer = (state:any = initialState, action:any) => {
    switch(action.type){
        case 'LOGIN':
            return {...state, isLoggedIn:true, userDetails:action.payload};
        case 'LOGOUT':
            return initialState;
        default:
            console.error('no such action exists')
    }
}