import React from 'react'

const TableMessages = ({ message }) => {
    return (
        <div className='h-64 flex justify-center items-center'>
            <h3 className='text-3xl font-semibold'>{message}</h3>
        </div>
    )
}

export default TableMessages