import axios from 'axios'
const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = 'df4ca3a5d3c5d48f09cce5cbf3242a8d';
export const fetchWeather = async (query) => {
    const { data } = await axios.get(URL, {
        params: {
            q: query,
            units: 'metric',
            APPID: API_KEY,
        }
    });

    return data
}