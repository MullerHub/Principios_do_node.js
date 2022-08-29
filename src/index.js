const express = require('express')

const app = express()
app.use(express.json())

app.get('/curso', (request, response) => {
  return response.json(['curso 1, curso 2, curso 3'])
})

// referencia de uso do Body Params
app.post('/curso', (request, response) => {
  const body = request.body
  console.log(body)
  return response.json(['curso 11, curso 22, curso 33'])
})

// Referencia do uso de Query Params
app.put('/curso/:id', (request, response) => {
  const params = request.params
  console.log(params)
  return response.json(['curso 111, curso 222, curso 333'])
})

app.patch('/curso/:id', (request, response) => {
  return response.json(['curso 111, curso 222 mudou, curso 333'])
})

app.delete('/curso/:id', (request, response) => {
  return response.json(['curso 111, curso 222 mudou,'])
})

/*  Rota para rodar a aplicação, colocar no browser: localhost: "numero do app.listen abaixo"  /  "rota do site, que nessa aplicação seria /curso"
Ficaria no browser este link: http://localhost:3333/curso
*/

app.listen(3333)
