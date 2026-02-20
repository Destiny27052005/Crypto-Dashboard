import { useState, useEffect } from "react"
import axios from "axios"
import { Routes, Route } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import NotFound from "./Pages/NotFound"
import CoinDetails from "./Pages/CoinDetails"

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [isPage, setIsPage] = useState(10);
  const [isOrder, setIsOrder] = useState('market_cap_desc');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('');


  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          headers: {
            'x-cg-demo-api-key': import.meta.env.VITE_API_KEY,
            'Accept': 'application/json'
          },
          params: {
            vs_currency: 'usd',
            order: isOrder,
            per_page: isPage,
            page: 1,
            sparkline: false
          }
        });

        setCryptoData(response.data);
      } catch (err) {
        setError(err.message);
      }
      finally {
        setLoading(false);
      }
    };
    fetchCryptoData()
  }, [isPage, isOrder])

  const filteredCoins = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>

      <Routes>
        <Route path='/' element={<HomePage filter={filter} setFilter={setFilter} loading={loading} error={error} filteredCoins={filteredCoins} setIsPage={setIsPage} setIsOrder={setIsOrder} />} />
        <Route path='/coin/:id' element={<CoinDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

    </>
  )
}

export default App
