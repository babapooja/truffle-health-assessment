import React, { useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { register } from '../lib/service'
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5'

const Register = () => {
    const loginDetails = {
        email: '',
        fname: '',
        lname: '',
        username: '',
        password: '',
    }
    const [details, setDetails] = useState(loginDetails);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e, field) => {
        setError(false);
        let temp = { ...details }
        temp[field] = e.target.value;
        setDetails({ ...temp });
    }

    const registerToApp = () => {
        setError(false);
        setLoading(true);
        const hashedValue = md5(details.password);
        let temp = { ...details }
        temp['password'] = hashedValue
        
        register('/users', temp)
            .then(() => {
                setLoading(false);
                navigate('/login')
            })
            .catch(err => {
                console.log(err)
                setError(true);
                setLoading(false)
                setDetails(loginDetails);
            })
    }

    return (
        <div className='flex justify-center h-screen items-center'>

            <div className='flex flex-col px-7 py-5 w-1/3 border rounded gap-y-5 shadow-md'>
                <h3 className='underline text-center text-2xl font-medium'>Truffle Health Assessment</h3>
                {loading && <p className='text-center'>Loading...</p>}
                {error && <p className='text-red-600 font-medium text-center'>Something went wrong</p>}
                <InputField
                    label="Username"
                    required={true}
                    val={details.username}
                    onChange={(e) => handleChange(e, 'username')}
                    type="text"
                    placeholder="Enter your username" />
                <div className='flex gap-x-5'>
                    <InputField
                        label="First Name"
                        required={true}
                        val={details.fname}
                        onChange={(e) => handleChange(e, 'fname')}
                        type="text"
                        placeholder="Enter your first name" />
                    <InputField
                        label="Last Name"
                        required={true}
                        val={details.lname}
                        onChange={(e) => handleChange(e, 'lname')}
                        type="text"
                        placeholder="Enter your last name" />
                </div>
                <InputField
                    label="Email"
                    required={true}
                    val={details.email}
                    onChange={(e) => handleChange(e, 'email')}
                    type="email"
                    placeholder="Enter your email" />
                <InputField
                    label="Password"
                    required={true}
                    val={details.password}
                    onChange={(e) => handleChange(e, 'password')}
                    type="password"
                    placeholder="Enter your password" />
                <div className='flex justify-center'>
                    <Button
                        disabled={details.username === '' || details.password === '' || details.email === '' || details.fname === '' || details.lname === ''}
                        btnLabel="Login"
                        onClick={() => registerToApp()}
                    />
                </div>
                <p className='text-center'>Already a member?<Link to="/login" className="text-pink-500 font-medium"> Login here</Link>!</p>
            </div>
        </div>

    )
}

export default Register