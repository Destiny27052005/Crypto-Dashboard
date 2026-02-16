
function Detail({ data, value}) {
    return ( 
        <div>
            <h3 className="text-gray-400">{data}</h3>
            <p className="text-white">{value}</p>
        </div>
     );
}

export default Detail;