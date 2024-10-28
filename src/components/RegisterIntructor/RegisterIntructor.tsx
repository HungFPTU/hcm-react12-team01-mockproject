import React, { useState } from 'react';
import { Field, ErrorMessage } from 'formik';
import { Input, Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { UploadFile } from 'antd/es/upload/interface';
import { FormikErrors } from 'formik';

interface FormValues {
    phoneNumber: string;
    description: string;
    avatar?: UploadFile;
    video?: UploadFile;
    certificate?: UploadFile;
}

interface RegisterInstructorProps {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    values: FormValues;
    setFieldValue: (
        field: keyof FormValues,
        value: UploadFile | undefined,
        shouldValidate?: boolean
    ) => Promise<void | FormikErrors<FormValues>>;
    handleUpload: (file: UploadFile) => boolean;
}

const RegisterInstructor = ({ handleChange, handleBlur, values, setFieldValue, handleUpload }: RegisterInstructorProps) => {
   
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleUploadChange = (file: UploadFile) => {
        console.log('File uploaded:', file);
        
        const previewUrl = URL.createObjectURL(file as unknown as Blob);
        setAvatarPreview(previewUrl); 
        setFieldValue('avatar', file); 
        return false; 
    };

    return (
        <div>
            <div className="relative my-6">
                <Field
                    as={Input}
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                />
                <ErrorMessage name="phoneNumber" component="div" className="text-red-500 text-sm absolute -bottom-5" />
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
                <Upload
                    name="avatar"
                    beforeUpload={handleUploadChange}
                    showUploadList={false} 
                >
                    <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>

                
                {avatarPreview && (
                    <div className="my-4">
                        <img src={avatarPreview} alt="Avatar Preview" className="w-32 h-32 object-cover" />
                    </div>
                )}
            </div>

            <div className="relative my-6">
                <Upload
                    name="video"
                    beforeUpload={handleUpload}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload Video</Button>
                </Upload>
            </div>

            <div className="relative my-6">
                <Upload
                    name="certificate"
                    beforeUpload={handleUpload}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload Certificate</Button>
                </Upload>
            </div>
        </div>
    );
};

export default RegisterInstructor;
