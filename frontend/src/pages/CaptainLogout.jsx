import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {

    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    const response = axios.get(`${import.meta.env.VITE_BASE_URL}/captains/logout`, {
        headers: {
            'Authorization' : `bearer ${token}`
        }
    }).then((response) => {
        if(response.status === 200) {
            localStorage.removeItem('token')
            navigate('/CaptainLogin')
        }
    })
        return (
    <div>CaptainLogout</div>
  )
}

export default CaptainLogout