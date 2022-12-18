import React, { createContext } from 'react';

interface GlobalContextInterface {
    state: any
    dispatch: any
}

export const GlobalContext = createContext<GlobalContextInterface>({
    state: {},
    dispatch: () => {return}
});