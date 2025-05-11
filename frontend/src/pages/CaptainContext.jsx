import React, { createContext, useContext, useState } from 'react';

const CaptainContext = createContext();

const CaptainProvider = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [erron, setErron] = useState(null)

    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        cpatain,    
        setCaptain,
        isLoading,
        setIsLoading,
        erron,
        setErron,
        updateCaptain,
    }

    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};