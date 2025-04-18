import React, { useState } from 'react'
import caboraImage from '../assets/cabora_captain_image.png'
import { Link } from 'react-router'
import image2 from '../assets/cabora_canva_city.png'
const CaptainLogin = () => {

  const [captainEmail, setCaptainEmail] = useState('')
  const [captainPassword, setCaptainPassword] = useState('')
  const [captainData, setCaptainData] = useState({})

  const submitHandler = async (e) => {
    e.preventDefault()
    setCaptainData({
      email: captainEmail,
      password: captainPassword
    })
  }
  return (
    <div className='h-screen flex flex-col justify-between px-7 py-3'>
      <form onSubmit={(e) => {
        submitHandler(e)
      }
      }>
        <div className="flex h-18 items-center justify-between">
          <img className='w-[20%] p-2' src={caboraImage} alt="" />
          <i>
            <h1 className='text-4xl font-extrabold text-gray-600 opacity-15'>CABORA </h1>
          </i>
        </div>
        <label htmlFor="captainEmail">
          <h3 className='font-bold mt-5'>What's Your Email</h3>
        </label>
        <input
          value={captainEmail}
          onChange={(e) => setCaptainEmail(e.target.value)}
          type="email" id="captainEmail" required placeholder='Enter Your Email' className='w-[100%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100' />
        <label htmlFor="captainPassword">
          <h3 className='font-bold mt-3'>What's Your Password</h3>
        </label>
        <input
          value={captainPassword}
          onChange={(e) => {
            setCaptainPassword(e.target.value)
          }}
          type="password" required id="captainPassword" placeholder='Enter Your Password' className='p-3 my-1 rounded-lg w-[100%] outline-none border-1 border-sky-100' />
        <Link className='font-bold outline-none w-[100%] flex justify-center bg-black text-white border-1 border-sky-100 p-3 my-3 rounded-xl'>Login</Link>
        <div className="flex items-center justify-between">
          <h3 className='font-bold'>Join A Fleet ?</h3>
          <Link to='/captainSignup' className='font-semibold text-sky-500'>Register as a Captain</Link>
        </div>
      </form>
      <div className="h-52  flex items-center justify-between">
        <img src={image2} className='mix-blend-multiply  w-[100%] opacity-60' alt="" />
      </div>
      <div className="">
        <Link to='/userLogin' className='font-bold outline-none flex justify-center w-[100%] bg-[#093a49bd] text-white border-1 border-sky-100 p-3 my-3 rounded-xl'>Login as a  User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin