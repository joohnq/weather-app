import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import './App.css'

export const App = () => {
  const [cityName, setCityName] = useState("")

  return (
    <div className='app'>
      <form>
        <input type="text" 
        placeholder='Digite a cidade a ser pesquisada'
        onChange={(e) => setCityName(e.target.value)}
        value={cityName}/>
        <button type="submit"><FaSearch /></button>
      </form>
    </div>
  )
}
