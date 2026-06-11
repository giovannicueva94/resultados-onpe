import fetch from "node-fetch";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  // Manejo de preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // Encabezados CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  try {
    const response = await fetch("https://resultadosegundavuelta.onpe.gob.pe/main/resumen");
    const html = await response.text();
    const $ = cheerio.load(html);

    // Cada candidato está dentro de un <article>
    const bloques = $("article");

    const candidato1 = {
      nombre: bloques.eq(0).find(".tarjeta-candidato_info h2").text().trim(),
      votos: parseInt(
        bloques.eq(0).find(".tarjeta-candidato_votos").text().replace(/\D/g, "")
      ),
      porcentaje: bloques.eq(0).find(".tarjeta-candidato_porcentaje").text().trim()
    };

    const candidato2 = {
      nombre: bloques.eq(1).find(".tarjeta-candidato_info h2").text().trim(),
      votos: parseInt(
        bloques.eq(1).find(".tarjeta-candidato_votos").text().replace(/\D/g, "")
      ),
      porcentaje: bloques.eq(1).find(".tarjeta-candidato_porcentaje").text().trim()
    };

    res.status(200).json({ candidatos: [candidato1, candidato2] });
  } catch (error) {
    // Fallback si falla el scraping
    res.status(200).json({
      candidatos: [
        { nombre: "Candidato A", votos: 0, porcentaje: "0%" },
        { nombre: "Candidato B", votos: 0, porcentaje: "0%" }
      ]
    });
  }
}
