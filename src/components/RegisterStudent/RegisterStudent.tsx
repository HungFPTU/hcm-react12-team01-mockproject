import { Input } from 'antd';
import { Field, ErrorMessage } from 'formik';

interface RegisterStudentProps {
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void; 
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void; 
    values: {
        fullName: string;
        email: string;
        password: string;
        confirmPassword: string;
    };
}

const RegisterStudent = ({ handleChange, handleBlur, values }: RegisterStudentProps) => {
    return (
        <>
            {/* Full Name Field */}
            <div className="relative mt-4">
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

            {/* Email Field */}
            <div className="relative my-6">
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

            {/* Password Field */}
            <div className="relative ">
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

            {/* Confirm Password Field */}
            <div className="relative mt-6">
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
        </>
    );
};

export default RegisterStudent;
