import React from 'react'
import { FaArrowRight } from "react-icons/fa";
import image1 from '../assets/home_page_logo.png'
import bgImage from '../assets/cabora_bg_image1.png'
// import bgImage from '../assets/bgImage.png'
import { Link } from 'react-router-dom'
const Start = () => {
  return (
    <div>
       <div className="h-screen flex flex-col justify-end px-8" style={{backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
       {/* <img className='h-[74%] w-[100%] mix-blend-multiply' src={image1} alt="loading image" /> */}
        <div className="flex items-center flex-col justify-center h-[22%]">
            <h1 className='font-bold p-4 mt-3 text-center text-xl bg-black rounded-2xl w-[80%] text-white'>WelCome To The CabOra</h1>
            <div className="bg-black flex items-center m-3 rounded-lg w-[80%]">
            <Link to='/userLogin' className='w-[100%] flex items-center p-4 rounded-2xl text-white font-semibold'>Continue
            </Link>
            <i className='text-white text-sm border-1 border-gray-500 rounded-full p-1 mr-3'><FaArrowRight /></i>
            </div>
        </div>

       </div>
    </div>
  )
}

export default Start