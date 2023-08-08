import { useEffect, useState } from 'react';
import axios from 'axios';
import './climaAPI.css'

export const ClimaApi = () => {
  const [temperature, setTemperature] = useState('Cargando...');
  const [onlyTemp, setOnlyTemp] = useState('Cargando...');

  useEffect(() => {
    const apiKey = 'a136bf3138f0106c0aea03c4087eb0fc'; // Reemplaza  con tu clave de API de OpenWeatherMap
    const city = 'San Miguel de Tucuman'; // Reemplaza con el nombre de la ciudad para la que deseas obtener la temperatura
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    axios.get(apiUrl)
      .then(response => {
        const temperatureData = response.data.main.temp;
        setTemperature(`${city} ${temperatureData}°C`);
        setOnlyTemp(`${temperatureData}°C`);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la API:', error);
        setTemperature('Error al obtener la temperatura.');
      });
  }, []);

  return (
      <div className='clima-api'>
        <span className='allClima'><i className="fa-solid fa-temperature-half"></i>{temperature}</span>
        <span className='soloTemp'><i className="fa-solid fa-temperature-half"></i>{onlyTemp}</span>
      </div>
  );
};


