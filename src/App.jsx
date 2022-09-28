import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import './App.css'

export const App = () => {
  // const [countryName, setCountryName] = useState("")
  // const [stateName, setStateName] = useState("")
  // const [cityName, setCityName] = useState("")
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])
  const [selectedUf, setSelectedUf] = useState("0")
  const [selectedCity, setSelectedCity] = useState("0")

  useEffect(() => {
    if (selectedUf === "0") {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  });

  useEffect(() => {
    axios
      .get("https://servicodados.ibge.gov.br/api/v1/localidades/estados/")
      .then((response) => {
        setUfs(response.data);
      });
  }, [selectedUf]);
  
  return (
    <div className='app'>
        <h1>Weather App</h1>
      <form>
        <select name="uf" id="uf" onChange={(e) => setSelectedUf(e.target.value)}>
          <option value="0">Selecione a UF</option>
          {ufs.map(uf => (
            <option key={uf.id} value={uf.sigla}>{uf.nome}</option>
          ))}
        </select>

        <select name="city" id="city" onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="0">Selecione a Cidade</option>
          {cities.map(city => (
            <option key={city.id} value={city.sigla}>{city.nome}</option>
          ))}
        </select>

        <button type="submit"><FaSearch /></button>
      </form>
    </div>
  )
}
