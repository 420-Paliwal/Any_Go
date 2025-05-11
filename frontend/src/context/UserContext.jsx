import React, { createContext, useState } from 'react'
export const UserDataContext = createContext();

const UserContext = ( {children}) => {
    const [user, setUser] = useState({
        fullName : {
        userFirstName: '',
        userLastName: ''
        },
        email: '',
        password: '',
    })

  return (
    <UserDataContext.Provider value={{user , setUser}} >
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext