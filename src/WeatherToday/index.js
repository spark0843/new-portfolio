import React from 'react';
import "./style.css";

function WeatherToday(props) {
  console.log(props);
  return (
    <div className="container">
      <header>
        <h1>Weather Today</h1>
        <div className="container">
          <p>
            <span>
              Choose a new location by clicking on the city name below.
            </span>
          </p>
        </div>
        <hr />
      </header>
      
      <main id="main-container">
        <div className="container">
          <div className="data-div">
            <span className="value" id="city">...</span>
            <input type="text" id="input-city" className="inactive" name="" />
          </div>
          <div className="data-div">
            <span className="value" id="desc">...</span><br />
            <div id="img-div">
              <img src={require("./images/10d@2x.png")} alt="" id="desc-img" className="img-fluid" />
              <span className="value" id="dv0">...</span>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="data-div2">
            <div className="row">
              <div className="col-5 offset-1 A">
                <span className="label">Feels Like</span>
                <span className="label">Wind Speed</span>
                <span className="label wind-gust">Wind Gust</span>
                <span className="label">Wind Direction</span>
                <span className="label">Sunrise</span>
                <span className="label">Sunset</span>
              </div>
              <div className="col-5 B">
                <span className="value" id="dv1">...</span>
                <span className="value" id="dv2">...</span>
                <span className="value wind-gust" id="dv3">...</span>
                <span className="value" id="dv4">...</span>
                <span className="value" id="dv5">...</span>
                <span className="value" id="dv6">...</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default WeatherToday;