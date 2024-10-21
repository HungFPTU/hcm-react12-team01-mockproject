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
        value: UploadFile<unknown> | undefined,
        shouldValidate?: boolean
    ) => Promise<void | FormikErrors<FormValues>>;
}

const RegisterInstructor = ({ handleChange, handleBlur, values, setFieldValue }: RegisterInstructorProps) => {
  
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

    const handleUpload = (file: UploadFile) => {
        console.log('File uploaded:', file);
       
        const previewUrl = URL.createObjectURL(file as unknown as Blob);
        setAvatarPreview(previewUrl); 
        setFieldValue('avatar', file);
        return false; 
    };

    return (
        <div>
            <div className="relative my-2">
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
                    beforeUpload={handleUpload}
                    showUploadList={false} 
                >
                    <Button icon={<UploadOutlined />}>Upload Avatar</Button>
                </Upload>

               
                {avatarPreview && (
                    <div className="my-4">
                        <img src={avatarPreview} alt="Avatar Preview" style={{ maxWidth: '200px', height: 'auto' }} />
                    </div>
                )}
            </div>

            <div className="relative my-2">
                <Upload
                    name="video"
                    beforeUpload={handleUpload}
                    onChange={(info) => {
                        setFieldValue('video', info.file);
                    }}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload Video</Button>
                </Upload>
            </div>

            <div className="relative my-6">
                <Upload
                    name="certificate"
                    beforeUpload={handleUpload}
                    onChange={(info) => {
                        setFieldValue('certificate', info.file);
                    }}
                    showUploadList={false}
                >
                    <Button icon={<UploadOutlined />}>Upload Certificate</Button>
                </Upload>
            </div>
        </div>
    );
};

export default RegisterInstructor;
