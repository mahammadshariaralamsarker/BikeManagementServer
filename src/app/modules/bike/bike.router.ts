import express from 'express'
import { bikeController } from './bike.controller'
const router = express.Router()


router.get('/products/:productId',bikeController.getSingleBike)
router.get('/products',bikeController.getBike)



export const bikeRoutes = router; 