import React, { useState } from "react";
import { signUp } from "../services/api";
import Container from "../components/Container";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const history = useHistory();
  const [error, setError] = useState("");

  const [userInput, setUserInput] = useState<{
    username: string;
    email: string;
    password: string;
  }>({
    username: "",
    email: "",
    password: "",
  });

  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm({ defaultValues: userInput, mode: "onSubmit" });

  const validateInputs = (data: any) => {
    const newErrors: string[] = [];
    if (data.username.length < 3 || data.username.length > 20) {
      setError("Username must be between 4 and 25 characters.");
      return false;
    }
    if (!/^[\w-]+@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(data.email)) {
      setError("Invalid email address.");
      return false;
    }
    if (data.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return false;
    }

    return true;
  };

  const handleSignUp = async (data: any) => {
    if (!validateInputs(data)) return;
    try {
      const res = await signUp(data.username, data.email, data.password);
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
      if (res.status === 201) {
        history.push("/login");
      }
    } catch (error) {
      console.log(error);
      setError("Please try again something went wrong");
    }
  };

  return (
    <Container>
      <div className="flex items-center justify-center  mt-20">
        <form onSubmit={handleSubmit(handleSignUp)} className="my-5">
          <div className="flex justify-center gap-1 mb-2">
            <span> Already have an account?</span>

            <span>
              <Link to="/login" className="text-blue-500">
                Login
              </Link>
            </span>
          </div>
          <label className="sr-only">Username</label>
          <input
            type="text"
            className=" rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Enter your Username"
            {...register("username", {
              required: "Your username is require",
            })}
          />
          {errors.username && (
            <span className="text-red-400 text-sm">
              {errors.username.message}
            </span>
          )}

          <label className="sr-only">Email</label>
          <input
            type="email"
            className="mt-4 rounded-md appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm"
            placeholder="Enter your Email"
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
            Sign Up
          </button>
          {error && (
            <div className="text-center text-xs mt-2 text-red-500">{error}</div>
          )}
        </form>
      </div>
    </Container>
  );
};

export default SignUp;
