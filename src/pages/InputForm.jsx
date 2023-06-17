import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { useNavigate, useParams } from 'react-router-dom'
import { submitBillDetails, getBillDetails, updateBillDetails } from '../lib/service'
import TableMessages from '../components/TableMessages'
import NavBar from '../components/NavBar'

const InputForm = () => {

  const { mode, id } = useParams();
  const navigate = useNavigate();
  const allowedImageExtensions = "image/jpeg, image/jpg, image/JPG, image/JPEG, image/PNG, image/png";
  const [imageError, setImageError] = useState('');
  const [error, setError] = useState('');
  const MIN_FILE_SIZE = 512
  const MAX_FILE_SIZE = 15360
  const formData = {
    fname: '',
    lname: '',
    hospital_name: '',
    street_address_1: '',
    street_address_2: '',
    zip: '',
    county: '',
    city: '',
    state: '',
    bill_amount: 0,
    bill_image: ''
  }
  const [loading, setLoading] = useState(false);
  const [patientBillData, setPatientBillData] = useState({});

  // eslint-disable-next-line 
  useEffect(() => {
    const checkModeAndInitializeData = () => {
      switch (mode) {
        case 'edit': {
          setLoading(true)
          fetchDetailsById();
          break;
        }
        case 'create': {
          setPatientBillData(formData);
          break;
        }
        default: {
          setPatientBillData(formData)
        }
      }
    }
    checkModeAndInitializeData();
    // eslint-disable-next-line 
  }, [mode])

  const fetchDetailsById = () => {
    getBillDetails(`/bills/${id}`)
      .then(({ data }) => {
        setPatientBillData(data);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch((err) => {
        setLoading(false);
        setError('Something went wrong. Please try again.')
      })
  }

  const isDisabled = () => {
    if (patientBillData.hasOwnProperty('fname')) {
      return (patientBillData.bill_amount === 0 || patientBillData.city.trim() === ''
        || patientBillData.fname.trim() === '' || patientBillData.lname.trim() === '' ||
        patientBillData.street_address_1.trim() === '' || patientBillData.state.trim() === '' ||
        patientBillData.zip.trim() === '' || patientBillData.hospital_name.trim() === '')
    }
    return true;
  }

  const formSubmit = () => {
    switch (mode) {
      case 'create':
      default: {
        if (!patientBillData.hasOwnProperty('bill_image')) {
          setPatientBillData({ ...patientBillData, 'bill_image': '' });
        }
        submitBillDetails('/bills', patientBillData)
          .then(() => {
            navigate('/')
          })
          .catch(err => {
            console.log(err)
            setError("Something went wrong. Please try again later.");
          })
        break;
      }
      case 'edit': {
        updateBillDetails(`/bills/${id}`, patientBillData)
          .then(() => navigate('/'))
          .catch(err => {
            console.log(err)
            setError("Something went wrong. Please try again later.");
          })
      }
    }
  }

  const onInputChange = (field, value) => {
    var tempD = { ...patientBillData }
    if (field === 'bill_amount') {
      tempD[field] = parseInt(value);
    } else {
      tempD[field] = value;
    }

    setPatientBillData({ ...tempD });
    setError("")
  }

  const uploadImage = (e) => {
    setImageError("")
    if (e.target.files[0].size / 1024 >= MIN_FILE_SIZE && e.target.files[0].size / 1024 <= MAX_FILE_SIZE) {
      setPatientBillData({ ...patientBillData, bill_image: e.target.files[0].name })
    } else {
      setImageError("Image size is beyond the limits.")
    }
  }


  return (
    <>
      <NavBar />
      <div className='flex flex-col w-full items-center'>
        {(imageError || error) !== '' && <h3 className='text-center mb-3 font-medium text-red-600'>{imageError}</h3>}

        {
          loading ? <TableMessages message={`Loading details for id: ${id}`} />
            :
            <form onSubmit={e => e.preventDefault()} className='bg-white w-2/4 border-2 border-gray-500  px-5 py-3 rounded-md shadow-lg shadow-slate-300'>
              <h3 className='text-2xl text-center mb-5 underline'>Input Form</h3>
              <div className='flex gap-10 mb-3'>
                <InputField
                  val={patientBillData.fname}
                  id="fname"
                  placeholder="Enter First Name"
                  label="First Name"
                  type="text"
                  onChange={(e) => onInputChange('fname', e.target.value)}
                  required={true} />
                <InputField
                  val={patientBillData.lname}
                  id="lname"
                  placeholder="Enter Last Name"
                  label="Last Name"
                  type="text"
                  onChange={(e) => onInputChange('lname', e.target.value)}
                  required={true} />
              </div>
              <div className='flex gap-10 mb-3'>
                <InputField
                  val={patientBillData.street_address_1}
                  id="stadd1"
                  placeholder="Enter Street Address 1"
                  label="Street Address 1"
                  onChange={(e) => onInputChange('street_address_1', e.target.value)}
                  type="text" required={true} />
                <InputField
                  val={patientBillData.street_address_2}
                  id="stadd2"
                  placeholder="Enter Street Address 2"
                  label="Street Address 2"
                  onChange={(e) => onInputChange('street_address_2', e.target.value)}
                  type="text" />
              </div>
              <div className='flex gap-10 mb-3'>
                <InputField
                  val={patientBillData.city}
                  id="city"
                  placeholder="Enter City"
                  label="City"
                  type="text"
                  onChange={(e) => onInputChange('city', e.target.value)}
                  required={true} />
                <InputField
                  val={patientBillData.county}
                  id="county"
                  placeholder="Enter County"
                  label="County"
                  type="text"
                  onChange={(e) => onInputChange('county', e.target.value)} />
              </div>
              <div className='flex gap-10 mb-3'>
                <InputField
                  val={patientBillData.zip}
                  id="zip"
                  placeholder="Enter Zip"
                  label="Zip"
                  type="text"
                  onChange={(e) => onInputChange('zip', e.target.value)}
                  required={true} />
                <InputField
                  val={patientBillData.state}
                  id="state"
                  placeholder="Enter State"
                  label="State"
                  type="text"
                  onChange={(e) => onInputChange('state', e.target.value)}
                  required={true} />
              </div>
              <div className='flex gap-10 mb-3'>
                <InputField
                  val={patientBillData.hospital_name}
                  id="hname"
                  placeholder="Enter Hospital Name"
                  label="Hospital Name"
                  type="text"
                  onChange={(e) => onInputChange('hospital_name', e.target.value)}
                  required={true} />
              </div>
              <div className='flex gap-10 mb-5'>
                <InputField
                  val={patientBillData.bill_amount}
                  id="billamt"
                  placeholder="Enter Bill Amount"
                  label="Bill Amount"
                  type="number"
                  onChange={(e) => onInputChange('bill_amount', e.target.value)}
                  min={1}
                  required={true} />
                <InputField
                  displayValue={`${patientBillData.bill_image !== '' ? patientBillData.bill_image : 'No File Chosen'}`}
                  id="billing"
                  label="Upload Bill Image"
                  type="file"
                  error={imageError}
                  accept={allowedImageExtensions}
                  onChange={(e) => uploadImage(e)}
                />
              </div>
              <div className='flex w-full justify-center'>
                <Button btnLabel="Submit" disabled={isDisabled()} onClick={() => formSubmit()} />
              </div>

            </form>
        }
      </div>

    </>

  )
}

export default InputForm