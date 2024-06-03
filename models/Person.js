const mongoose = require('mongoose')

const Person = mongoose.model('Person',{
    name: String,
    email: String,
    sexo: String,
    cargo: String,
    matricula: String
    
})

module.exports = Person
