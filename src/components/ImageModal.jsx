import React from 'react'
import { MdCancel } from 'react-icons/md'

const ImageModal = ({ imgSrc, onClick }) => {
    return (
        <div className='bg-black-rgba transparent absolute top-0 h-screen  w-full px-7 py-5'>
            <div className='flex w-full justify-end'><MdCancel size={30} color='white' className='cursor-pointer' onClick={onClick} /></div>
            <div className='flex w-full justify-center'>
                <img src={imgSrc} width={500} alt="modal"/>
            </div>
        </div>
    )
}

export default ImageModal