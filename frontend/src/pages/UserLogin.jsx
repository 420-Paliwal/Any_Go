import React, { useState } from 'react'
import caboraImage from '../assets/cabora.png'
import { Link } from 'react-router'
import image2 from '../assets/cabora_canva_city.png'
const UserLogin = () => {

  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userData, setUserData] = useState({})

  const  submitHandler = async (e) => {
    e.preventDefault()
    setUserData({
      email: userEmail,
      password: userPassword
}) }
  return (
    <div className='h-screen flex flex-col justify-between px-7 py-3'>
          <form onSubmit={(e) => {
            submitHandler(e)
          }
          }>
            <div className="flex h-18 items-center justify-between">
          <Link to='/'><img className='w-[38%] p-1.5
          mix-blend-multiply' src={caboraImage} alt="" /></Link>  
          <i>
          <h1 className='text-4xl font-extrabold text-gray-600 opacity-15'>CABORA </h1>
            </i> 
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
            <Link className='font-bold outline-none w-[100%] flex justify-center bg-black text-white border-1 border-sky-100 p-3 my-3 rounded-xl'>Login</Link>
            <div className="flex items-center justify-between">
              <h3 className='font-bold'>New Here ?</h3>
              <Link to='/UserSignup' className='font-semibold text-sky-500'>Create New Account</Link>
            </div>
          </form>
            <div className="h-52  flex items-center justify-between">
            <img src={image2} className='mix-blend-multiply w-[100%] opacity-60' alt="" />
            </div>
          <div className="">
          <Link to='/captainLogin' className='font-bold outline-none flex justify-center w-[100%] bg-[#4e0b4ec2] text-white border-1 border-sky-100 p-3 my-3 rounded-xl'>Login as a Captain</Link>
          </div>
    </div>
  )
}

export default UserLogin