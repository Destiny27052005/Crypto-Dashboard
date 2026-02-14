function FilterInput({ filter, onFilterChange }) {
    return ( 
        <div className="w-full md:w-1/2">
            <input type="text" placeholder="Search..." className="w-full p-2 rounded bg-[#15181f] border border-gray-600 text-white" onChange={(e) => onFilterChange(e.target.value)} value={filter} />
        </div>
     );
}

export default FilterInput;