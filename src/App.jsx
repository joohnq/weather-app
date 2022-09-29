import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import './App.css'

const VITE_API_GEOCODING = import.meta.env.VITE_API_GEOCODING
const VITE_API_KEY = import.meta.env.VITE_API_KEY

export const App = () => {
  const [ufs, setUfs] = useState([])
  const [cities, setCities] = useState([])
  const [selectedUf, setSelectedUf] = useState("0")
  const [selectedUfName, setSelectedUfName] = useState("")
  const [selectedCity, setSelectedCity] = useState("0")
  const [localInfo, setLocalInfo] = useState([])

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

  function handleSubmit(e){
    e.preventDefault()

    axios.get(`${VITE_API_GEOCODING}${selectedCity}&limit=10&appid=${VITE_API_KEY}`).then(response => response.data).then(data => {
      for(let item of data){
        if(item.state == selectedUfName){
          console.log(item)
        } 
    }
  })
  }
  
  return (
    <div className='app'>
        <h1>Weather App</h1>
      <form>
        <select name="uf" id="uf" onChange={(e) => {setSelectedUf(e.target.value)}}>
          <option value="0">Selecione o Estado</option>
          {ufs.map(uf => (
            <option key={uf.id} value={uf.sigla} name={uf.nome} >{uf.nome}</option>
          ))}
        </select>

        <select name="city" id="city" onChange={(e) => setSelectedCity(e.target.value)}>
          <option value="0">Selecione a Cidade</option>
          {cities.map(city => (
            <option key={city.id} value={city.sigla}> {city.nome}</option>
          ))}
        </select>

        <button type="submit" onClick={(e) => handleSubmit(e)}><FaSearch /></button>
      </form>
    </div>
  )
}
