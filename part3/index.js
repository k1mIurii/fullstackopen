const express = require('express')
const app = express()
app.use(express.json())

let persons = [
  {
    "id": "1",
    "name": "Arto Hellas",
    "number": "040-123456"
  },
  {
    "id": "2",
    "name": "Ada Lovelace",
    "number": "39-44-5323523"
  },
  {
    "id": "3",
    "name": "Dan Abramov",
    "number": "12-43-234435"
  },
  {
    "id": "4",
    "name": "Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  const now = new Date();
  const html = `<p>Phonebook has info for ${persons.length} people</p>\n<p>${now.toString()}</p>`
  response.send(html)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(p => p.id === id)
  response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(p => p.id !== id)
  response.status(204).end()
})

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map(n => Number(n.id))) : 0
  return String(maxId + 1)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('body', body)
  if (!body || !body.name || !body.number) {
    return response.status(400).json({
      error: "Invalid request"
    })
  }

  const exist = persons.find(p => p.name === body.name)
  if (exist) {
    return response.status(400).json({
      error: 'Name must be unique'
    })
  }

  const newPerson = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(newPerson)
  response.json(newPerson)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})