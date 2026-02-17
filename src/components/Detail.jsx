
function Detail({ data, value}) {
    return ( 
        <div className="border-gray-500 border rounded-2xl p-4">
            <h3 className="text-gray-400">{data}</h3>
            <p className="text-white">{value}</p>
        </div>
     );
}

export default Detail;