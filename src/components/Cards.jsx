import { Link } from "react-router-dom";
import { FaArrowTrendDown } from "react-icons/fa6";
import { HiArrowTrendingUp } from "react-icons/hi2";

function Card({ coin }) {
    return (
        <Link to={`/coin/${coin.id}`} >
            <div key={coin.id} className="coin_card bg-[#15181f] rounded-4xl border border-gray-600 p-4 transition hover:border-blue-400">
                <div className="flex justify-between place-items-center">
                    <div className="flex place-items-center gap-2">
                        <img src={coin.image} alt={coin.name} className="w-12 h-12" />
                        <div>
                            <h1 className="text-white text-xl font-bold">{coin.name}</h1>
                            <p className="text-gray-500">{coin.symbol.toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="rounded p-0.5" style={coin.price_change_percentage_24h >= 0 ? { backgroundColor: '#173027' } : { backgroundColor: '#361e24' }}>
                        <p className="z-10" style={coin.price_change_percentage_24h >= 0 ? { color: '#49de80' } : { color: '#de2828' }}>{coin.price_change_percentage_24h >= 0 ? <HiArrowTrendingUp className="inline mr-1" /> : <FaArrowTrendDown className="inline mr-1" />}{coin.price_change_percentage_24h?.toFixed(2) == null ? '0.00' : coin.price_change_percentage_24h?.toFixed(2)}%</p>
                    </div>
                </div>
                <h2 className="text-white text-2xl font-bold my-2.5">${coin.current_price.toLocaleString()}</h2>
                <div className="flex gap-9">
                    <div>
                        <h3 className="text-gray-500 font-semibold">Market Cap</h3>
                        <p className="text-white">${coin.market_cap.toLocaleString()}</p>
                    </div>
                    <div>
                        <h3 className="text-gray-500 font-semibold">24h Volume</h3>
                        <p className="text-white">${coin.total_volume.toLocaleString()}</p>
                    </div>
                </div>
            </div>
        </Link>


    );
}

export default Card;