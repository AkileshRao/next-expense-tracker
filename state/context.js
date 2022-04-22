import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    let [itemPageMode, setItemPageMode] = useState("CREATE");
    let [currentItem, setCurrentItem] = useState({});

    return (
        <AppContext.Provider value={{ itemPageMode, setItemPageMode, currentItem, setCurrentItem }}>
            {children}
        </AppContext.Provider>
    );
}

export { AppContext, AppContextProvider };