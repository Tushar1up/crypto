import React from "react";
import { AiFillSlackCircle } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { clearUserData } from "../features/userslice";

const Navbar = () => {
  const { data, money } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // console.log(data.user.user_metadata.name)

  return (
    <>
      <div className="flex justify-between items-center h-16 sticky top-0 bg-white z-50 shadow-md rounded-xl">
        <NavLink to={"/"} className="hover:cursor-pointer flex items-center">
          <AiFillSlackCircle size={40} />
          <h1 className="btn-home ml-2">Vortex</h1>
        </NavLink>

        <div className="flex gap-2">
          <NavLink to={"/search"}>
            <button className="btn-home">Search coins</button>
          </NavLink>
          <NavLink to={"/dashboard"}>
            <button className="btn-home">dashboard</button>
          </NavLink>
        </div>

        {data ? (
          <>
            <div>
              <button
                onClick={() => dispatch(clearUserData())}
                className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
            <div className="mr-2  text-lg ">
              <p className="text-blue-600 font-semibold ">
                Welcome back {data.user.user_metadata.name}
              </p>
              <p className="text-green-600 font-medium ">
                Current money ${money}
              </p>
            </div>
          </>
        ) : (
          <div className="flex gap-2">
            <NavLink to={"/login"}>
              <button className="text-blue-600 border btn-home hover:bg-violet-500 hover:text-white">
                Log In
              </button>
            </NavLink>
            <NavLink to={"/signup"}>
              <button className="text-blue-600 border btn-home hover:bg-violet-500 hover:text-white">
                Sign Up
              </button>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
