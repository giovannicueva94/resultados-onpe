export default async function handler(req, res) {
  try {
    const response = await fetch("https://resultadosegundavuelta.onpe.gob.pe/main/resumen");
    const data = await response.text(); // si ONPE devuelve HTML
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send(data);
  } catch (error) {
    res.status(500).send("Error obteniendo datos de ONPE");
  }
}
