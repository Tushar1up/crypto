import React from "react";
import { useForm } from "react-hook-form";
import supabase from "../config/supabaseclient"; // Supabase client instance
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux"
import { addingdataintosupabase, setUserData ,fetchUserData } from "../features/userslice";


const Login = () => {
 const dispatch = useDispatch();
  const navigate = useNavigate();
  
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle form submission
  const onSubmit = async (event) => {
    const { email, password } = event;

    // Supabase login
    const { error,data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error logging in:", error.message);
      alert("Login failed. Please check your credentials.");
    } else {
      console.log(data);
      dispatch(setUserData(data));
     await addingdataintosupabase(data.user.email)
      dispatch(fetchUserData(data.user.email))
      navigate("/Dashboard")
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-gray-100 p-6">
      {/* Image Section */}
      <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
        <img
          src="https://img.freepik.com/free-vector/popular-cryptocurrency-logos-set_69286-369.jpg"
          alt="Crypto Logos"
          className="w-3/4 max-w-md rounded-lg shadow-lg"
        />
      </div>

      {/* Form Section */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full md:w-1/2 bg-white p-8 rounded-lg shadow-lg flex flex-col"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Login
        </h2>

        {/* Email Field */}
        <label className="text-gray-600 font-medium mb-2">Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className={`border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-lg p-3 mb-4 w-full focus:ring focus:ring-indigo-200`}
          placeholder="Enter your email"
        />
        {errors.email && (
          <span className="text-red-500 text-sm mb-2">
            Email is required.
          </span>
        )}

        {/* Password Field */}
        <label className="text-gray-600 font-medium mb-2">Password</label>
        <input
          type="password"
          {...register("password", { required: true })}
          className={`border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-lg p-3 mb-4 w-full focus:ring focus:ring-indigo-200`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mb-2">
            Password is required.
          </span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-indigo-600 text-white rounded-lg p-3 mt-4 hover:bg-indigo-700 transition duration-300"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
