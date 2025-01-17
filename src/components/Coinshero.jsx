import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchcryptodata } from "../features/apislice";

const Coinshero = () => {
  const dispatch = useDispatch();
  const { isloading, data, iserror } = useSelector((state) => state.api || {});

  useEffect(() => {
     // Fetch data initially
     dispatch(fetchcryptodata("https://api.coingecko.com/api/v3/search/trending"));

     // Set up an interval to fetch data periodically (e.g., every 60 seconds)
     const interval = setInterval(() => {
       dispatch(fetchcryptodata("https://api.coingecko.com/api/v3/search/trending"));
     }, 60000); // 60,000 ms = 60 seconds
 
     // Cleanup the interval on component unmount
     return () => clearInterval(interval);
  }, [dispatch]);

  if (isloading) {
    return <p>Loading trending coins...</p>;
  }

  if (iserror) {
    return <p>Error loading trending coins.</p>;
  }

  if (!data || data.coins.length === 0) {
    return <p>No trending coins available.</p>;
  }

  return (
    <table className="border-gray-400 mt-5 text-lg">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2">Coin</th>
          <th className="border border-gray-400 px-4 py-2">Price (BTC)</th>
          <th className="border border-gray-400 px-4 py-2">Market Cap Rank</th>
          <th className="border border-gray-400 px-4 py-2">Sparkline</th>
        </tr>
      </thead>
      <tbody>
        {data.coins.slice(0, 10).map((item, index) => (
          <tr key={index} className="text-center border-b border-gray-500">
            <td className="text-left flex items-center gap-3">
              <img src={item.item.small} alt="crypto image" />
              {item.item.name} ({item.item.symbol})
            </td>
            <td>{item.item.price_btc.toFixed(8)} BTC</td>
            <td>{item.item.market_cap_rank}</td>
            <td>
              {item.item.data?.sparkline ? (
                <img src={item.item.data.sparkline} alt="sparkline" />
              ) : (
                "N/A"
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Coinshero;
