const chais = require("chai");
const chaiHttp = require("chai-http");
const nock = require("nock");

require("dotenv").config();
const API_KEY = process.env.API_KEY;

chais.use(chaiHttp);
const { expect } = chais;

describe("GET /weather", () => {
  beforeEach(() => {
    nock("https://api.openweathermap.org")
      .get(`/data/2.5/weather?q=Medellín&appid=${API_KEY}`)
      .replay(200, {
        name: "Medellín",
        main: { temp: 20 },
        weather: [{ description: "nublado" }],
      });
  });

  it("debe obtener el clima para Medellín", (done) => {
    chais
      .request(app)
      .get("/weather")
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.city).to.equal("Medellín");
        expect(res.body.temperature).to.equal(20);
        expect(res.body.description).to.equal("nublado");
        done();
      });
  });
});
