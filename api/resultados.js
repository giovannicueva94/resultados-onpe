import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  try {
    const response = await fetch("https://resultadosegundavuelta.onpe.gob.pe/main/resumen");
    const html = await response.text();
    const $ = cheerio.load(html);

    // Seleccionamos los bloques de candidatos
    const bloques = $("div.card-candidato"); // ajusta según la clase real

    const candidato1 = {
      nombre: bloques.eq(0).find("h2").text().trim(),
      votos: parseInt(bloques.eq(0).find("div:contains('votos')").text().replace(/\D/g, "")),
      porcentaje: bloques.eq(0).find("div:contains('%')").text().trim()
    };

    const candidato2 = {
      nombre: bloques.eq(1).find("h2").text().trim(),
      votos: parseInt(bloques.eq(1).find("div:contains('votos')").text().replace(/\D/g, "")),
      porcentaje: bloques.eq(1).find("div:contains('%')").text().trim()
    };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ candidatos: [candidato1, candidato2] });
  } catch (error) {
    res.status(500).send("Error obteniendo datos de ONPE");
  }
}
