import React from 'react'
import { NavLink } from 'react-router-dom'
import { removeItem } from '../lib/service'

const NavBar = () => {
    return (
        <div className=' text-white w-full bg-pink-500 px-7 py-3 mb-3 flex justify-between'>
            <h2 className="text-2xl font-semibold text-center">Truffle Health Assessment</h2>
            <div className='flex gap-x-10'>
                <NavLink className={navData => navData.isActive ? 'font-bold ' : ''} exact to="/">
                    <p className='text-lg'>Home</p>
                </NavLink>
                <NavLink className={navData => navData.isActive ? 'font-bold' : ''} to="/input-form/create">
                    <p className='text-lg'>New Details</p>
                </NavLink>
                <NavLink to="/login" onClick={() => removeItem('username')}>
                    <p className='text-lg'>Logout</p>
                </NavLink>
            </div>

        </div>
    )
}

export default NavBar