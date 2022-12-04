import React, { useRef } from "react";
import { Link } from "react-router-dom";
import FormButton from "../components/form-button";
import FormInput from "../components/form-input";
import Alert from "../components/alert";
import useTitle from "../hooks/use-title";
import useValidate from "../hooks/use-validate";
import useHttp from "../hooks/use-http";
import { registerUser } from "../services/http-service";
import constant from "../services/constant";

const Register = () => {
  useTitle("Register");
  const { status, error, execute } = useHttp();
  const submitStatus = useRef(false);
  const emailRef = useRef();
  const fullnameRef = useRef();
  const passwordRef = useRef();
  const { errors: validationErrors, validate: validateForm } = useValidate([
    { type: "email", size: 0, name: "email", field: emailRef },
    { type: "length", size: 3, name: "fullname", field: fullnameRef },
    { type: "length", size: 6, name: "password", field: passwordRef },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    submitStatus.current = false;
    const isValid = validateForm();
    if (isValid) {
      const result = await execute(
        registerUser,
        [
          emailRef.current.value,
          fullnameRef.current.value,
          passwordRef.current.value,
        ],
        constant.REGISTER_USER
      );
      if (result) {
        submitStatus.current = true;
        emailRef.current.value = "";
        fullnameRef.current.value = "";
        passwordRef.current.value = "";
      }
    }
  }

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto w-full max-w-[550px] bg-white">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="mx-auto h-12 w-auto text-indigo-500"
            alt="Gif Store App"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"
            />
          </svg>

          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register to share{" "}
          </h2>
        </div>

        {Object.keys(validationErrors).length > 0 && (
          <Alert
            type="error"
            title="Validation Error"
            message="The supplied inputs are invalid"
          />
        )}

        {Object.keys(validationErrors).length === 0 &&
          status === constant.ERROR_STATE && (
            <Alert type="error" title="Registration error" message={error} />
          )}

        {Object.keys(validationErrors).length === 0 &&
          status === constant.IDLE_STATE &&
          submitStatus.current && (
            <Alert
              type="success"
              title="Registration success"
              message="User registration successful"
            />
          )}

        <form className="py-6 px-9" onSubmit={handleSubmit}>
          <FormInput
            type="text"
            name="email"
            label="Email"
            ref={emailRef}
            error={"email" in validationErrors ? true : null}
            placeholder="email@domain.com"
          />
          <FormInput
            type="text"
            name="fullname"
            label="Fullname"
            ref={fullnameRef}
            error={"fullname" in validationErrors ? true : null}
            placeholder="John Doe"
          />
          <FormInput
            type="password"
            name="password"
            label="Password"
            ref={passwordRef}
            error={"password" in validationErrors ? true : null}
            placeholder="******"
          />
          <FormButton type="submit" value="Register" />

          <div className="mb-1 block font-light">
            Already have an account?{" "}
            <Link to="/login" className="font-medium  text-[#6A64F1]">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
