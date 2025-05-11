import React, { useState } from 'react'
import caboraImage from '../assets/cabora.png'
import { Link, useNavigate } from 'react-router'
import image2 from '../assets/cabora_canva_city.png'
// import { UserContext } from '../context/UserContext'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios' 

const UserSignup = () => {
  
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userData, setUserData] = useState({})
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')

const navigate = useNavigate();

const {user, setUser} = React.useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const newUser = {
      fullname : {
        firstname: userFirstName,
        lastname: userLastName
      },
      email: userEmail,
      password: userPassword
    }
    // console.log(newUser)
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)
    if(response.status === 201) {
      const data = response.data
      localStorage.setItem('token', data.jwttokrn)
      setUser(data.user)
      navigate('/Homes')
    }

    setUserFirstName('')
    setUserLastName('') 
    setUserEmail('')
    setUserPassword('')
  }
  return (
    <div className='h-screen flex flex-col justify-between px-7 py-3'>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <div className="flex h-18 items-center justify-between">
          <img className='w-[19%] p-1' src={caboraImage} alt="" />
          <i>
            <h1 className='text-4xl font-extrabold text-gray-600 opacity-15'>CABORA </h1>
          </i>
        </div>
        <label htmlFor="userFirstName">
          <h3 className='font-bold mt-5'>What's Your Name</h3>
        </label>
        <div className='flex gap-4'>
          <input
          required value={userFirstName} onChange={(e) => setUserFirstName(e.target.value)}
            type="text" id="userFirstName" placeholder='First Name' className='w-[50%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100' />
          <input
          required value={userLastName} onChange={(e) => setUserLastName(e.target.value)}
            type="text" id="userLastName" placeholder='Last Name' className='w-[50%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100' />
        </div>
        <label htmlFor="userEmail">
          <h3 className='font-bold mt-5'>What's Your Email</h3>
        </label>
        <input
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          type="email" id="userEmail" required placeholder='Enter Your Email' className='w-[100%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100' />
        <label htmlFor="userPassword">
          <h3 className='font-bold mt-3'>What's Your Password</h3>
        </label>
        <input
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value)
          }}
          type="password" required id="userPassword" placeholder='Enter Your Password' className='p-3 my-1 rounded-lg w-[100%] outline-none border-1 border-sky-100' />
        <button className='font-bold outline-none w-[100%] flex justify-center bg-black text-white border-1 border-sky-100 p-3 my-3 rounded-xl'>Create Account</button>
        <div className="flex items-center justify-between">
          <h3 className='font-bold'>Already have an account ?</h3>
          <Link to='/UserLogin' className='font-semibold text-sky-500'>Login as a User</Link>
        </div>
      </form>
      <div className="h-52  flex items-center justify-between">
        <img src={image2} className='mix-blend-multiply  w-[100%] opacity-60' alt="" />
      </div>
      <div className="">
        <p className="text-center font-xs text-gray-700">By signing up, you agree to our <span className='text-sky-500'>Terms of Service</span> and <span className='text-sky-500'>Privacy Policy</span></p>
      </div>
    </div>
  )
}

export default UserSignup