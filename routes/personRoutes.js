const router = require('express').Router()
const Person = require('../models/Person')

router.post('./', async (req, res) =>{
//req.body
const {name, email, sexo, cargo, matricula } = req.body

 if (!name) {
        res.status(422).json({error: 'O nome é obrigatório!'})
    }
    const person ={
        name,
        email,
        sexo,
        cargo,
        matricula
    }
    //Create
    try{
        await Person.create(person)
        res.status(201).json({message: 'pessoa criada com sucesso'})
    }catch(error){
        res.status(500).json({error: error})
    }
})
    //Read
    router.get('/', async (req, res)=>{
        try {
         const people = await Person.find() 
         res.status(200).json(people)  
        } catch (error) {
        res.status(500).json({error: error})  
        }
    })    

    //Read (PUT PATCH)
    router.patch('/:id', async (req, res) =>{        
        const id = req.params.id
        const {name, email, sexo, cargo, matricula } = req.body

        const person = {name, email, sexo, cargo, matricula } 

        try {
        const updatePerson = await Person.updateOne({_id: id}, person)
        if (updatePerson.matchedCount === 0) {
          res.status(422).json({message: 'O usuário não foi encontrado!'})
          return  
        }
        res.status(200).json(person)          
        } catch (error) {
        res.status(500).json({error: error})      
        }
    })

    router.delete('/:id', async (req, res) =>{
        const id = req.params.id
        const person = await Person.findOne({_id: id})

        if (!person) {
            res.status(422).json({message: 'O usuário não foi encontrado!'})
        }

        try {
        
            await Person.deleteOne({_id: id})
            res.status(200).json({message: 'O usuário removido com sucesso!'})
            
        } catch (error) {
        res.status(500).json({error: error})     
        }
    })


module.exports = router