import React from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import WeatherToday from "./WeatherToday";
import './App.css';

function App() {
  return (
    <BrowserRouter basename='/'>
    <div className="App">
     {/* <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/Weather-Today">Weather Today</Link></li>
     </ul> */}
     <Route exact path="/" component={Home} />
     <Route path="/Weather-Today" component={WeatherToday} />
    </div>
   </BrowserRouter>
  );
}

const Home = () => <div></div>

export default App;
