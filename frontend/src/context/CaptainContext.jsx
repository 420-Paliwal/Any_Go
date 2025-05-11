import React, { createContext, useState, useContext } from 'react';

// Create the context
export const CaptainDataContext = createContext();

// Create a provider component
const CaptainContext = ({ children }) => {
    const [captain, setCaptain] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
     
    const updateCaptain = async (captainData) => {
        setCaptain(captainData);
    }

    const value = {
        captain,
        setCaptain,
        loading,
        setLoading,
        error,
        setError,
    }
    return (
        <CaptainDataContext.Provider value={{ captain, setCaptain }}>
            {children}
        </CaptainDataContext.Provider>
    );
};

// Custom hook to use the CaptainContext
export const useCaptain = () => {
    const context = useContext(CaptainContext);
    if (!context) {
        throw new Error('useCaptain must be used within a CaptainProvider');
    }
    return context;
};

export default CaptainContext;