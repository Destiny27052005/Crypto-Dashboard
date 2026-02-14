import { useState, useEffect } from "react"
import axios from "axios"
import { TailSpin } from 'react-loader-spinner'
import Header from "./components/Header"
import Card from "./components/Cards"
import FilterInput from "./components/filterInput"

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
  }, [cryptoData, isPage, isOrder])

  const filteredCoins = cryptoData.filter(
    (coin) =>
      coin.name.toLowerCase().includes(filter.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <>
      <Header onChange={(e) => setIsPage(e.target.value)} onchange={(e) => setIsOrder(e.target.value)} filter={filter} onFilterChange={setFilter} />
      {/* <FilterInput  /> */}
      <div className="spinner">
        {loading &&
          <TailSpin
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            visible={loading}
          />}
        {error && (
          <div className='error'>
            <p className="text-white">❌ {error}</p>
          </div>
        )}
      </div>

      {!loading && !error && 
        (
          <main className="cards max-w-6xl mx-auto  p-4">
            {filteredCoins.length > 0 ? (
              filteredCoins.map((coin) => (
                <Card key={coin.id} coin={coin} />
              ))
            ) : (
              <p className="text-white text-center mt-4">No coins match your filter.</p>
            )}  
          </main>
        )
      }
    </>
  )
}

export default App
