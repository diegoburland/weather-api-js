const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.get("/weather", async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=Medellín&appid=${API_KEY}`
    );
    res.send({
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Hubo un error al obtener el clima." });
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

module.exports = app;
