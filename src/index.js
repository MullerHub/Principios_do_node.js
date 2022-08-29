const express = require('express')

const app = express()

app.get('/curso', (request, response) => {
  return response.json(['curso 1, curso 2, curso 3'])
})

app.post('/curso', (request, response) => {
  return response.json(['curso 11, curso 22, curso 33'])
})

app.put('/curso/:id', (request, response) => {
  return response.json(['curso 111, curso 222, curso 333'])
})

app.patch('/curso/:id', (request, response) => {
  return response.json(['curso 111, curso 222 mudou, curso 333'])
})

app.delete('/curso/:id', (request, response) => {
  return response.json(['curso 111, curso 222 mudou,'])
})

app.listen(3333)
