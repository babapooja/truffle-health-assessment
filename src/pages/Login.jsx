import React, { useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button'
import { login, setItem } from '../lib/service'
import { Link, useNavigate } from 'react-router-dom'
import md5 from 'md5'

const Login = () => {
    const loginDetails = {
        username: '',
        password: '',
    }
    const [details, setDetails] = useState(loginDetails);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e, field) => {
        setError(false);
        if (field === 'username') {
            setDetails({ ...details, username: e.target.value })
        } else {

            setDetails({ ...details, password: e.target.value })
        }
    }

    const loginToApp = () => {
        setError(false);
        setLoading(true);
        const hashedValue = md5(details.password);

        let temp = { ...details }
        temp['password'] = hashedValue;

        login('/users', temp)
            .then(() => {
                setLoading(false);
                setItem('username', details.username);
                navigate('/')

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
                {error && <p className='text-red-600 font-medium text-center'>Invalid Credentials</p>}
                <InputField
                    label="Username"
                    required={true}
                    val={details.username}
                    onChange={(e) => handleChange(e, 'username')}
                    type="text"
                    placeholder="Enter your username" />
                <InputField
                    label="Password"
                    required={true}
                    val={details.password}
                    onChange={(e) => handleChange(e, 'password')}
                    type="password"
                    placeholder="Enter your password" />
                <div className='flex justify-center'>
                    <Button
                        disabled={details.username === '' || details.password === ''}
                        btnLabel="Login"
                        onClick={() => loginToApp()}
                    />
                </div>
                <p className='text-center'>Not registered?
                    <Link to="/register" className="text-pink-500 font-medium"> Register here</Link>!</p>
            </div>
        </div>

    )
}

export default Login