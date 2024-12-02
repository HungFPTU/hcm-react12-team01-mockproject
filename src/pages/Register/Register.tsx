import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { Button, message, Radio, RadioChangeEvent } from "antd";
import * as Yup from "yup";
import RegisterStudent from "../../components/RegisterStudent/RegisterStudent";
import RegisterInstructor from "../../components/RegisterInstructor/RegisterInstructor";
import YOUR_IMAGE from "../../assets/Login&Register.jpg";
import LOGO from "../../assets/logo.png";
import { FirebaseError } from "firebase/app";
import { HomeOutlined } from "@ant-design/icons";
import { AuthService } from "../../services/authService/auth.service";

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "student" | "instructor";
  phone_number?: string;
  description?: string;
  avatar_url?: string;
  video_url?: string;
  bank_name: string;
  bank_account_no: string;
  bank_account_name: string;
}

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Please input your full name!")
    .min(2, "Name must be at least 2 characters!"),
  email: Yup.string()
    .email("Invalid email!")
    .required("Please input your email!"),
  password: Yup.string()
    .required("Please input your password!")
    .min(6, "Password must be at least 6 characters!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Confirm password does not match!")
    .required("Please confirm your password!"),
  // role: Yup.string().required('Role is required!'),
  // phone_number: Yup.string()
  //     .required('Phone number is required!')
  //     .matches(/^[0-9]+$/, 'Phone number must be numeric')
  //     .min(10, 'Phone number must be at least 10 digits!'),
  // description: Yup.string().required('Description is required!'),
  // avatar_url: Yup.string().url('Invalid URL format!').required('Avatar URL is required!'),
  // video_url: Yup.string().url('Invalid URL format!').required('Video URL is required!'),
  // bank_name: Yup.string().required('Bank name is required!'),
  // bank_account_no: Yup.string()
  //     .required('Bank account number is required!')
  //     .matches(/^[0-9]+$/, 'Bank account number must be numeric!'),
  // bank_account_name: Yup.string().required('Bank account name is required!'),
});

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const handleBackHome = () => {
    navigate("/");
    window.location.reload();
  };

  const initialValues: FormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
    phone_number: "",
    description: "",
    avatar_url: "",
    video_url: "",
    bank_name: "",
    bank_account_no: "",
    bank_account_name: "",
  };

  const handleRegister = useCallback(
    async (values: FormValues) => {
      const {
        name,
        email,
        password,
        role,
        phone_number,
        description,
        avatar_url,
        video_url,
        bank_name,
        bank_account_no,
        bank_account_name,
      } = values;
      setLoading(true);

      try {
        // Tạo payload cho API đăng ký
        const registerPayload = {
          name,
          email,
          password,
          role,
          ...(role === "instructor" && {
            phone_number,
            description,
            avatar_url,
            video_url,
            bank_name,
            bank_account_no,
            bank_account_name,
          }),
        };

        console.log("registerPayload", registerPayload);
        // Gọi API để đăng ký
        await AuthService.register(registerPayload);

        message.success({
          content:
            "Register successful! Please check your email to verify your account.",
          duration: 6,
        });
        navigate("/login");
      } catch (error) {
        console.error("Error during registration:", error);
        const firebaseError = error as FirebaseError;
        if (firebaseError.code === "auth/email-already-in-use") {
          message.error({
            content:
              "This email is already registered. Please use a different email.",
            duration: 6,
          });
        } else if (firebaseError.code === "auth/weak-password") {
          message.error(
            "Password is too weak. Please choose a stronger password."
          );
        } else if (firebaseError.code === "auth/invalid-email") {
          message.error(
            "Invalid email format. Please enter a valid email address."
          );
        } else {
          console.error("Error registering:", firebaseError);
          message.error("Registration failed! Please try again.");
        }
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-r from-[#330933] to-white-600 relative">
      <div className="flex w-full max-w-[1200px] shadow-2xl">
        <div className="hidden md:flex w-1/2 shadow-2xl">
          <img
            src={YOUR_IMAGE}
            alt="Description of image"
            className="w-full h-full object-cover shadow-xl rounded-l-lg"
          />
        </div>

        <div className="w-full max-w-[600px] flex flex-col p-10 bg-white rounded-r-lg shadow-2xl max-h-[600px] overflow-y-auto">
          <h1 className="text-3xl text-black font-semibold mb-4 flex items-center">
            <img src={LOGO} alt="Logo" className="h-9 mr-3" />
            F-Learning
          </h1>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleRegister}
          >
            {({ handleChange, handleBlur, values }) => (
              <Form className="w-full flex flex-col " noValidate>
                <div className="flex items-center mb-2">
                  <p className="mr-2">Please! Register with your account:</p>
                  <Field
                    as={Radio.Group}
                    name="role"
                    className="ml-8"
                    onChange={(e: RadioChangeEvent) =>
                      handleChange({
                        target: { name: "role", value: e.target.value },
                      })
                    }
                    value={values.role}
                  >
                    <Radio value="student" className="text-base">
                      Student
                    </Radio>
                    <Radio value="instructor" className="text-base">
                      Instructor
                    </Radio>
                  </Field>
                </div>

                {/* Render RegisterStudent cho cả Student và Instructor */}
                <RegisterStudent
                  handleChange={handleChange}
                  handleBlur={handleBlur}
                  values={values}
                />

                {/* Render RegisterInstructor nếu role là instructor */}
                {values.role === "instructor" && (
                  <RegisterInstructor
                    handleChange={handleChange}
                    handleBlur={handleBlur}
                    values={{
                      phone_number: values.phone_number || "",
                      description: values.description || "",
                      avatar_url: values.avatar_url || "",
                      video_url: values.video_url || "",
                      bank_name: values.bank_name,
                      bank_account_no: values.bank_account_no,
                      bank_account_name: values.bank_account_name,
                    }}
                  />
                )}

                <div className="w-full flex flex-col my-4 ">
                  <Button
                    type="primary"
                    className="w-full my-2 font-semibold bg-[#a928c3]"
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
            <div className="w-full flex items-center justify-center mt-auto">
              <p className="text-sm font-normal text-black">
                Already have an account?
                <span
                  className="font-semibold underline underline-offset-2 cursor-pointer"
                  onClick={() => navigate("/login")}
                >
                  {" "}
                  Login
                </span>
              </p>
            </div>
          </div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <button
              className="flex items-center text-[#1f0a23] text-lg group"
              onClick={handleBackHome}
            >
              <HomeOutlined className="mr-2 text-[#1f0a23] text-xl group-hover:text-[#7c3076]" />
              <span className="group-hover:text-[#7c3076]">Back Home</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
