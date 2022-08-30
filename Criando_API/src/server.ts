import express from "express";

const app = express();

app.get("/", (request, response) => {
  return response.json({ message: "Olá Mundo!" })
})

app.post("/curso", (request, response) => {
  const { name } = request.body;
  return response.json({ name })
})

app.listen(3030, () => console.log("Não sei como, mas o codigo tá funcionando!"))