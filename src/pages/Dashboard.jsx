import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { increasemoney ,deleteiteminholdings } from "../features/userslice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { currentholdings } = useSelector((state) => state.user);

  const propmptopener = () => {
    const rechargevalue = prompt("What amount do you want to recharge?");
    const rechargeAmount = parseFloat(rechargevalue); // Convert the input to a number
    if (!isNaN(rechargeAmount)) {
      dispatch(increasemoney(rechargeAmount));
    } else {
      alert("Please enter a valid number");
    }
  };

  const sellHandler = (item) => {
    dispatch(deleteiteminholdings(item));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <ul className="list-disc mt-4 text-lg text-center">
        <li>Note: We use rank as the price for buying crypto.</li>
        <li>
          This is a demo account. You can increase your money using recharge.
        </li>
      </ul>
      <button
        onClick={propmptopener}
        className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600 transition"
      >
        Recharge
      </button>
      <div className="mt-6 text-2xl">Current Holdings</div>
      <table className="table-auto border-collapse border border-gray-300 mt-4">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">
              Market Cap Rank
            </th>
          </tr>
        </thead>
        <tbody>
          {currentholdings.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={item.thumb}
                  alt={`${item.name} thumbnail`}
                  className="w-10 h-10 mx-auto"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{item.name}</td>
              <td className="border border-gray-300 px-4 py-2">
                {item.market_cap_rank}
              </td>
              <td>
                <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded transition duration-300 ease-in-out"  onClick={() => sellHandler(item)}>
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
