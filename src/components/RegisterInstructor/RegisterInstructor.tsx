import { Field, ErrorMessage } from 'formik';
import { Input } from 'antd'; 

interface FormValues {
    phone_number: string;
    description: string;
    avatar_url?: string;  
    video_url?: string;
    bank_name: string;
    bank_account_no: string;
    bank_account_name: string;
}

interface RegisterInstructorProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    values: FormValues;
}

const RegisterInstructor = ({ handleChange, handleBlur, values }: RegisterInstructorProps) => {
    return (
        <div>
            <div className="relative my-2">
                <Field
                    as={Input}
                    name="phone_number"
                    type="text"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                />
                <ErrorMessage name="phone_number" component="div" className="text-red-500 text-sm absolute -bottom-5" />
            </div>

            <div className="relative my-6">
                <Field
                    as={Input.TextArea}
                    name="description"
                    placeholder="Description"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                />
                <ErrorMessage name="description" component="div" className="text-red-500 text-sm absolute -bottom-5" />
            </div>

            <div className="relative my-6">
                <Field
                    as={Input}
                    name="avatar_url"
                    type="text"
                    placeholder="Avatar URL"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.avatar_url}
                />
                <ErrorMessage name="avatar" component="div" className="text-red-500 text-sm absolute -bottom-5" />
            </div>

            <div className="relative my-6">
                <Field
                    as={Input}
                    name="video_url"
                    type="text"
                    placeholder="Video URL"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.video_url}
                />
                <ErrorMessage name="video" component="div" className="text-red-500 text-sm absolute -bottom-5" />
            </div>
        </div>
    );
};

export default RegisterInstructor;
