import bodyParser from 'body-parser'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
import helmet from 'helmet'
import morgan from 'morgan'

import clientRoutes from './src/routers/client.js'
import salesRoutes from './src/routers/sales.js'
import generalRoutes from './src/routers/general.js'
import managementRoutes from './src/routers/management.js'
import User from './src/model/User.js'
import {dataUser} from './src/data/index.js'
/* CONFIGURATION */
dotenv.config()

const app = express()
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cors())

/* ROUTES */
app.use('/client', clientRoutes)
app.use('/general', generalRoutes)
app.use('/management', managementRoutes)
app.use('/sales', salesRoutes)

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 5001
mongoose.connect(process.env.MONGOOSE_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    app.listen(PORT, ()=> console.log('listen'))
    User.insertMany(dataUser)
}).catch((error)=> console.error(error))