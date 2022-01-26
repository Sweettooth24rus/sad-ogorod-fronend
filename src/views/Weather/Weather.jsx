import axios from "axios";
import React from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import './Weather.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

const Weather = () => {
    const [weather, setWeather] = React.useState(null);

    React.useEffect(() => {
        getWeather()
    }, [])

    const getWeather = async () => {
        setWeather((await axios.get('/weather/get')).data);
    };

    if (weather){
        const labels = weather.hours.map(hour => hour.time)
        const data = weather.hours.map(item => item.airTemperature.sg)
        return(
            <div className="Weather">
                {weather.hours.length > 0 &&
                <Line data={{
                labels, 
                datasets: [{
                    label: 'Погода',
                    data,
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }]}} />}
            </div>
        )
    }

    return null;
}

export default Weather;
