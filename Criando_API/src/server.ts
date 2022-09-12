import express from "express";
import { router } from "./routes";
import swaggerUi from 'swagger-ui-express'
const swaggerFile = require('./swagger.json')  // pode dar erro, precisa de revisão aprofundada em importação .json no ts
import "./database"

const app = express();

app.use(express.json())

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(router)

app.listen(3032, () => console.log("Não sei como, mas o codigo tá funcionando!"))