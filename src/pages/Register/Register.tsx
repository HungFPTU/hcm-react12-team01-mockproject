import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, message, Radio } from 'antd';
import * as Yup from 'yup';
import YOUR_IMAGE from '../../assets/Login&Register.jpg';
import LOGO from '../../assets/logo.png';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

interface FormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string().required('Please input your full name!').min(2, 'Name must be at least 2 characters!'),
    email: Yup.string().email('Invalid email!').required('Please input your email!'),
    password: Yup.string().required('Please input your password!').min(8, 'Password must be at least 8 characters!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm password does not match!')
        .required('Please confirm your password!'),
    role: Yup.string().required('Please select your role!'),
});

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleRegister = useCallback(async (values: FormValues) => {
        const { fullName, email, password, role } = values;
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            console.log('Đăng ký tài khoản với:', { fullName, email, role });
            message.success({
                content: 'Register successful! Please check your email to verify your account.',
                duration: 6,
            });

            navigate('/login');
        } catch (error) {
            const firebaseError = error as FirebaseError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                message.error({
                    content: 'This email is already registered. Please use a different email.',
                    duration: 6,
                });
            } else if (firebaseError.code === 'auth/weak-password') {
                message.error('Password is too weak. Please choose a stronger password.');
            } else if (firebaseError.code === 'auth/invalid-email') {
                message.error('Invalid email format. Please enter a valid email address.');
            } else {
                console.error('Error registering:', firebaseError);
                message.error('Registration failed! Please try again.');
            }
        } finally {
            setLoading(false);
        }
    }, [navigate]);

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
                        <div className="flex items-center mb-2">
                            <p className='mr-2'>Please! Register with your account:</p>
                            <Formik
                                initialValues={{
                                    fullName: '',
                                    email: '',
                                    password: '',
                                    confirmPassword: '',
                                    role: 'student', 
                                }}
                                validationSchema={validationSchema}
                                onSubmit={handleRegister}
                            >
                                {({ values, setFieldValue }) => (
                                    <Radio.Group
                                        name="role"
                                        onChange={(e) => setFieldValue('role', e.target.value)}
                                        value={values.role}
                                        className="ml-8" 
                                    >
                                        <Radio value="student" className="text-base">Student</Radio>
                                        <Radio value="instructor" className="text-base">Instructor</Radio>
                                    </Radio.Group>
                                )}
                            </Formik>
                        </div>

                    </div>

                    <Formik
                        initialValues={{
                            fullName: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            role: 'student', 
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        {({ handleChange, handleBlur, values }) => (
                            <Form className='w-full flex flex-col' noValidate>
                                <div className="relative mb-1 ">
                                    <Field
                                        as={Input}
                                        name="fullName"
                                        type="text"
                                        placeholder="Full Name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.fullName}
                                    />
                                    <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm absolute -bottom-5" />
                                </div>

                                <div className="relative my-4">
                                    <Field
                                        as={Input}
                                        name="email"
                                        type="email"
                                        placeholder="Email"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.email}
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm absolute -bottom-5" />
                                </div>

                                <div className="relative my-1">
                                    <Field
                                        as={Input.Password}
                                        name="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <ErrorMessage name="password" component="div" className="text-red-500 text-sm absolute -bottom-5" />
                                </div>

                                <div className="relative my-4">
                                    <Field
                                        as={Input.Password}
                                        name="confirmPassword"
                                        placeholder="Confirm Password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.confirmPassword}
                                    />
                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm absolute -bottom-5" />
                                </div>

                                <div className='w-full flex flex-col my-4'>
                                    <Button
                                        type="primary"
                                        className='w-full my-2 font-semibold bg-[#2563EB]'
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="w-full flex flex-col justify-between h-full">
                        <div className='w-full flex items-center justify-center mt-auto'>
                            <p className='text-sm font-normal text-black mt-20'>
                                Already have an account?
                                <span
                                    className='font-semibold underline underline-offset-2 cursor-pointer'
                                    onClick={() => navigate('/login')}
                                > Login</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
