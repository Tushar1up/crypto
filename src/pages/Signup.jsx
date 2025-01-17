import React from "react";
import { useForm } from "react-hook-form";
import supabase from "../config/supabaseclient"; // Supabase client instance

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted },
  } = useForm();

  // Function to handle signup
  const onSubmit = async (data) => {
    const { email, password, name } = data;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name, // Custom user metadata
        },
      },
    });

    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      alert("Check your email for verification!");
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
          Signup
        </h2>

        {/* Name Field */}
        <label className="text-gray-600 font-medium mb-2">Name</label>
        <input
          type="text"
          {...register("name", { required: true })}
          className={`border ${
            errors.name ? "border-red-500" : "border-gray-300"
          } rounded-lg p-3 mb-4 w-full focus:ring focus:ring-indigo-200`}
          placeholder="Enter your name"
        />
        {errors.name && (
          <span className="text-red-500 text-sm mb-2">Name is required.</span>
        )}

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
          <span className="text-red-500 text-sm mb-2">Email is required.</span>
        )}

        {/* Password Field */}
        <label className="text-gray-600 font-medium mb-2">Password</label>
        <input
          type="password"
          {...register("password", { required: true, minLength: 6 })}
          className={`border ${
            errors.password ? "border-red-500" : "border-gray-300"
          } rounded-lg p-3 mb-4 w-full focus:ring focus:ring-indigo-200`}
          placeholder="Enter your password"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mb-2">
            Password must be at least 6 characters.
          </span>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitted} // Disable button after submission
          className={`p-3 mt-4 rounded-lg transition duration-300 ${
            isSubmitted
              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isSubmitted ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
