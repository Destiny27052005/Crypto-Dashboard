
import { TailSpin } from 'react-loader-spinner'
import Header from '../components/Header';
import Card from '../components/Cards';

function HomePage({ filter, setFilter, loading, error, filteredCoins, setIsPage, setIsOrder }) {
    return (
        <div className="max-w-6xl mx-auto">
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
                    <main className="cards  p-4">
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
        </div>
    );
}

export default HomePage;