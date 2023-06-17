import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getBillDetails } from '../lib/service';
import TableMessages from '../components/TableMessages';
import ImageModal from '../components/ImageModal';
import NavBar from '../components/NavBar';
const Details = () => {
  const { id } = useParams();
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [displayModal, setDisplayModal] = useState(false);

  useEffect(() => {
    getBillDetails(`/bills/${id}`)
      .then(({ data }) => {
        setDetails(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        setError(true)
      })
  }, [id]);

  return (
    <>
    {/* all the details */}
    <NavBar/>
      <div className='flex flex-col items-center h-[calc(100vh-5rem)]'>
        <h3 className='text-3xl'>Details Page</h3>
        {error ? (<TableMessages message="Something went wrong. Please try again later" />) :

          loading ? (<TableMessages message={`Loading data for id : ${id}`} />) :
            (<div className='flex border rounded-md w-1/3 justify-center flex-col mt-5'>
              {/* patient details */}
              <div className='px-7 py-5'>
                <h3 className='text-lg font-medium mb-2 underline'>Patient Details</h3>
                <div className='flex'>
                  <div className='flex mb-2 mr-5'>
                    <p className='mr-2 font-medium'>First Name: </p>
                    <span>{details.fname}</span>
                  </div>
                  <div className='flex'>
                    <p className='mr-2 font-medium'>Last Name: </p>
                    <span>{details.lname}</span>
                  </div>
                </div>
                <div className='flex'>
                  <p className='mr-2 font-medium'>Address: </p>
                  <span className='flex-wrap'>{`${details.street_address_1}, ${details.street_address_2 ? details.street_address_2 + ', ' : ' '} ${details.city},     
                ${details.county ? details.county + ', ' : ' '}
                ${details.state}, ${details.zip}
                
                `}</span>
                </div>
              </div>

              <div className='h-px bg-gray-300'></div>

              {/* Hospital details */}
              <div className='px-7 py-5'>
                <h3 className='text-lg font-medium mb-2 underline'>Hospital Details</h3>
                <div className='flex justify-between'>
                  <div className='flex mb-2'>
                    <p className='mr-2 font-medium'>Hospital Name: </p>
                    <span>{details.hospital_name}</span>
                  </div>
                </div>
                <div className='flex'>
                  <p className='mr-2 font-medium'>Bill Amount: </p>
                  <span className='flex-wrap'>${details.bill_amount}</span>
                </div>
                <div className='flex'>
                  <p className='mr-2 font-medium'>Bill Image: </p>
                  <img src="/bill_images/614afc3b29e85_218xeudr7qi61__700.jpg" alt="bill" height='auto' width='200' className='cursor-pointer' onClick={() => setDisplayModal(true)} />
                </div>
              </div>


            </div>)
        }
      </div >


        {/* weather to display the image modal or not */}

      {
        displayModal && <ImageModal imgSrc="/bill_images/614afc3b29e85_218xeudr7qi61__700.jpg" onClick={() => setDisplayModal(false)} />
      }


    </>
  )
}

export default Details