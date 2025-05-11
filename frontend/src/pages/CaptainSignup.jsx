import React, { useState } from 'react'
import caboraImage from '../assets/cabora_captain_image.png'
import { Link } from 'react-router'
import image2 from '../assets/cabora_canva_city.png'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainSignup = () => {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userFirstName, setUserFirstName] = useState('')
  const [userLastName, setUserLastName] = useState('')

  const [vehicleColor, setVehicleColor] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehicleType, setVehicleType] = useState('');

  const { captain, setCaptain } = React.useContext(CaptainDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    const captainData = {
      fullname: {
        firstname: userFirstName,
        lastname: userLastName
      },
      email: userEmail,
      password: userPassword,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
    if (response.status === 201) {
      const data = response.data
      console.log(data) 
      setCaptain(data.captain)
      localStorage.setItem('token', data.token)
      navigate('/captain-home')
    }
    setUserFirstName('')
    setUserLastName('')
    setUserEmail('')
    setUserPassword('')
    setVehicleCapacity('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleType('')
  }
  return (
    <div className='h-screen w-screen flex flex-col justify-between px-7 py-3'>
      <form onSubmit={(e) => {
        submitHandler(e)
      }}>
        <div className="flex h-18 items-center justify-between">
          <img className='w-[20%] p-2' src={caboraImage} alt="" />
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

            <label htmlFor="vehicleColor">
            <h3 className='font-bold mt-5'>Vehicle Information</h3>
            </label>
            <input
            required
            value={vehicleColor}
            onChange={(e) => setVehicleColor(e.target.value)}
            type="text"
            id="vehicleColor"
            placeholder="Vehicle Color"
            className='w-[50%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100'
            />
            <input
            required
            value={vehiclePlate}
            onChange={(e) => setVehiclePlate(e.target.value)}
            type="text"
            id="vehiclePlate"
            placeholder="Vehicle Plate"
            className='w-[50%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100'
            />
            <input
            required
            value={vehicleCapacity}
            onChange={(e) => setVehicleCapacity(e.target.value)}
            type="number"
            id="vehicleCapacity"
            placeholder="Vehicle Capacity"
            className='w-[50%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100'
            />
            <select
            required
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            id="vehicleType"
            className='w-[50%] p-3 my-1 rounded-lg outline-none border-1 border-sky-100'
            >
            <option value="" disabled>Select Vehicle Type</option>
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="auto">Auto</option>
            </select>

            <button className='font-bold outline-none w-[100%] flex justify-center bg-black text-white border-1 border-sky-100 p-3 my-3 rounded-xl'>Create Account</button>
            <div className="flex items-center justify-between">
            <h3 className='font-bold'>Already have an account ?</h3>
            <Link to='/captainLogin' className='font-semibold text-sky-500'>Login as a Captain</Link>
            </div>
            </form>
            <div className="flex items-center justify-center ">
            <img src={image2} className='mix-blend-multiply h-[80%] opacity-60' alt="" />
            </div>
      <div className="">
        <p className="text-center font-xs text-[14px] text-gray-700">By signing up, you agree to our <span className='text-sky-500'>Terms of Service</span> and <span className='text-sky-500'>Privacy Policy</span></p>
      </div>
    </div>
  )
}

export default CaptainSignup