import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { FaSearch } from "react-icons/fa";
import './App.css'

const VITE_API_KEY = import.meta.env.VITE_API_KEY

export const App = () => {
  return (
    <div className='app'>
        <h1>Weather App</h1>
      <form>

        <button type="submit" onClick={(e) => handleSubmit(e)}><FaSearch /></button>
      </form>
    </div>
  )
}
