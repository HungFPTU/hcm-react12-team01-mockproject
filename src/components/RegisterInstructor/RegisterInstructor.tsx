import { Field, ErrorMessage } from 'formik';
import { Input } from 'antd';
import { useState } from 'react';

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
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [videoPreview, setVideoPreview] = useState<string | null>(null);
    const handleImagePreview = (url: string) => {
        if (url) {
            setImagePreview(url);
        } else {
            setImagePreview(null);
        }
    };
    const extractYouTubeID = (url: string) => {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return match && match[2].length === 11 ? match[2] : null;
    };

    const handleVideoPreview = (url: string) => {
        const youtubeID = extractYouTubeID(url);
        if (youtubeID) {
            setVideoPreview(`https://www.youtube.com/embed/${youtubeID}`);
        } else {
            setVideoPreview(url);
        }
    };
    return (
        <div>
            {/* Phone Number */}
            <div className="relative my-2 mt-2">
                <label className="text-red-500 text-sm mr-2">*</label>
                <label className="text-sm">Phone Number</label>
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

            {/* Description */}
            <div className="relative my-6">
                <label className="text-red-500 text-sm mr-2">*</label>
                <label className="text-sm">Description</label>
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

            {/* Avatar URL */}
            <div className="relative my-6">
                <label className="text-red-500 text-sm mr-2">*</label>
                <label className="text-sm">Avatar URL</label>
                <Field
                    as={Input}
                    name="avatar_url"
                    type="text"
                    placeholder="Avatar URL"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        handleImagePreview(e.target.value);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e)}
                    value={values.avatar_url}
                />

                <ErrorMessage name="avatar_url" component="div" className="text-red-500 text-sm absolute -bottom-5" />
                {imagePreview && (
                    <div className="mt-4 flex justify-center">
                        <img
                            src={imagePreview}
                            alt="Avatar Preview"
                            className="w-full h-auto max-w-full mt-2"
                        />
                    </div>
                )}
            </div>

            {/* Video URL */}
            <div className="relative my-6">
                <label className="text-red-500 text-sm mr-2">*</label>
                <label className="text-sm">Video URL</label>

                <Field
                    as={Input}
                    name="video_url"
                    type="text"
                    placeholder="Video URL"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        handleChange(e);
                        handleVideoPreview(e.target.value);
                    }}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => handleBlur(e)}
                    value={values.video_url}
                />

                {videoPreview && (
                    <div className="mt-4">
                        <iframe
                            className="w-full h-auto aspect-video max-w-full mt-2"
                            src={videoPreview}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="YouTube Video Preview"
                        ></iframe>
                    </div>
                )}
            </div>

            {/* Bank Name */}
            <div className="relative my-6">
                {/* <label className="text-red-500 text-sm mr-2">*</label>
            <label className="text-sm">Bank Name</label> */}
                <Field
                    as={Input}
                    name="bank_name"
                    type="text"
                    placeholder="Bank Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_name}
                />
                <ErrorMessage name="bank_name" component="div" className="text-red-500 text-sm absolute -bottom-5" />
            </div>

            {/* Bank Account Number */}
            <div className="relative my-6">
                {/* <label className="text-red-500 text-sm mr-2">*</label>
            <label className="text-sm">Bank Account Number</label> */}
                <Field
                    as={Input}
                    name="bank_account_no"
                    type="text"
                    placeholder="Bank Account Number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_account_no}
                />
                <ErrorMessage name="bank_account_no" component="div" className="text-red-500 text-sm absolute -bottom-5" />
            </div>

            {/* Bank Account Name */}
            <div className="relative my-6">
                {/* <label className="text-red-500 text-sm mr-2">*</label>
            <label className="text-sm">Bank Account Name</label> */}
                <Field
                    as={Input}
                    name="bank_account_name"
                    type="text"
                    placeholder="Bank Account Name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.bank_account_name}
                />
                <ErrorMessage name="bank_account_name" component="div" className="text-red-500 text-sm absolute -bottom-5" />
            </div>
        </div>
    );
};

export default RegisterInstructor;
