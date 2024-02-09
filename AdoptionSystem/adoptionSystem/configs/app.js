// configuracion a express


//Importaciones
import  Express  from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"
import { config } from 'dotenv'
import userRoutes from '../src/user/user.routers.js'

//Configuraciones

const app = Express()//es el servidor crear lo
config('')
const port = process.env.port || 3200

//configurar el servidor de express
app.use(Express.urlencoded({extended: false}))
app.use(Express.json())
app.use(cors())//Aceptar las diferentes origenes local o remoto 
app.use(helmet())//aplica capa de seguridad
app.use(morgan('dev'))// crea logs de solicitudes al servidor HTTP

// decalracion de rutas
app.use(userRoutes)


//Levantar el servidor
export const initServer =()=>{
    app.listen(port)
    console.log(`server http running in port ${port}`)
}



