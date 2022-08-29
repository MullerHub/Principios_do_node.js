const express = require('express')
const { v4: uuidv4 } = require('uuid')
const app = express()

const customers = []

// Middleware
function verificaCPF(request, response, next) {
  const { cpf } = request.headers

  const customer = customers.find(customer => customer.cpf === cpf)

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found' })
  }

  request.customer = customer

  return next()
}

app.use(express.json())

app.post('/account', (request, response) => {
  const { cpf, name } = request.body

  const verificaCPF = customers.some(customer => customer.cpf === cpf)

  if (verificaCPF) {
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

// app.use(verificaCPF) se utilizar o app.use, tudo que vier abaixo passará por este middware, nesta aplicação irei utilizar o verificaCPF dentro de cada chamada necessaria

app.get('/statement', verificaCPF, (request, response) => {
  const {
     customer } = request;
  return response.json(customer.statement)
})


app.post('/deposit', verificaCPF, (request, response) => {
  const { description, amount } = request.body;
})

/*
app.delete('/account/:id', (request, response) => {

}) 

/*  Rota para rodar a aplicação, colocar no browser: localhost: "numero do app.listen abaixo"  /  "rota do site, que nessa aplicação seria /account"
Ficaria no browser este link: http://localhost:3333/account
*/

app.listen(3333)
