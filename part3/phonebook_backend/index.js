require('dotenv').config()
const http = require('http')
const express = require('express')
const app = express()
const morgan = require('morgan')
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))

const mongoose = require('mongoose')
const PORT = process.env.PORT

morgan.token('content', function getContent (request) {
  return (JSON.stringify(request.body))
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :content'))

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
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
      response.json(persons)

    })
  })

  app.get('/info', (request, response) => {
    const today = new Date()
    response.send(`Phonebook has info for ${persons.length} people. <br /> ${today}` )
  })

  app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person =>{
      response.json(person)
    })

  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })

  app.post('/api/persons', (request, response) => {
    const body = request.body
  
    if (!body.name) {
      return response.status(400).json({ 
        error: 'name missing' 
      })
    }

    if (!body.number) {
        return response.status(400).json({ 
          error: 'number missing' 
        })
      }

  
    const person = new Person({
        name: body.name,
      number: body.number,
    })

    person.save().then(savedPerson => {
      response.json(savedPerson)
    })
  
  })

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })