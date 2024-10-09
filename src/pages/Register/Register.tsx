// src/pages/Register.tsx

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import YOUR_IMAGE from '../../assets/Login&Register.jpg';
import LOGO from '../../assets/LogoCourseApp.png';
import RegisterStudent from '../../components/RegisterStudent/RegisterStudent';
import RegisterInstructor from '../../components/RegisterIntructor/RegisterIntructor';

const Register = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState<'student' | 'instructor'>('student');

    const handleRegisterSuccess = () => {
        navigate('/login'); 
    };

    return (
        <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#330933] to-white-600 relative">
            <div className='flex w-full max-w-[1200px] shadow-2xl'>
                <div className='hidden md:flex w-1/2 shadow-2xl'>
                    <img src={YOUR_IMAGE} alt="Description of image" className="w-full h-full object-cover shadow-xl rounded-l-lg" />
                </div>

                <div className='w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl'>
                    <h1 className='text-3xl text-black font-semibold mb-4 flex items-center'>
                        <img src={LOGO} alt="Logo" className="h-9 mr-3" />
                        F-Learning
                    </h1>
                    <div className='w-full flex flex-col mb-4'>
                        <h3 className='text-xl font-semibold mb-2'>Hello Friends</h3>
                        <p className='text-base mb-2'>Please! Register with your account</p>
                    </div>

                    <div className="flex justify-around my-4">
                        <button
                            onClick={() => setUserType('student')}
                            className={`border rounded-lg px-4 py-2 ${userType === 'student' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Student
                        </button>
                        <button
                            onClick={() => setUserType('instructor')}
                            className={`border rounded-lg px-4 py-2 ${userType === 'instructor' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Instructor
                        </button>
                    </div>

                    {userType === 'student' && <RegisterStudent onRegisterSuccess={handleRegisterSuccess} />}
                    {userType === 'instructor' && <RegisterInstructor onRegisterSuccess={handleRegisterSuccess} />}

                    <div className="w-full flex flex-col justify-between h-full">
                        <div className='w-full flex items-center justify-center mt-auto'>
                            <p className='text-sm font-normal text-black mt-20'>
                                Already have an account?
                                <span
                                    className='font-semibold underline underline-offset-2 cursor-pointer'
                                    onClick={() => navigate('/login')}
                                >
                                    Log in
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
