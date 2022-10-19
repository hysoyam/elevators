import React from "react";
import { useLocalStore } from "mobx-react";
import { createStore } from "./store/store"; 

const FieldContext = React.createContext(null)

export const FieldProvider = ({ children }) => {

    const store = useLocalStore(createStore)

    return <FieldContext.Provider value={store}>
        {children}
    </FieldContext.Provider>
}


export const useStore = () => React.useContext(FieldContext) 