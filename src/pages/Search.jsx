import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Coinshero from "../components/Coinshero";
import { useSelector, useDispatch } from "react-redux";
import { additeminholdings, decreasemoney } from "../features/userslice";

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const Search = () => {
  const [searchinput, setsearchinput] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const data = useSelector((state) => state.user.data); // Get data from Redux store

  const debouncedSearchInput = useDebounce(searchinput, 500); // 500ms debounce delay
  const dispatch = useDispatch();

  const fetchdata = async (query) => {
    const options = { method: "GET", headers: { accept: "application/json" } };
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/search?query=${query}`,
        options
      );
      const data = await response.json();
      console.log(data);
      setSearchResults(data.coins);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (debouncedSearchInput) {
      fetchdata(debouncedSearchInput);
    }
  }, [debouncedSearchInput]);

  const buyhandler = (item) => {
    dispatch(decreasemoney(item.market_cap_rank));
    dispatch(additeminholdings(item));
  };

  return (
    <div className="flex flex-col items-center font-bold">
      <h1 className="text-3xl text-sky-700">
        Find your favourite crypto at one place
      </h1>
      <div className="flex items-center mt-4">
        <FaSearch size={24} className="mr-2" />
        <input
          type="text"
          placeholder="Search crypto (e.g., Bitcoin, ETH)"
          className="border-2 border-black text-2xl p-2 placeholder:text-sm"
          onChange={(e) => setsearchinput(e.target.value)}
        />
      </div>
      {/* Display search results or trending coins */}
      {searchResults ? (
        <div className="mt-4">
          <h1 className="text-2xl text-green-700">Search Results</h1>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center p-4 border rounded-lg"
              >
                <img src={item.thumb} alt={item.name} className="mb-2" />
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-500">Rank: {item.market_cap_rank}</p>
                {data ? (
                  <button
                    className="btn-home mt-2"
                    onClick={() => buyhandler(item)}
                  >
                    Buy
                  </button>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <h1 className="text-2xl text-green-700 mt-2">Trending coins</h1>
          <Coinshero />
        </>
      )}
    </div>
  );
};

export default Search;
