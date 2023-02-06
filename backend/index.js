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
import Product from './src/model/Product.js'
import ProductStat from './src/model/ProductStat.js'
import Transaction from './src/model/Transaction.js'
import OverallStat from './src/model/OverallStat.js'
import AffiliateStat from './src/model/AffiliateStat.js'
import {dataUser, dataProduct, dataProductStat, dataTransaction, dataOverallStat, dataAffiliateStat} from './src/data/index.js'
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

    /* ONLY ADD DATA ONE TIME */
    // User.insertMany(dataUser)
    // Product.insertMany(dataProduct)
    // ProductStat.insertMany(dataProductStat)
    // OverallStat.insertMany(dataOverallStat)
    // AffiliateStat.insertMany(dataAffiliateStat)
    // Transaction.insertMany(dataTransaction)
}).catch((error)=> console.error(error))