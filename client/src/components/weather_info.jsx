
function Weather({data, units}) {
    return(
        <div>
            <div>
                {data.temperature} {units.temperature}
            </div>
            <div>
                feels like {data.feels_like} {units.temperature}
            </div>
            <div>
                precipitation: {data.precipitation}{units.precipitation}
            </div>
            <div>
                humidity: {data.humidity}{units.humidity}
            </div>
            <div>
                wind: {data.wind} {units.wind}
            </div>
        </div>
    )
}

export default Weather