import ClockTemp from '../components/clock_temp';
import { AutoComplete, Input } from 'antd';
import locationsJson from '../data/city_lat_long.json'
import { useEffect, useState } from 'react';
import axios from 'axios'
import Weather from '../components/weather_info';
import TimeTemperatureGraph from '../components/time_graph';
import dayjs from 'dayjs';


function App() {
  const [options, setOptions] = useState([]);
  const [latLong, setLatLong] = useState({
    lat: 40.0077,
    long: -75.1339
  });
  const [cityCountry, setCityCountry] = useState({
    city: 'Philadelphia',
    country: 'United States'
  });
  const [weatherData, setWeatherData] = useState({
    time: [],
    temperature: [],
    feels_like: [],
    precipitation: [],
    humidity: [],
    wind: [],
  });
  const [weatherNow, setWeatherNow] = useState({
    time: "iso8601",
    temperature: 0,
    feels_like: 0,
    precipitation: 0,
    humidity: 0,
    wind: 0
  });
  const [units, setUnits] = useState({
    time: "iso8601",
    temperature_2m: "°F",
    relative_humidity_2m: "%",
    apparent_temperature: "°F",
    precipitation_probability: "%",
    wind_speed_10m: "km/h"
  });
  const [timeWeather, setTimeWeather] = useState({})
  const [todaysDate, setTodaysDate] = useState("");
  const [isAM, setIsAM] = useState(false);

  const [visibleCount, setVisibleCount] = useState(3); 
  const entries = Object.entries(timeWeather); 

  axios.defaults.baseURL = 'https://api.open-meteo.com/v1/forecast';
  
  const filterLocationOptions = (input) => {
    if (!input) {
        setOptions([]);
        return;
    }

    const lower = input.toLowerCase();
    
    // Filter courses dynamically
    const filtered = locationsJson.locations
       .filter((loc) => (loc.city && loc.city.toLowerCase().includes(lower) ||
        (loc.country && loc.country.toLowerCase().includes(lower))))
       .map((loc) => ({ value: `${loc.city}, ${loc.country} | ${loc.lat},${loc.long}` })); 
    setOptions(filtered); 
  };

  const cleanInput = (input) => {
    const cleanLatLong = input.split('|')[1].trim().split(',');
    const cleanCityCountry = input.split('|')[0].trim().split(',');
    console.log('cleanLatLong', cleanLatLong);
    setLatLong({
      lat: cleanLatLong[0],
      long: cleanLatLong[1]
    });
    setCityCountry({
      city: cleanCityCountry[0],
      country: cleanCityCountry[1]
    });
  };

  const cleanTimeTemperatureData = (times, temperatures) => {
    const groupedByDate = {};

    times.forEach((timestamp, idx) => {
      const date = timestamp.split("T")[0]; // Extract YYYY-MM-DD
      const hour = timestamp.split("T")[1]; // Extract hour
      if (!groupedByDate[date]) {
        groupedByDate[date] = [];
      }
      groupedByDate[date].push({time: hour, temperature: temperatures[idx]});
      
    });
    setTimeWeather(groupedByDate);
  }

  const fetchData = async () => {
    const endpoint = `?latitude=${latLong.lat}&longitude=${latLong.long}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,wind_speed_10m&temperature_unit=fahrenheit`;
    const response = await axios.get(endpoint);
    
    setWeatherData({
      time: response.data.hourly.time,
      temperature: response.data.hourly.temperature_2m,
      feels_like: response.data.hourly.apparent_temperature,
      precipitation: response.data.hourly.precipitation_probability,
      humidity: response.data.hourly.relative_humidity_2m,
      wind: response.data.hourly.wind_speed_10m
    });
    setWeatherNow({
      time: response.data.current.temperature_2m,
      temperature: response.data.current.temperature_2m,
      feels_like: response.data.current.apparent_temperature,
      precipitation: response.data.current.precipitation,
      humidity: response.data.current.relative_humidity_2m,
      wind: response.data.current.wind_speed_10m
    });
    setUnits({
      time: response.data.hourly_units.time,
      temperature: response.data.hourly_units.temperature_2m,
      feels_like: response.data.hourly_units.apparent_temperature,
      precipitation: response.data.hourly_units.precipitation_probability,
      humidity: response.data.hourly_units.relative_humidity_2m,
      wind: response.data.hourly_units.wind_speed_10m
    });
    cleanTimeTemperatureData(response.data.hourly.time, response.data.hourly.temperature_2m);
  }

  useEffect(() => {
    const date = new Date(); // Get the current date and time
    setTodaysDate(date.toISOString().split('T')[0]);

    fetchData();
  }, [latLong]);


  const loadMore = () => {
    setVisibleCount((prev) => prev + 2); // Load 5 more entries on each click
  };

  const hide = () => {
    setVisibleCount(3); // Load 5 more entries on each click
  };

  return (
    <div>
      <AutoComplete
        popupClassName="certain-category-search-dropdown"
        popupMatchSelectWidth={400}
        style={{ width: 400 }}
        options={options.length == 0 ? [] : options}
        size="large"
        onSelect={(input) => { cleanInput(input) }}
        onChange={(input) => { filterLocationOptions(input) }}>
        <Input.Search size="large"
          placeholder="Find City Weather..."
          onSearch={(input) => { input && cleanInput(input) }
        }></Input.Search>
      </AutoComplete>
      <div>{cityCountry.city}, {cityCountry.country}</div>
      <Weather data={weatherNow} units={units}/>
      {timeWeather[todaysDate] && <ClockTemp temperatures={timeWeather[todaysDate]} isAM={isAM}/>}
      <button onClick={() => setIsAM(!isAM)}>
        Switch to {isAM ? 'PM' : 'AM'}
      </button>
      {console.log('isAM', isAM)}
      <div  style={{ marginTop: '150px'}}>
        {timeWeather &&
          entries.slice(0, visibleCount).map(([date, weatherData], index) => (
            <div key={index} className="flex-container" style={{ marginTop: '30px' }}>
              <div>{dayjs(date).format('dddd, MMMM D')}</div>
              <div>
                <TimeTemperatureGraph data={weatherData} />
              </div>
            </div>
        ))}
        {visibleCount < entries.length && (
          <button onClick={loadMore} style={{ marginTop: '20px', padding: '10px' }}>
            Load More
          </button>
        )}
        {visibleCount == entries.length && (
          <button onClick={hide} style={{ marginTop: '20px', padding: '10px' }}>
            Hide 
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
