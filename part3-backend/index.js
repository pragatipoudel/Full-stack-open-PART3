require('dotenv').config()
const Person = require('./models/person')
const express = require('express');
const morgan = require('morgan');
const cors = require('cors')

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body))

app.use(express.static('build'))
app.use(express.json());
app.use(cors());
const logger = morgan((tokens, req, res) => {
    if (tokens.method(req, res) === 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms', 
            tokens.body(req, res)
        ].join(' ')
    } else {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms', 
        ].join(' ')
    }
})
app.use(logger)

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
];

app.get('/info', (request, response) => {
    const dateNow = new Date();
    response.send(`<p>Phonebook has info for ${persons.length} people.</p><p>${dateNow}</p> `)
})

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndRemove(request.params.id)
        .then(result => {
            response.status(204).end()
        })
        .catch(error => next(error))
})

const generateId = () => {
    const id = Math.random() * 10000;
    return id;
}

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'Name or number missing'
        })
    };

    if (persons.some(person => person.name === body.name)) {
        return response.status(400).json({
            error: 'Name must be unique'
        })
    }

    const person = new Person({
        name: body.name,
        number: body.number

    })
    person.save().then(savedPerson => {
        response.json(person);
    })
})
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
