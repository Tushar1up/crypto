import React, { useEffect, useState } from "react";
import cryptopic from "../assets/crypto.png";
import { FaArrowRight } from "react-icons/fa";
import disclosurepic from "../assets/disclosure.png";
import Disclousre from "../components/Disclousre";
import Coinshero from "../components/Coinshero";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <>
      {/* hero component */}
      <div className="flex h-[calc(100vh-4rem)]  ">
        <div className="flex  flex-col gap-9 w-2/4 justify-center">
          <h1 className="text-6xl font-bold ">
            The Foremost Cryptcurrency Platform
          </h1>
          <p className="text-gray-500">
            Explore a comprohensive suite of over 100 perpetual and quaterly
            futures in crypto
          </p>
        <NavLink to={"/dashboard"}><button className="btn-home bg-blue-800 text-white w-max hover:bg-blue-400 ">
            Open dashboard |<FaArrowRight />
          </button></NavLink>  
        </div>
        <div className="m-auto ">
          <img src={cryptopic} alt="crypto logo " className="object-cover" />
        </div>
      </div>

      {/* coins component  */}
      <div className=" flex flex-col items-center  my-5  ">
        <h1 className="  text-3xl font-bold rounded-full border-solid border-black  border-2  ">
          Over 250 coins
        </h1>
        <h1 className="text-center text-4xl font-bold ">
          Trade , exchange ,stake and more with all popular coins
        </h1>
        <Coinshero />
      </div>

      {/* disclosure component */}
      <div className=" flex ">
        <div>
          <img
            src={disclosurepic}
            alt="disclosure pic"
            className=" h-full object-contain"
          />
        </div>
        <div className=" flex flex-col gap-3 text-center mx-auto">
          <h1 className="text-3xl font-bold"> Frequently asked question </h1>
          <Disclousre />
        </div>
      </div>
    </>
  );
};

export default Hero;
