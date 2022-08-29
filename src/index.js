const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()

const customers = []

app.use(express.json())

/*  cpf - string
    name - string
    id - uuid  "yarn add uuid"
    statement ["array"]       */

app.post('/account', (request, response) => {
  const { cpf, name } = request.body

  const customerExiste = customers.some(customer => customer.cpf === cpf)

  if (customerExiste) {
    return response.status(400).json({ error: 'Customer já existe!' })
  }

  customers.push({
    cpf,
    name,
    id: uuidv4(),
    statement: []
  })

  return response.status(201).send()
})

app.get('/statement', (request, response) => {
  const { cpf } = request.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found' })
  }

  return response.json(customer.statement)
})

/* 

// Referencia do uso de Query Params
app.put('/account/:id', (request, response) => {
  const params = request.params
  
})

app.patch('/account/:id', (request, response) => {

})

app.delete('/account/:id', (request, response) => {

}) */

/*  Rota para rodar a aplicação, colocar no browser: localhost: "numero do app.listen abaixo"  /  "rota do site, que nessa aplicação seria /account"
Ficaria no browser este link: http://localhost:3333/account
*/

app.listen(3333)
