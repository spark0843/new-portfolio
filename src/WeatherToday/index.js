import React, { useState, useEffect } from "react";
import "./style.css";

import axios from "axios";
import Header from "./components/Header";
import Body from "./components/Body";
import Footer from "./components/Footer";

import { fetchGeolocation, browserGeolocation } from "./middleware/geolocation";

const WEATHERDATA_URL = "https://api.openweathermap.org/data/2.5/weather?";
const WEATHERDATA_APIKEY = "b3cc305bb205466c20e6b12d5aef231f";

function WeatherToday() {

  const [getCityName, setCityName] = useState(null);
  const [getWeatherData, setWeatherData] = useState(null);

  function handleSearch() {
    const city = document.querySelector(".search-bar").value;
    if (city) {
      fetchWeatherData(city);
    }
  }

  function fetchWeatherData(city) {
    // if user searches for a city
    if (city) {
      axios.get(WEATHERDATA_URL + "q=" + city + "&units=metric&appid=" + WEATHERDATA_APIKEY)
      .then(res => {
        const timestamp = Date.now();
        const location = { city: city };
        const weatherData = res.data;
        localStorage.setItem("timestamp", timestamp);
        localStorage.setItem("location", JSON.stringify(location));
        localStorage.setItem("weatherData", JSON.stringify(weatherData));
        setCityName(city);
        setWeatherData(weatherData);
      })
      .catch(err => {
        console.log(err);
      });
    }
    else {
      const locationData = JSON.parse(localStorage.getItem("location"));
      const weatherData = JSON.parse(localStorage.getItem("weatherData"));
      // if we have cached API data
      if (weatherData) {
        setCityName(locationData.city);
        setWeatherData(weatherData);
      }
      else {
        axios.get(WEATHERDATA_URL + "lat=" + locationData.latitude + "&lon=" + locationData.longitude + "&units=metric&appid=" + WEATHERDATA_APIKEY)
        .then(res => {
          localStorage.setItem("weatherData", JSON.stringify(res.data));
          setCityName(locationData.city);
          setWeatherData(res.data);
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  }

  useEffect(() => {

    function getGeolocation() {
      return new Promise((resolve, reject) => {
        fetchGeolocation()
        .then(data => {
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          browserGeolocation()
          .then(data => {
            resolve(data);
          })
          .catch(err => {
            reject(err);
          });
        });
      });
    }

    // check to see if the user has used the app before
    //let firstTime = false;
    let timestamp = localStorage.getItem("timestamp");
    const locationData = localStorage.getItem("location");
    const weatherData = localStorage.getItem("weatherData");

    // if first time user or need to update data
    if (!timestamp || !locationData || !weatherData || Date.now() - timestamp > 600000) { // update every 10 minutes
      getGeolocation()
      .then(data => {
        timestamp = Date.now();
        localStorage.setItem("timestamp", timestamp);
        localStorage.setItem("location", JSON.stringify(data));
        fetchWeatherData();
      })
      .catch(err => {
        console.log(err);
      });
    }
    else {
      setCityName(JSON.parse(locationData).city);
      setWeatherData(JSON.parse(weatherData));
    }

  }, []);

  return (
    <div className="container">
      <header>
        <h1>Weather Today</h1>
        <div className="container search-bar-container">
          <div className="form-group fg-search">
            <input className="search-bar" type="text" placeholder="Search for location"></input>
            <button type="submit" onClick={handleSearch}><i className="fa fa-search"></i></button>
          </div>
        </div>
        <hr />
      </header>
      <main className="main-container">
        <Header city={getCityName} data={getWeatherData} />
        <Body data={getWeatherData} />
        <hr />
        <Footer />
      </main>
    </div>
  )
}

export default WeatherToday;