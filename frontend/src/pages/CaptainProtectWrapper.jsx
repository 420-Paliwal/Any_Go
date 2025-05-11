import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router' 
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'

const CaptainProtectedWrapper = ({ children }) => {
    const token = localStorage.getItem('token')
    const navigate = useNavigate()
    const { captain, setCaptain } = React.useContext(CaptainDataContext)
    const [ isloading, setLoading ] = useState(true)
    
    useEffect(() => {
        if (!token) {
            navigate('/CaptainLogin')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        }).then((response) =>{
            if(response.status === 200) {
                setCaptain(response.data.captain)
                setLoading(false)
            }
        })
        .catch((error) => {
            setLoading(false)
            console.log("res nhi aagya");
            console.log(error)
            localStorage.removeItem('token')
            navigate('/CaptainLogin')
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

export default CaptainProtectedWrapper