import React, { useEffect, useState } from 'react'

const Toast = () => {
    const [display,setDisplay] = useState(true);

    // useEffect(()=>{
      
    //   setTimeout(() => setDisplay(false),4000);
    // },[])

  return (
    // Note: Ξέχασα ότι μπορώ να χρησιμοποιήσω τα left right σαν margin! :/
    <div className = {`${display ? 'fixed bg-red-600 z-30 rounded-md shadow-md shadow-slate-500/80 bottom-5 left-3 right-3 sm:left-5 py-2 px-5 sm:w-80 text-white after:content-["✕"] after:absolute after:top-1 after:right-3 after:cursor-pointer' : "hidden" }
        animate-toastAniSM sm:animate-toastAniMD `}
        onClick={()=> setDisplay(false) }>
        <h2 className='text-lg font-semibold'>Error</h2>
        <span>Pokemon can't found.</span>
    </div>
  )
}

export default Toast