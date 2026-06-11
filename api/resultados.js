import fetch from "node-fetch";
import * as cheerio from "cheerio"; // librería para parsear HTML

export default async function handler(req, res) {
  try {
    const response = await fetch("https://resultadosegundavuelta.onpe.gob.pe/main/resumen");
    const html = await response.text();

    // Usamos cheerio para leer el HTML
    const $ = cheerio.load(html);

    // Aquí debes inspeccionar el HTML de ONPE y extraer los datos correctos
    // Ejemplo: supongamos que los votos están en un span con clase .votos
    const candidato1 = {
      nombre: "Keiko Fujimori",
      votos: parseInt($("#candidato1 .votos").text().replace(/\D/g, "")),
      porcentaje: $("#candidato1 .porcentaje").text()
    };

    const candidato2 = {
      nombre: "Roberto Sánchez",
      votos: parseInt($("#candidato2 .votos").text().replace(/\D/g, "")),
      porcentaje: $("#candidato2 .porcentaje").text()
    };

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.json({ candidatos: [candidato1, candidato2] });
  } catch (error) {
    res.status(500).send("Error obteniendo datos de ONPE");
  }
}
