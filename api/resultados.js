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

  // JSON fijo de prueba
  const candidato1 = { nombre: "Candidato A", votos: 9034071, porcentaje: "50.002" };
  const candidato2 = { nombre: "Candidato B", votos: 9033312, porcentaje: "49.998" };

  res.status(200).json({ candidatos: [candidato1, candidato2] });
}
