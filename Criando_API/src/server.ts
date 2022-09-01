import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json())

app.get("/", (request, response) => {
  return response.json({ message: "Olá Mundo!" })
})

app.use("/categories", categoriesRoutes)

app.listen(3030, () => console.log("Não sei como, mas o codigo tá funcionando!"))