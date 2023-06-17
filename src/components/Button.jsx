import React from 'react'

const Button = ({ btnLabel, onClick }) => {
  return (
    <button
      onClick={onClick}
      className='uppercase outline-none cursor-pointer border-2 bg-pink-500 px-5 py-3 w-auto font-semibold text-white
    hover:scale-105 hover:transition-transform ease-in delay-75'>{btnLabel}</button>
  )
}

export default Button