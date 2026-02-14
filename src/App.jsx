import { useState, useEffect } from "react"
import axios from "axios"
import Header from "./components/Header"
import Card from "./components/Cards"

function App() {
  const [cryptoData, setCryptoData] = useState([])
  const [isPage, setIsPage] = useState(10)
  // const pages = 10;
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
            order: 'market_cap_desc',
            per_page: isPage,
            page: 1,
            sparkline: false
          }
        });

        setCryptoData(response.data);
      } catch (error) {
        if (error.response) {
          console.error('API Error:', error.response.status, error.response.data);
        } else {
          console.error('Request Error:', error.message);
        }
      }
    };
    fetchCryptoData()
  }, [cryptoData, isPage])



  return (
    <>
      <Header onChange={(e) => setIsPage(e.target.value)} />
      <div className="cards max-w-6xl mx-auto  p-4">
        {cryptoData.map(coin => (
          <Card key={coin.id} coin={coin} />
        )
        )}
      </div>
    </>
  )
}

export default App
