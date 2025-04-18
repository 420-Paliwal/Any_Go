import React, { createContext, useState } from 'react'
export const UserContext = createContext();

const UserContext1 = ( {children}) => {
    const [user, setUser] = useState({
        fullName : {
        userFirstName: '',
        userLastName: ''
        },
        email: '',
        password: '',
    })

  return (
    <UserContext.Provider value={user} >
      {children}
    </UserContext.Provider>
  )
}

export default UserContext1