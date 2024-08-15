import React, { useState } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
 


 const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=ae14af5d59ee322b2c853bbc7725b6ed`
  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      setLoading(true);
      setError('');
      console.log('Fetching data...');
      fetch(url)
        .then((response) => {
          console.log(response);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setError('Error fetching data');
          setLoading(false);
        });
      setLocation('');
    }
  };

  return (
    <div className="App">
      <div className="app">
        <div className="search">
          <input
            value={location}
            onChange={event => setLocation(event.target.value)}
            onKeyPress={searchLocation}
            placeholder='Enter Location'
            type="text"
          />
        </div>
        <div className="container">
          {loading ? <p>Loading...</p> : null}
          {error ? <p>{error}</p> : null}
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°F</h1> : null}
            </div>
            <div className="description">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
            </div>
          </div>
          {data.name !== undefined &&
            <div className="bottom">
              <div className="feels">
                {data.main ? <p className='bold'>{data.main.feels_like.toFixed()}°F</p> : null}
                <p>Feels Like</p>
              </div>
              <div className="humidity">
                {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
                <p>Humidity</p>
              </div>
              <div className="wind">
                {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
                <p>Wind Speed</p>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
