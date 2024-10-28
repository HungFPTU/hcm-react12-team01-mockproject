// src/components/LoginEmailPassword.jsx
import { useCallback, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Input, Button, Checkbox, message } from "antd";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "../../firebase-config";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../services/authService/AuthService";
// import loginApi from '../../services/authService/AuthService';

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email!")
    .required("Please input your email!"),
  password: Yup.string()
    .required("Please input your password!")
    .min(6, "Password must be at least 6 characters!"),
});

interface FormValues {
  email: string;
  password: string;
}

const LoginEmailPassword = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAPISignIn = async (email: string, password: string) => {
    try {
      const res = await AuthService.login({ email, password });
      console.log(res);
      localStorage.setItem("token", res.data.data.token);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const handleEmailSignIn = useCallback(
    async (values: FormValues) => {
      const { email, password } = values;
      setLoading(true);

      const apiSignInSuccess = await handleAPISignIn(email, password);

      if (apiSignInSuccess) {
        navigate("/");
      } else {
        try {
          const userCredential = await signInWithEmailAndPassword(
            email,
            password
          );
          const user = userCredential.user;

          if (!user.emailVerified) {
            message.error(
              "Your email is not verified. Please check your email for verification."
            );
            return;
          }

          if (user) {
            const idToken = await user.getIdToken();
            sessionStorage.setItem("Token", idToken);
            message.success("Login successful!");
            navigate("/");
          }
        } catch (error) {
          const firebaseError = error as FirebaseError;
          console.error("Login failed:", firebaseError);
          message.error("Login failed. Please check your email and password.");
        }
      }

      setLoading(false);
    },
    [navigate]
  );

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={validationSchema}
      onSubmit={handleEmailSignIn}
    >
      {({ handleChange, handleBlur, values }) => (
        <Form className="w-full flex flex-col" noValidate>
          <div className="relative mb-1">
            <Field
              as={Input}
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-sm absolute -bottom-5"
            />
          </div>

          <div className="relative my-5">
            <Field
              as={Input.Password}
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500 text-sm absolute -bottom-5"
            />
          </div>

          <div className="w-full flex items-center justify-between">
            <Checkbox className="mt-3"> Remember me for 30 days</Checkbox>
            <Link
              to={"/forgot-password"}
              className="text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2 mt-3"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="w-full flex flex-col my-4">
            <Button
              type="primary"
              className="w-full my-2 font-semibold bg-[#a928c3]"
              htmlType="submit"
              loading={loading}
            >
              Login
            </Button>
          </div>

          <div className="w-full flex items-center justify-center relative py-3">
            <div className="w-full h-[1px] bg-black/40"></div>
            <p className="text-lg absolute text-black/80 bg-white">or</p>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginEmailPassword;
