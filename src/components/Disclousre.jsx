import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";

const Disclousre = () => {
  const [disclosuredata, setdisclosuredata] = useState([
    {
      question: "What is a cryptocurrency exchange?",
      answer:
        "A cryptocurrency exchange is a platform that allows users to buy, sell, or trade cryptocurrencies such as Bitcoin, Ethereum, and others. It acts as an intermediary between buyers and sellers.",
    },
    {
      question: "How does Vortex provide cryptocurrency data?",
      answer:
        "Vortex aggregates real-time cryptocurrency data from multiple exchanges and APIs, giving users access to live prices, market trends, and detailed analysis.",
    },
    {
      question: "What are the key features of Vortex?",
      answer:
        "Vortex offers real-time price tracking, historical data charts, market news, portfolio management, and advanced analytics for informed decision-making.",
    },
  ]);

  return (
    <>
      {disclosuredata.map((items, index) => (
        <Disclosure
          as="div"
          className="w-full max-w-md p-4 mb-4 bg-white rounded-lg shadow-md"
          key={index}
        >
          {({ open }) => (
            <>
              <DisclosureButton className="w-full border-b pb-2 text-left font-semibold text-lg text-blue-600 hover:text-blue-800 flex justify-between items-center">
                {items.question}
                <span className="ml-2">
                  {open ? <FaMinus /> : <FaPlus />}
                </span>
              </DisclosureButton>
              <div className="overflow-hidden py-2">
                <DisclosurePanel
                  transition
                  className="origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0 text-gray-700"
                >
                  {items.answer}
                </DisclosurePanel>
              </div>
            </>
          )}
        </Disclosure>
      ))}
    </>
  );
};

export default Disclousre;
