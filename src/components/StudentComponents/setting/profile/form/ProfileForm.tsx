import { Editor } from "@tinymce/tinymce-react";
import { Button, DatePicker, Form, Input, notification } from "antd";
import { useEffect, useState } from "react";
import { User } from "../../../../../model/User";
import { updateUser } from "../../../../../services/auth.service";
import AvatarUpload from "../avatar/AvatarUpload"; 
import moment from "moment";

interface ProfileFormProps {
    user: User; // Nhận dữ liệu người dùng từ API
}

const ProfileForm = ({ user }: ProfileFormProps) => {
    const [form] = Form.useForm();
    const [description, setDescription] = useState<string>(user.description || "");
    const [avatarUrl, setAvatarUrl] = useState<string | null>(user.avatar_url);

    useEffect(() => {
        form.setFieldsValue({
            fullName: user.name,
            phoneNumber: user.phone_number,
            dateOfBirth: moment(user.dob),
            description: user.description,
        });
    }, [user, form]);

    const handleSaveChanges = async (values: any) => {
        try {
            const updatedUser = await updateUser(user.id, {
                name: values.fullName,
                phone_number: values.phoneNumber,
                dob: values.dateOfBirth.toISOString(),
                description: description,
                avatar_url: avatarUrl,
            });

            notification.success({
                message: "Profile updated successfully!",
                description: `Profile has been updated for ${updatedUser.name}`,
            });
            console.log("Updated User:", updatedUser);
        } catch (error) {
            notification.error({
                message: "Error",
                description: "Failed to update profile",
            });
            console.error("Update Error:", error);
        }
    };

    return (
        <Form layout="vertical" form={form} onFinish={handleSaveChanges}>
            <AvatarUpload initialAvatar={avatarUrl || ""} onAvatarChange={setAvatarUrl} />

            <Form.Item
                label="Full Name"
                name="fullName"
                rules={[{ required: true, message: "Please enter your full name" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "Please enter your phone number" }]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
                rules={[{ required: true, message: "Please enter your date of birth" }]}
            >
                <DatePicker className="w-full" />
            </Form.Item>

            <Form.Item label="Description" name="description">
                <Editor
                    value={description}
                    onEditorChange={(content) => setDescription(content)}
                    init={{
                        height: 300,
                        menubar: true,
                        plugins: "advlist autolink lists link image charmap print preview anchor",
                        toolbar: "undo redo | formatselect | bold italic backcolor | bullist numlist outdent indent",
                    }}
                />
            </Form.Item>

            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Save Changes
                </Button>
            </Form.Item>
        </Form>
    );
};

export default ProfileForm;