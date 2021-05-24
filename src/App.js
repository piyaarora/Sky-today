import React, { useState, useEffect } from 'react';
import { fetchWeather } from './api/FetchWeather'
import logo from './images/white-logo.png'
import './App.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const search = async (e) => {
    try {
      if (e.key === 'Enter') {
        const data = await fetchWeather(query);
        setWeather(data);
        setQuery('')
        console.log(data)
      }
    } catch (error) {
      notifyError("Enter valid city")
    }

  }
  const notifyError = (msg) => {
    toast.error(msg, {
      position: toast.POSITION.TOP_CENTER
    });
  }

  var [date, setDate] = useState(new Date());

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000)
    return function cleanup() {
      clearInterval(timer)
    }
  })

  const sunrise = () => {
    let unix_timestamp = weather.sys.sunrise
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;

  }
  const sunset = () => {
    let unix_timestamp = weather.sys.sunset
    var date = new Date(unix_timestamp * 1000);
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    return formattedTime;

  }
  return (
    <div className="main-container">
      <ToastContainer />
      <img src={logo} alt="" className="logo" />
      <h1>Enter your city to know about today's weather</h1>
      <input
        type="text"
        className="search"
        placeholder="Enter city name"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={search}
      />
      {/* <i class="fa fa-search" onClick={search}>search</i> */}

      {weather.main && (
        <div className="row main-content">
          <div className="col-12 col-sm-12">
            {/* CARD 2 - 1 year of Premium */}
            <div className="card hydrogen-card">
              <div className="card-content">
                <div className="row head">
                  <div className="col-6">
                    <div className="chip">
                      {weather.name}, {' '}
                      {weather.sys.country}<br />
                      {date.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="" />
                  <div className="col-6 text-right">
                    <div className="time">
                      <h6>Time </h6>
                      {date.toLocaleTimeString()}

                    </div>
                  </div>
                </div>
                <div className="row main">
                  <div className="col-12 weather">
                    <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />

                    <span className="weather-description">{weather.weather[0].description}</span>
                  </div>
                </div>
                <div className="row foot">
                  <div className="col-6">
                    <div className="reading">
                      <svg className="wind-icon" x="0px" y="0px" viewBox="0 0 448 448" xmlSpace="preserve">
                        <g>
                          <g>
                            <path d="M384,112c-35.297,0-64,28.711-64,64c0,8.836,7.156,16,16,16s16-7.164,16-16c0-17.649,14.359-32,32-32s32,14.351,32,32
 s-14.359,32-32,32H17.266c-8.844,0-16,7.164-16,16s7.156,16,16,16H384c35.297,0,64-28.711,64-64S419.297,112,384,112z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M224,48c-35.297,0-64,28.711-64,64c0,8.836,7.156,16,16,16s16-7.164,16-16c0-17.649,14.359-32,32-32s32,14.351,32,32
 s-14.359,32-32,32H16c-8.844,0-16,7.164-16,16s7.156,16,16,16h208c35.297,0,64-28.711,64-64C288,76.711,259.297,48,224,48z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M224,272H16c-8.844,0-16,7.164-16,16s7.156,16,16,16h208c17.641,0,32,14.351,32,32s-14.359,32-32,32s-32-14.351-32-32
 c0-8.836-7.156-16-16-16s-16,7.164-16,16c0,35.289,28.703,64,64,64c35.297,0,64-28.711,64-64C288,300.711,259.297,272,224,272z" />
                          </g>
                        </g>
                      </svg>
                      <span className="wind-value">Speed: {weather.wind.speed} km/h </span>
                    </div>
                    <div className="reading">
                      <svg className="humidity-icon" viewBox="0 0 510.684 510.684"><g><g><path d="m199.242 439.486c-49.257-15.316-82.352-60.297-82.352-111.931 0-25.238 7.901-49.283 22.85-69.536.341-.462.649-.967.906-1.481 2.47-4.939.464-10.938-4.476-13.408-4.471-2.239-9.819-.801-12.625 3.153-17.437 23.688-26.654 51.788-26.654 81.272 0 29.858 9.428 58.247 27.264 82.095 17.24 23.051 41.797 40.43 69.149 48.934.989.308 1.989.454 2.972.454 4.263 0 8.214-2.749 9.546-7.034 1.64-5.274-1.306-10.878-6.58-12.518z" /><path d="m455.573 233.679c0-19.035-5.932-37.17-17.158-52.464l-63.301-93.971c-1.859-2.759-4.967-4.413-8.294-4.413s-6.435 1.654-8.294 4.413l-26.674 39.597-82.474-122.428c-1.858-2.759-4.967-4.413-8.293-4.413s-6.435 1.654-8.293 4.413l-141.576 210.163c-23.622 32.101-36.105 70.177-36.105 110.134 0 102.546 83.428 185.974 185.974 185.974s185.974-83.428 185.974-185.974c0-8.186-.547-16.387-1.61-24.46 18.458-16.276 30.124-40.085 30.124-66.571zm-88.753-122.949 55.005 81.654c.11.17.226.337.347.501 8.767 11.873 13.401 25.979 13.401 40.793 0 37.91-30.842 68.752-68.753 68.752-37.91 0-68.752-30.842-68.752-68.752 0-14.814 4.634-28.92 13.401-40.793.116-.157.227-.317.334-.482l28.323-42.045c.052-.077.106-.153.156-.232zm40.238 213.98c0 91.519-74.456 165.974-165.974 165.974-91.519 0-165.974-74.455-165.974-165.974 0-35.744 11.19-69.799 32.362-98.481.121-.163.238-.334.351-.509l133.262-197.822 78.711 116.842-24.571 36.476c-11.225 15.293-17.157 33.429-17.157 52.463 0 48.938 39.814 88.752 88.752 88.752 14.31 0 27.837-3.409 39.819-9.45.273 3.9.419 7.816.419 11.729z" /><path d="m331.561 231.24c0-4.845.987-9.521 2.933-13.898 2.244-5.047-.029-10.957-5.075-13.2-5.047-2.241-10.956.028-13.2 5.075-3.091 6.952-4.658 14.361-4.658 22.023 0 18.149 9.016 35.019 24.117 45.123 1.708 1.143 3.64 1.689 5.552 1.689 3.226 0 6.392-1.558 8.32-4.439 3.071-4.591 1.84-10.802-2.75-13.873-9.542-6.385-15.239-17.039-15.239-28.5z" /><path d="m236.343 453.34c-2.448-6.434-11.582-8.269-16.31-3.24-5.629 5.455-2.599 15.471 5.12 16.87 7.653 1.677 14.324-6.446 11.19-13.63z" /><path d="m361.552 285.479c6.448 4.466 15.682-.472 15.55-8.31.145-7.839-9.107-12.787-15.55-8.32-5.84 3.66-5.863 12.982 0 16.63z" /></g></g></svg>
                      <span className="humidity-value">Humidity: {weather.main.humidity}% </span>
                    </div>
                    <div className="reading">
                      <svg className="sun-icon" viewBox="0 0 384 384" xmlSpace="preserve">
                        <g>
                          <g>
                            <path d="M101.488,78.864L78.864,56.24c-6.24-6.248-16.384-6.248-22.624,0c-6.248,6.248-6.248,16.376,0,22.624l22.624,22.624
c3.12,3.128,7.216,4.688,11.312,4.688c4.096,0,8.192-1.56,11.312-4.688C107.736,95.24,107.736,85.112,101.488,78.864z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M48,176H16c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h32c8.832,0,16-7.168,16-16C64,183.168,56.832,176,48,176z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M101.488,282.512c-6.24-6.248-16.384-6.248-22.624,0L56.24,305.136c-6.248,6.248-6.248,16.376,0,22.624
c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688l22.624-22.624C107.736,298.888,107.736,288.76,101.488,282.512z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M192,320c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16v-32C208,327.168,200.832,320,192,320
z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M327.76,305.136l-22.624-22.624c-6.24-6.248-16.384-6.248-22.624,0c-6.248,6.248-6.248,16.376,0,22.624l22.624,22.624
c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688C334.008,321.512,334.008,311.384,327.76,305.136z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M368,176h-32c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h32c8.832,0,16-7.168,16-16C384,183.168,376.832,176,368,176
z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M327.76,56.24c-6.24-6.248-16.384-6.248-22.624,0l-22.624,22.624c-6.248,6.248-6.248,16.376,0,22.624
c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688l22.624-22.624C334.008,72.616,334.008,62.488,327.76,56.24z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M192,0c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V16C208,7.168,200.832,0,192,0z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M192,88c-57.344,0-104,46.656-104,104s46.656,104,104,104s104-46.656,104-104S249.344,88,192,88z M192,264
c-39.696,0-72-32.304-72-72s32.304-72,72-72s72,32.304,72,72S231.696,264,192,264z" />
                          </g>
                        </g>
                      </svg>
                      <span className="sun-value">Sunrise: {sunrise()}  </span>
                    </div>
                    <div className="reading">
                      <svg className="sun-icon" viewBox="0 0 384 384" xmlSpace="preserve">
                        <g>
                          <g>
                            <path d="M101.488,78.864L78.864,56.24c-6.24-6.248-16.384-6.248-22.624,0c-6.248,6.248-6.248,16.376,0,22.624l22.624,22.624
c3.12,3.128,7.216,4.688,11.312,4.688c4.096,0,8.192-1.56,11.312-4.688C107.736,95.24,107.736,85.112,101.488,78.864z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M48,176H16c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h32c8.832,0,16-7.168,16-16C64,183.168,56.832,176,48,176z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M101.488,282.512c-6.24-6.248-16.384-6.248-22.624,0L56.24,305.136c-6.248,6.248-6.248,16.376,0,22.624
c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688l22.624-22.624C107.736,298.888,107.736,288.76,101.488,282.512z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M192,320c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16v-32C208,327.168,200.832,320,192,320
z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M327.76,305.136l-22.624-22.624c-6.24-6.248-16.384-6.248-22.624,0c-6.248,6.248-6.248,16.376,0,22.624l22.624,22.624
c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688C334.008,321.512,334.008,311.384,327.76,305.136z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M368,176h-32c-8.832,0-16,7.168-16,16c0,8.832,7.168,16,16,16h32c8.832,0,16-7.168,16-16C384,183.168,376.832,176,368,176
z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M327.76,56.24c-6.24-6.248-16.384-6.248-22.624,0l-22.624,22.624c-6.248,6.248-6.248,16.376,0,22.624
c3.12,3.128,7.216,4.688,11.312,4.688s8.192-1.56,11.312-4.688l22.624-22.624C334.008,72.616,334.008,62.488,327.76,56.24z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M192,0c-8.832,0-16,7.168-16,16v32c0,8.832,7.168,16,16,16c8.832,0,16-7.168,16-16V16C208,7.168,200.832,0,192,0z" />
                          </g>
                        </g>
                        <g>
                          <g>
                            <path d="M192,88c-57.344,0-104,46.656-104,104s46.656,104,104,104s104-46.656,104-104S249.344,88,192,88z M192,264
c-39.696,0-72-32.304-72-72s32.304-72,72-72s72,32.304,72,72S231.696,264,192,264z" />
                          </g>
                        </g>
                      </svg>
                      <span className="sun-value">Sunset: {sunset()}  </span>
                    </div>

                  </div>
                  <div className="col-6 temperature">
                    <span>
                      {Math.round(weather.main.temp)}°
                    </span>
                    <h6>Feels like:  {Math.round(weather.main.feels_like)}° </h6>
                  </div>
                </div>
              </div>
            </div>
          </div></div>


      )}
    </div>
  );
}

export default App;
