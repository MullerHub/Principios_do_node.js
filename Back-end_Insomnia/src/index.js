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

function getBalance(statement) {
  const balance = statement.reduce((acc, operation) => {
    if (operation.type === 'credit') {
      return acc + operation.amount
    } else {
      return acc - operation.amount
    }
  }, 0)
  return balance
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

/* app.use(verificaCPF) se utilizar o app.use, tudo que vier abaixo passará por este middware, nesta aplicação irei utilizar o verificaCPF dentro de cada chamada necessaria */
app.get('/statement', verificaCPF, (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + ' 00:00')

  return response.json(customer.statement)
})

app.post('/deposit', verificaCPF, (request, response) => {
  const { description, amount } = request.body

  const { customer } = request

  const statementOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.post('/withdraw', verificaCPF, (request, response) => {
  const { amount } = request.body
  const { customer } = request

  const balance = getBalance(customer.statement)

  if (balance < amount) {
    return response.status(400).json({ error: 'Saldo insuficiente' })
  }

  const statementOperation = {
    amount,
    created_at: new Date(),
    type: 'debit'
  }

  customer.statement.push(statementOperation)

  return response.status(201).send()
})

app.get('/statement/date', verificaCPF, (request, response) => {
  const { customer } = request
  const { date } = request.query

  const dateFormat = new Date(date + ' 00:00')

  const statement = customer.statement.filter(
    statement =>
      statement.created_at.toDateString() ===
      new Date(dateFormat).toDateString()
  )

  return response.json(statement)
})

app.put('/account', verificaCPF, (request, response) => {
  const { name } = request.body
  const { customer } = request

  customer.name = name

  return response.status(201).send()
})

app.get('/account', verificaCPF, (request, response) => {
  const { customer } = request

  return response.json(customer)
})

app.delete('/account', verificaCPF, (request, response) => {
  const { customer } = request

  // splice, função javascript de remoção
  customers.splice(customer, 1);

  return response.status(200).json()
})

app.get('/balance', verificaCPF, (request, response) => {
  const { customer } = request

  const balance = getBalance(customer.statement);

  return response.json(balance)
})

app.listen(3333)

/*  Rota para rodar a aplicação, colocar no browser: localhost: "numero do app.listen abaixo"  /  "rota do site, que nessa aplicação seria /account" 
Ficaria no browser este link: http://localhost:3333/account */
