'use strict'
import  Express  from "express"
import { test, register, login, update, deleteU } from './user.controller.js'


const api = Express.Router()

api.get('/test', test )
api.post('/register',register)
api.post('/login',login)
api.put('/update/:id',update)
api.delete('/delete/:id', deleteU)

export default api//const tengo que utilizar el nombre que esta en este archivo
//importar con otro nombre