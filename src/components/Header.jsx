

function Header({onChange}) {
    return ( 
        <div className="flex m-3 justify-between">
            <h1 className="text-xl text-white md:text-3xl font-bold">Crypto Dashboard</h1>
            <select name="page" className="text-white border-gray-300 border rounded" id="select" onChange={onChange} >
                <option className="text-white bg-blue-950" value="10">10</option>
                <option className="text-white bg-blue-950" value="50">50</option>
                <option className="text-white bg-blue-950" value="100">100</option>
            </select>
        </div>
     );
}

export default Header;