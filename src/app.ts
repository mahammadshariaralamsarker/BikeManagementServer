import express, { Application } from 'express' 
import cors from 'cors'
import { bikeRoutes } from './app/modules/bike/bike.router'
import { OrderRoutes } from './app/modules/order/order.router'
const app:Application = express()

// Parser
app.use(express.json())
app.use(cors())


app.use('/api',bikeRoutes)
app.use('/api',OrderRoutes)
app.get('/',(req,res)=>{res.send("The Bike Store Server is Running")})

export default app
