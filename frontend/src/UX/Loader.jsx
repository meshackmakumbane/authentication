import React from 'react'

const Loader = () => {
  return (
    <div className='flex items-center justify-center gap-1.5'>
      <div className='bg-gray-300 h-2.5 w-2.5 rounded-full animate-bounce [animation-delay:-0.36s]'></div>
      <div className='bg-gray-300 h-2.5 w-2.5 rounded-full animate-bounce [animation-delay:-0.16s]'></div>
      <div className='bg-gray-300 h-2.5 w-2.5 rounded-full animate-bounce [animation-delay:0s]'></div>
    </div>
  )
}

export default Loader
