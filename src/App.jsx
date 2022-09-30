import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { WiHumidity, WiBarometer, WiThermometer, WiThermometerExterior, WiCloudyWindy, WiDayCloudyWindy } from 'react-icons/Wi'
import "./App.css";

const VITE_API_KEY = import.meta.env.VITE_API_KEY;
const VITE_API_WEATHER = import.meta.env.VITE_API_WEATHER

export const App = () => {
  const [city, setCity] = useState("");
  const [nameCity, setNameCity] = useState("")
  const [uf, setUf] = useState("")
  const [temp, setTemp] = useState("")
  const [feelsLike, setFeelsLike] = useState("")
  const [humidity, setHumidity] = useState("")
  const [pressure, setPressure] = useState("")
  const [tempMax, setTempMax] = useState("")
  const [tempMin, setTempMin] = useState("")
  const [windy, setWindy] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();

   axios.get(`${VITE_API_WEATHER}${city}&units=metric&${VITE_API_KEY}&lang=pt_br`).then(response => response.data).then(data => {
    setNameCity(data.name)
    setUf(data.sys.country)
    setTemp(data.main.temp)
    setFeelsLike(data.main.feels_like)
    setHumidity(data.main.humidity)
    setPressure(data.main.pressure)
    setTempMax(data.main.temp_max)
    setTempMin(data.main.temp_min)
    setWindy(data.wind.speed)
   });
  };

  return (
    <div className="app">
      <h1>Weather App <WiDayCloudyWindy /></h1>
      <section className="container">
        <form>
          <input
            type="text"
            value={city}
            placeholder="Digite o nome da cidade:"
            onChange={(e) => setCity(e.target.value)}
          />
          <button type="submit" onClick={(e) => handleSubmit(e)}>
            <FaSearch />
          </button>
        </form>

        <div>
          <div className="row"></div>
          <div className="city">
            <h2>{nameCity}</h2>
            <p>{uf}</p>
          </div>
          <div className="temp">
            <p>Temperatura: <strong>{temp}°C</strong></p>
            <p>Sensação térmica: <strong>{feelsLike}°C</strong></p>
          </div>
          <div className="description">
            <img src="http://openweathermap.org/img/wn/01d@2x.png" width="100px" height="100px"></img>
            <p>Céu Limpo</p>
          </div>
          <div className="geralInfo">
            <p><WiHumidity /> Humidade: <strong> {humidity}%</strong></p>
            <p><WiBarometer /> Pressão: <strong> {pressure} hPa</strong></p>
            <p><WiThermometer /> Temp. Máxima: <strong> {tempMax}°C</strong></p>
            <p><WiThermometerExterior /> Temp. Minima: <strong> {tempMin}°C</strong></p>
            <p><WiCloudyWindy /> Vel. vento <strong> {windy} m/s</strong></p>
          </div>
        </div>
      </section>
    </div>
  );
};
