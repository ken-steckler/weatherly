import React, { useEffect, useState } from "react";
import Weather from "./components/weather";
import "./App.css";
import { Dimmer, Loader } from "semantic-ui-react";

const api = {
  key: "ad58305515ce81da0e1c23a16629b3ab",
  base: "https://api.openweathermap.org/data/2.5/",
};

export default function App() {
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function (position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      await fetch(
        `${process.env.REACT_APP_API_URL}/weather/?lat=${lat}&lon=${long}&units=imperial&APPID=${process.env.REACT_APP_API_KEY}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
        });
    };

    fetchData();
  }, [lat, long]);

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setData(result);

          console.log(result);
        });
    }
  };

  return (
    <div
      className={
        typeof data.main != "undefined"
          ? data.main.temp > 90
            ? "App warm"
            : "App cold"
          : "App cold"
      }
    >
      <main>
        <div className="Wrapper">
          <div className="searchbox">
            <input
              type="text"
              className="searchbar"
              placeholder="Search..."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
              onKeyPress={search}
            />
          </div>
        </div>
        {typeof data.main != "undefined" ? (
          <Weather weatherData={data} />
        ) : (
          <div>
            <Dimmer active>
              <Loader>Loading..</Loader>
            </Dimmer>
          </div>
        )}
      </main>
    </div>
  );
}
