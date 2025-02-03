
function Weather({data, units}) {
    return(
        <div>
            <div style={{ width: 150, height: 60, fontSize: 48, marginTop: 10 }}>
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