import React from 'react'

const Button = ({ btnLabel, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className='uppercase outline-none cursor-pointer border-2 bg-pink-500 px-5 py-3 w-fit font-semibold text-white
    hover:scale-105 hover:transition-transform ease-in delay-75 disabled:opacity-60 disabled:scale-100 disabled:cursor-not-allowed'>
      {btnLabel}
    </button>
  )
}

export default Button