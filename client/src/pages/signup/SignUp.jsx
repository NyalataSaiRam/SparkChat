import React, { useState } from 'react';
import GenderCheckBox from './GenderCheckBox';
import { Link } from 'react-router-dom';
import useSignup from '../../hooks/useSignup';

const SingUp = () => {

    const [ inputs, setInputs ] = useState({
        fullname: "",
        username: "",
        password: "",
        confirmPassword: "",
        gender: ""
    });

    const { loading, signup } = useSignup();

    const handleCheckBoxChange = (gender) => {
        setInputs({ ...inputs, gender });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signup(inputs);

    };



    return (
        <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-grey-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-grey-300'>
                    SignUp
                    <span className='text-primary'> SparkChat</span>
                </h1>

                <form onSubmit={handleSubmit}>
                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Full name</span>
                        </label>
                        <input type="text" placeholder='Harry Potter' className='w-full input input-bordered h-10 input-primary' value={inputs.fullname} onChange={(e) => setInputs({ ...inputs, fullname: e.target.value })} />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Username</span>
                        </label>
                        <input type="text" placeholder='Enter username' className='w-full input input-bordered h-10 input-primary' value={inputs.username} onChange={(e) => setInputs({ ...inputs, username: e.target.value })} />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Password</span>
                        </label>
                        <input name="password" type="password" placeholder='Enter password' className='input-primary w-full input input-bordered h-10' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
                    </div>

                    <div>
                        <label className='label p-2'>
                            <span className='text-base label-text'>Confirm Password</span>
                        </label>
                        <input name="confirmPassword" type="password" placeholder='Re-enter password' className='w-full input input-primary input-bordered  h-10' value={inputs.confirmPassword} onChange={(e) => setInputs({ ...inputs, confirmPassword: e.target.value })} />
                    </div>

                    <GenderCheckBox onCheckboxChange={handleCheckBoxChange} selectedGender={inputs.gender} />

                    <Link to="/login" className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>Already have an account?</Link>

                    <div>
                        <button type='submit' className='btn btn-outline btn-primary btn-block btn-sm mt-2'
                            disabled={loading}
                        >{loading ? <span className='loading loading-spinner' /> : "SignUp"}</button>
                    </div>

                </form>

            </div>

        </div>
    );
};

export default SingUp;
