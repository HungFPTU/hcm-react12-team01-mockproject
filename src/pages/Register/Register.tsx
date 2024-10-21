import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Button, message, Radio, RadioChangeEvent } from 'antd';
import * as Yup from 'yup';
import RegisterStudent from '../../components/RegisterStudent/RegisterStudent';
import RegisterInstructor from '../../components/RegisterInstructor/RegisterInstructor'; 
import YOUR_IMAGE from '../../assets/Login&Register.jpg';
import LOGO from '../../assets/logo.png';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { UploadFile } from 'antd/es/upload/interface';

interface FormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
    phoneNumber: string;
    description: string;
    avatar?: UploadFile; 
    video?: UploadFile; 
    certificate?: UploadFile; 
}

const validationSchema = Yup.object({
    fullName: Yup.string()
        .required('Please input your full name!')
        .min(2, 'Name must be at least 2 characters!'),
    email: Yup.string()
        .email('Invalid email!')
        .required('Please input your email!'),
    password: Yup.string()
        .required('Please input your password!')
        .min(8, 'Password must be at least 8 characters!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm password does not match!')
        .required('Please confirm your password!'),
    phoneNumber: Yup.string().required('Please input your phone number!'),
    description: Yup.string().required('Please provide a description!'),
    avatar: Yup.mixed().required('Please upload your avatar!'),
    video: Yup.mixed().required('Please upload your video!'),
    certificate: Yup.mixed().required('Please upload your certificate!'),
});


const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const initialValues: FormValues = {
        fullName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'student',
        phoneNumber: '',
        description: '',
        avatar: undefined,
        video: undefined,
        certificate: undefined,
    };

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

                <div className='w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl max-h-[600px] overflow-y-auto'>
                    <h1 className='text-3xl text-black font-semibold mb-4 flex items-center'>
                        <img src={LOGO} alt="Logo" className="h-9 mr-3" />
                        F-Learning
                    </h1>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleRegister}
                    >
                        {({ handleChange, handleBlur, values, setFieldValue }) => (
                            <Form className="w-full flex flex-col  " noValidate>
                                <div className="flex items-center mb-6 ">
                                    <p className='mr-2'>Please! Register with your account:</p>
                                    <Field as={Radio.Group}
                                        name="role"
                                        className="ml-8"
                                        onChange={(e: RadioChangeEvent) => handleChange({ target: { name: 'role', value: e.target.value } })}
                                        value={values.role}
                                    >
                                        <Radio value="student" className="text-base">Student</Radio>
                                        <Radio value="instructor" className="text-base">Instructor</Radio>
                                    </Field>
                                </div>

                                {/* Render RegisterStudent cho cả Student và Instructor */}
                                <RegisterStudent
                                    handleChange={handleChange}
                                    handleBlur={handleBlur}
                                    values={values}
                                />

                                {/* Render RegisterInstructor nếu role là instructor */}
                                {values.role === 'instructor' && (
                                    <RegisterInstructor
                                        handleChange={handleChange}
                                        handleBlur={handleBlur}
                                        values={values}
                                        setFieldValue={setFieldValue} 
                                    />
                                )}

                                <div className='w-full flex flex-col mb-4'>
                                    <Button
                                        type="primary"
                                        className='w-full my-2 font-semibold bg-[#a928c3]'
                                        htmlType="submit"
                                        loading={loading}
                                    >
                                        Register
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="flex flex-col justify-end mt-auto">
                        <div className='w-full flex items-center justify-center mt-auto'>
                            <p className='text-sm font-normal text-black'>
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
