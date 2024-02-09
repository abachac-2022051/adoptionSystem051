'use strict'

import animal from './animals.model.js'

export const test = (req, res)=>{
    console.log('test is running')
    return res.send({message: 'Test is running'})
}

export const regist = async(req, res)=>{
    try{
        let data = req.body
        let animal = new animal(data)
        await animal.save()
        return res.send({message: `Registered successfully, can be logged with name ${animal.name}`})

    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'Error registering animal', err: err})
    }
}