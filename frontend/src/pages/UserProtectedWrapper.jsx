import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router' 
import { UserDataContext} from '../context/UserContext'
import axios from 'axios'


const UserProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { user, setUser } = React.useContext(UserDataContext)
    const [ isloading, setLoading ] = useState(true)

    useEffect(() => {
        if (!token) {
            navigate('/UserLogin')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        }).then((response) =>{
            if(response.status === 200) {
                setUser(response.data.user)
                setLoading(false)
            }
        })
        .catch((error) => {
            setLoading(false)
            // console.log("res nhi aagya");
            console.log(error)
            localStorage.removeItem('token')
            navigate('/UserLogin')
        })
      
    }, [token])

    if(isloading){
        return (
            <div className='flex justify-center items-center h-screen'>
                <h1 className='text-4xl font-bold text-gray-600'>Loading...</h1>
            </div>
        )
    }

    
    // console.log(token)
  return (
    <>  
      {children}
    </>
  )
}

export default UserProtectedWrapper