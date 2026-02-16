import FilterInput from "./filterInput";


function Header({ onChange, onchange, filter, onFilterChange }) {
    return (
        <div className="m-3 ">
            <h1 className="text-xl mb-3 text-white md:text-3xl font-bold">Crypto Dashboard</h1>
            <div className="flex gap-1 md:gap-3 w-full justify-between">
                <FilterInput filter={filter} onFilterChange={onFilterChange} />
                <div className="flex gap-1 md:gap-3">
                    <select name="page" className="text-white border-gray-300 border rounded" id="select" onChange={onChange} >
                        <option className="text-white bg-blue-950" value="10">10</option>
                        <option className="text-white bg-blue-950" value="50">50</option>
                        <option className="text-white bg-blue-950" value="100">100</option>
                    </select>
                    <select name="order" className="text-white text-sm border-gray-300 border rounded" id="order" onChange={onchange}>
                        <option className="text-white bg-blue-950" value="market_cap_desc">Market Cap Desc.</option>
                        <option className="text-white bg-blue-950" value="market_cap_asc">Market Cap Asc.</option>
                        <option className="text-white bg-blue-950" value="volume_desc">Volume Desc.</option>
                        <option className="text-white bg-blue-950" value="volume_asc">Volume Asc.</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Header;