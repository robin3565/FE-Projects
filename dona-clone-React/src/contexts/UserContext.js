import React, { createContext, useContext, useEffect, useState } from 'react'

const UserContext = createContext();

export const useUserState = () => {
    return useContext(UserContext);
}

const init = ""

export const UserProvider = ({ children }) => {
    const [userName, setUserName] = useState(init);

    useEffect(() => {
        if(JSON.parse(localStorage.getItem('userName'))) setUserName(JSON.parse(localStorage.getItem('userName')))
    }, []);


    useEffect(() => {
        if (userName !== init) localStorage.setItem("userName", JSON.stringify(userName));
    }, [userName])

    return (
        <UserContext.Provider value={{ userName, setUserName }}>
            {children}
        </UserContext.Provider>
    )
}