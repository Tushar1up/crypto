import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import {Hero,Dashboard,Login,Search,Signup} from "./pages/index";
import Footer from "./components/Footer";
import { useSelector,useDispatch } from "react-redux";
import { fetchUserData } from "./features/userslice";

const App = () => {
  const dispatch = useDispatch();
  const userdetails = useSelector((state) => state.user.data);

  useEffect(() => {
    if (userdetails && userdetails.user && userdetails.user.email) {
      dispatch(fetchUserData(userdetails.user.email));
    }
  }, [dispatch, userdetails]);

  return (
    <BrowserRouter>
      <div className="max-w-screen-xl mx-auto px-2">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {userdetails ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route
              path="/dashboard"
              element={
                <div className="flex flex-col items-center justify-center h-screen">
                  <h1 className="text-3xl font-bold text-red-600">
                    Please login first
                  </h1>
                  <p className="text-lg text-gray-600 mt-2">
                    You need to be logged in to access the dashboard.
                  </p>
                </div>
              }
            />
          )}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
