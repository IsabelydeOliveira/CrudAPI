const express = require('express')
const app = express()
const mongoose = require('mongoose')

//forma de ler JSON
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(express.json())

//Rotas da API
const personRoutes = require('./routes/personRoutes')
app.use('/person', personRoutes)
//Rota inicial /endpoinT
app.get('/', (rec, res)=>{
    //mostrar requisição
    res.json({message: 'oi express'})
})
//Entregar uma porta
const DB_USER = 'isabelycavalcanteoliveira';
const DB_PASSWORD = encodeURIComponent('YHltcUlWWoAxgveo');
const DB_HOST = 'apicluster.0qu8yjb.mongodb.net';
const DB_NAME = 'banco de dados';

mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`
)
.then(()=>{
    console.log("conectando ao mongoDB")
    app.listen(3000)
}).catch((err)=>{
    console.log(err)
})
