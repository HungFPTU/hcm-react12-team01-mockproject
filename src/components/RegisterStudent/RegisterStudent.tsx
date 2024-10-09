// src/components/RegisterStudent/RegisterStudent.tsx

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Input, Button, message } from 'antd';
import * as Yup from 'yup';
import { auth } from '../../firebase-config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { useCallback } from 'react';

interface FormValues {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const validationSchema = Yup.object({
    fullName: Yup.string().required('Please input your full name!').min(2, 'Name must be at least 2 characters!'),
    email: Yup.string().email('Invalid email!').required('Please input your email!'),
    password: Yup.string().required('Please input your password!').min(8, 'Password must be at least 8 characters!'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Confirm password does not match!')
        .required('Please confirm your password!'),
});

interface RegisterStudentProps {
    onRegisterSuccess: () => void;
}

const RegisterStudent = ({ onRegisterSuccess }: RegisterStudentProps) => {
    const handleRegister = useCallback(async (values: FormValues) => {
        const { fullName, email, password } = values;

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);
            console.log('Đăng ký tài khoản với:', { fullName, email });
            message.success({
                content: 'Register successful! Please check your email to verify your account.',
                duration: 6,
            });

            onRegisterSuccess();
        } catch (error) {
            const firebaseError = error as FirebaseError;

            if (firebaseError.code === 'auth/email-already-in-use') {
                message.error('This email is already registered. Please use a different email.');
            } else if (firebaseError.code === 'auth/weak-password') {
                message.error('Password is too weak. Please choose a stronger password.');
            } else if (firebaseError.code === 'auth/invalid-email') {
                message.error('Invalid email format. Please enter a valid email address.');
            } else {
                console.error('Error registering:', firebaseError);
                message.error('Registration failed! Please try again.');
            }
        }
    }, [onRegisterSuccess]);

    return (
        <Formik
            initialValues={{
                fullName: '',
                email: '',
                password: '',
                confirmPassword: '',
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
                        >
                            Register
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default RegisterStudent;
