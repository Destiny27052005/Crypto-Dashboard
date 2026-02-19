import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TailSpin } from 'react-loader-spinner'
import { FaArrowTrendDown } from "react-icons/fa6";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { FaArrowLeft } from "react-icons/fa6";
import Detail from "../components/Detail";
import CoinChart from "../components/CoinChart";



function CoinDetails() {
    const { id } = useParams();
    const [coin, setCoin] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`/gecko/coins/${id}`, {
                    headers: {
                        'x-cg-demo-api-key': import.meta.env.VITE_API_KEY,
                    }
                });
                const data = await response.json();
                setCoin(data);
            } catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };
        fetchCoinDetails();
    }, [id]);
    return (
        <>
            <div className="max-w-6xl m-auto p-4">
                <Link to="/" className="text-gray-300 flex place-items-center gap-2"><FaArrowLeft className="text-gray-300" />Back</Link>
                {loading &&
                    <TailSpin
                        height="40"
                        width="40"
                        color="#4fa94d"
                        ariaLabel="tail-spin-loading"
                        visible={loading}
                    />}
                {error && <p className="text-red-500">Error: {error}</p>}
                {coin && (
                    <div className="mt-4">
                        <div className="flex place-items-center gap-4 mb-10">
                            <img src={coin.image?.small || coin.image?.thumb || coin.image?.large} alt={coin.name} />
                            <div>
                                <div className="flex place-items-center gap-2">
                                    <h1 className="text-4xl font-bold text-white">{coin.name}</h1>
                                    <p className="text-gray-500 text-xl bg-[#21262e] rounded py-0.5 px-2">{coin.symbol.toUpperCase()}</p>
                                    <p className="text-gray-500 bg-[#21262e] rounded py-0.5 px-2">#{coin.market_cap_rank}</p>
                                </div>
                                <div className="flex place-items-center gap-2">
                                    <h2 className="text-4xl font-semibold text-white">${coin.market_data.current_price?.usd?.toLocaleString() || "N/A"}</h2>
                                    <p className={`${coin.market_data.price_change_percentage_24h?.toFixed(2) >= 0 ? "text-green-500" : "text-red-500"} ${coin.market_data.price_change_percentage_24h?.toFixed(2) >= 0 ? "bg-green-900/30" : "bg-red-900/30"} flex place-items-center gap-1 px-1 py-0.5 rounded-sm`}>{coin.market_data.price_change_percentage_24h.toFixed(2) >= 0 ? <HiArrowTrendingUp className="text-green-500" /> : <FaArrowTrendDown className="text-red-500" />}{coin.market_data.price_change_percentage_24h?.toFixed(2) || "N/A"}%</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4">
                            <CoinChart coinId={coin.id} />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mt-6">
                            <Detail data="Market Cap" value={`$${coin.market_data.market_cap?.usd?.toLocaleString() || "N/A"}`} />
                            <Detail data="24h Volume" value={`$${coin.market_data.total_volume?.usd?.toLocaleString() || "N/A"}`} />
                            <Detail data="24h High" value={`$${coin.market_data.high_24h?.usd?.toLocaleString() || "N/A"}`} />
                            <Detail data="24h Low" value={`$${coin.market_data.low_24h?.usd?.toLocaleString() || "N/A"}`} />
                            <Detail data="7d Change" value={`$${coin.market_data.price_change_7d?.usd?.toLocaleString() || "N/A"}`} />
                            <Detail data="30d Change" value={`$${coin.market_data.price_change_30d?.usd?.toLocaleString() || "N/A"}`} />
                            <Detail data="Circulating Supply" value={`${coin.market_data.circulating_supply?.toLocaleString() || "N/A"} ${coin.symbol.toUpperCase()}`} />
                            <Detail data="All-Time Supply" value={`${coin.market_data.total_supply?.toLocaleString() || "N/A"} ${coin.symbol.toUpperCase()}`} />
                        </div>
                        <div className="border-gray-500 border rounded-2xl p-4 mt-8">
                            <h4 className="text-gray-400 text-2xl">About {coin.name}</h4>
                            <p className="text-gray-300 line-clamp-6 mt-3">{coin.description?.en || "No description available."}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default CoinDetails;