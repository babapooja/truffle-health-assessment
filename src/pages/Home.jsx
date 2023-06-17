import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { getBillDetails } from '../lib/service';
import Table from '../components/Table';

const Home = () => {

  const [billData, setBillData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBillDetails('/bills')
      .then(({ data }) => {
        setBillData(data)
        setTimeout(() => setLoading(false), 2000)
      })
      .catch((err) => console.error(err))
  }, [])

  return (
    <div className='flex items-center flex-col'>

      <h3 className='text-2xl underline mb-5'>Bills Entered by users</h3>
      <Table data={billData} loading={loading} />

      <Link to='/input-form/create' className='text-pink-500 text-lg mt-10 
      hover:font-semibold transition ease-in-out'>Add New Bill Details</Link>
    </div>
  )
}

export default Home