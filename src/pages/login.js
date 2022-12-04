import React, { useRef } from "react";
import { Link } from "react-router-dom";
import FormButton from "../components/form-button";
import FormInput from "../components/form-input";
import Alert from "../components/alert";
import useTitle from "../hooks/use-title";
import useValidate from "../hooks/use-validate";
import useHttp from "../hooks/use-http";
import { loginUser } from "../services/http-service";
import constant from "../services/constant";

const Login = () => {
  useTitle("Login");
  const { status, error, execute } = useHttp();
  const emailRef = useRef();
  const passwordRef = useRef();
  const { errors: validationErrors, validate: validateForm } = useValidate([
    { type: "email", size: 0, name: "email", field: emailRef },
    { type: "length", size: 6, name: "password", field: passwordRef },
  ]);

  async function handleSubmit(e) {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      execute(
        loginUser,
        [emailRef.current.value, passwordRef.current.value],
        constant.LOGIN_USER
      );
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
            Login to your account{" "}
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
            <Alert type="error" title="Authentication error" message={error} />
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
            type="password"
            name="password"
            label="Password"
            ref={passwordRef}
            error={"password" in validationErrors ? true : null}
            placeholder="******"
          />
          <FormButton type="submit" value="Login" />

          <div className="mb-1 block font-light">
            Don't have an account?{" "}
            <Link to="/register" className="font-medium  text-[#6A64F1]">
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
