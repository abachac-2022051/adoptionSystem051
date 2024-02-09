'use strict'
import User from  './user.model.js'
import { encrypt,checkPassword, checkUpdate } from '../utils/validator.js'

export const test = (req,res)=>{
    return res.send('holisss')
}

export const register = async(req,res)=>{// solo para clientes
    try {
        //capturar la informacion
        let data = req.body  
        console.log(data)  
        //encriptar la contraseña 
        data.password = await encrypt(data.password)
        //asignar rol por defecto
        data.role = 'CLIENT'
        // crear una instancai el modelo 
        let user = new User(data)
        //gurdar la informacion
        await user.save()
        //responder al usuario
        return res.send({message: 'Registered successfully'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error registering user'+ err} )      
    }
}
export const login = async(req,res)=>{
    try {
        //capture la informacion
        let{username,password} = req.body
        //validad que el usuario existe
        let user =await User.findOne({username})

        //verificar que la contraseña coincida
        if(user && await checkPassword(password,user.password)){
            let loggedUser = {
                username: user.username,
                name: user.name,
                role: user.role
            }
            return res.send({message: `Welcome ${user.name}`,loggedUser})
        }

        return res.status(404).send({message:'Invalid credentials'})
     
    } catch (err) {
        console.log(err)
        return res.status(500).send({message: 'failed to login'})
    }
}

export const update = async(req,res)=>{
    try {
        //obtener el id del usuario a actulizar
        let {id} = req.params
        //obtener datos que vamos a actualizar
        let data = req.body
        //validar si trae datos a actulizar
        let update = checkUpdate(data,id)
        if (!update ) return res.status(400).send({message: 'have submitted some data that cannot be update or missing data'})
        // Validar si tiene permisos tokenizacion
        //Actulizar en la DB
        let updateUser = await User.findOneAndUpdate(
            {_id:id}, // objectId hexadecimal(hora sys,mongo, llave privado)
            data, // datos que va a actulizar
            {new: true}// objeto de la db ya ctualizado
        )
        //Validar si se actulizo 
        if(!updateUser)    if (!update ) return res.status(400).send({message: 'User not founf and not updated'})
        //Responder con el dato actulizado
        return res.send({message: 'update user', updateUser})
    } catch (err) {
        console.error(err)
        if(err.keyValue.username) return res.status(400).send({message: `Username ${err.keyValue.username} is already taken`})
        return res.status(500).send({message: 'error updatin account'})


        
    }
}

export const deleteU = async(req, res)=>{
    try {
        //Obtener el id
        let { id } = req.params
        //Validar si esta logeado y es el mismo X hoy no lo vemos X
        //Eliminar (deketeOne/ findOneAndDelete)
        let deletedUser = await User.findOneAndDelete({_id: id})
        //verificar que se elimino
        if(!deletedUser) return res.status(404).send({message: 'Account not found and not deleted'})
        //Responder
        return res.send({message: `Account with username ${deletedUser.username} deleted succesfully`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Error deleting account'})
    }
}