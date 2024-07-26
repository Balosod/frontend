import React, { useState } from "react";
import { login } from "../services/api";
import { Link, useHistory } from "react-router-dom";
import Container from "../components/Container";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/Context";

const Login = () => {
  const history = useHistory();
  const { user, updateUser } = useAuth();
  const [error, setError] = useState("");
  const [userInput, setUserInput] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({ defaultValues: userInput, mode: "onSubmit" });

  const handleLogin = async (data: any) => {
    try {
      const res = await login(data.email, data.password);
      console.log("login res", res);
      if (res.status === 400) {
        if (res.data.message) {
          setError(res.data.message);
        } else {
          Object.keys(res.data).forEach((field) => {
            const message = res.data[field][0];
            setError(`${field}: ${message}`);
          });
        }
      }
      if (res.status === 401) {
        setError(res.data.message);
      }
      if (res.status === 200) {
        updateUser({
          ...user,
          username: res.data.username,
          isLoggedin: true,
          email: res.data.email,
        });
        localStorage.setItem("token", res.data.token);
        history.push("/profile");
      }
    } catch (error) {
      setError("Please try again something went wrong.");
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center  mt-20">
        <form onSubmit={handleSubmit(handleLogin)} className="my-5">
          <div className="flex justify-center gap-1 mb-2">
            <span> Dont have an account?</span>
            <span>
              <Link to="/" className="text-blue-500">
                Signup
              </Link>
            </span>
          </div>
          <label className="sr-only">Email</label>
          <input
            type="text"
            className=" rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Enter your Username"
            {...register("email", {
              required: "Your email is require",
            })}
          />
          {errors.email && (
            <span className="text-red-400 text-sm">{errors.email.message}</span>
          )}
          <label className="sr-only">Password</label>
          <input
            type="password"
            className=" mt-4 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Enter your password"
            {...register("password", {
              required: "Your password is require",
            })}
          />
          {errors.password && (
            <span className="text-red-400 text-sm">
              {errors.password.message}
            </span>
          )}
          <button
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10"
            type="submit"
          >
            Login
          </button>
          {error && (
            <div className="text-center text-xs mt-2 text-red-500">{error}</div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default Login;
