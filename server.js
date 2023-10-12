const express = require("express");
const axios = require("axios");
require("dotenv").config();
const iplocation = require("iplocation").default;
const requestIp = require("request-ip");

const app = express();
const PORT = process.env.PORT || 3000;

const API_KEY = process.env.API_KEY;

app.get("/weather", async (req, res) => {
  const city = req.query.city;

  if (!city) {
    return res.status(400).send({ error: "You should provide the city" });
  }

  try {
    const ip = req.clientIp;
    const location = await iplocation(ip);
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${API_KEY}`
    );
    res.send({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (error) {
    res.status(500).send({ error: "Hubo un error al obtener el clima." });
  }
});

app.listen;
