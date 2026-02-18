import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    Filler
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Legend,
    TimeScale,
    Filler
);


function CoinChart({ coinId }) {
    const [chartData, setChartData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [days, setDays] = useState(7);
    useEffect(() => {
        const fetchCoinDetails = async () => {
            try {
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=${days}`, {
                    headers: {
                        'x-cg-demo-api-key': import.meta.env.VITE_API_KEY,
                    }
                });
                const data = await response.json();

                const prices = data.prices.map((price) => ({
                    x: price[0],
                    y: price[1],
                }));

                setChartData({
                    datasets: [
                        {
                            label: 'Price (USD)',
                            data: prices,
                            fill: true, // Area under the line is filled
                            borderColor: '#007bff', // Line color
                            BsBorderWidth: 2,
                            backgroundColor: (context) => {
                                const ctx = context.chart.ctx;
                                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                                gradient.addColorStop(0, 'rgba(25, 127, 237, 0.4)'); // Red top
                                gradient.addColorStop(1, 'rgba(25, 127, 237, 0)');   // Transparent bottom
                                return gradient;
                            }, // Fill color
                            pointRadius: 0, // Hides points
                            hoverRadius: 5, // Point size on hover
                            tension: 0.4, // Smooths out the line
                        },
                    ],
                });
            }
            finally {
                setLoading(false);
            }
        };
        fetchCoinDetails();
    }, [coinId, days]);
    const options = {
        responsive: true,
        plugins: {
            legend: { display: false }, // Hide the legend
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#fff',
                bodyColor: '#fff',
                mode: 'index',
                intersect: false,
            }, // Tooltip appears when hovering near a point
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: days === 1 ? 'hour' : 'day', // Show hours for 24h, days for longer periods
                    tooltipFormat: 'MMM d, yyyy h:mm a', // Tooltip date format
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)',
                    display: true, // Hide vertical grid lines for a cleaner look
                },
                ticks: {
                    color: '#94a3b8', // Muted grey text
                    maxTicksLimit: 8,
                },
            },
            y: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.05)', // Very subtle horizontal lines
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8',
                    callback: (value) => `$${value.toLocaleString()}`, // Format numbers like $25,000
                },
            }
        },
    }

    if (loading) return <p>Loading chart...</p>;
    return (
        <div className="p-6 rounded-xl border border-gray-800" style={{ height: 'fit-content' }}>
            <div className="flex justify-between place-content-center mb-4">
                <p className="text-gray-400 text-[16px] md:text-2xl font-medium">Price Chart</p>
                <div className="flex gap-2 mb-4">
                    {[{ label: '24h', value: 1 },
                    { label: '7d', value: 7 },
                    { label: '30d', value: 30 },
                    { label: '1y', value: 365 }].map(btn => (
                        <button
                            key={btn.value}
                            onClick={() => setDays(btn.value)}
                            className={`px-3 cursor-pointer py-1 rounded text-xs font-bold transition ${days === btn.value ? 'bg-[#1f8fff] text-[#0d1217]' : ' text-white hover:bg-gray-700'}`}
                        >
                            {btn.label}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <Line data={chartData} options={options} />
            </div>
        </div>
    );
}

export default CoinChart;