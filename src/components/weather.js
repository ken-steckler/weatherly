import React from "react";
import "./styles.css";
import moment from "moment";
import { Button } from "semantic-ui-react";
import sunny from "../img/sunny.png";

const refresh = () => {
  window.location.reload();
};

const WeatherCard = ({ weatherData }) => (
  <div className="main">
    <div className="top">
      <p className="header">{weatherData.name}</p>
      <Button
        className="button"
        inverted
        color="blue"
        circular
        icon="refresh"
        onClick={refresh}
      />
    </div>
    <div className="flex">
      <div className="center">
        <p className="day">
          {moment().format("dddd")}, <span>{moment().format("LL")}</span>
          {/* <br />
          <img className="clear" src={sunny} alt="clear" /> */}
        </p>
        <p className="description">{weatherData.weather[0].main}</p>
      </div>
    </div>

    <div className="divider"></div>

    <div className="flex">
      <p className="temp">
        Temprature: {Math.round(weatherData.main.temp)} &deg;F
      </p>
      <p className="temp">Humidity: {weatherData.main.humidity} %</p>
    </div>

    <div className="flex">
      <p className="sunrise-sunset">
        Sunrise:{" "}
        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p className="sunrise-sunset">
        Sunset:{" "}
        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
    </div>
  </div>
);

export default WeatherCard;
