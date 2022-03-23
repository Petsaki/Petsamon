import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import notFound_Pikachu from '../images/pikachu_not_found.png'

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    // Note: Το window ακούει πότε ο χρήστης πατάει να πάει πίσω
    window.onpopstate = e => {
      //Note: Πάω τον χρήστη ΔΎΟ σελίδες πίσω
      navigate(-1)
   }
    
  },[window.onpopstate])

  return (
    <div className='flex flex-col justify-center items-center'>
      <p className='text-xl font-semibold'>Page doesn't found.</p>
      <img className='w-96' alt='Not Found Pikachu' src={notFound_Pikachu}/>
      </div>
  )
}

export default NotFound