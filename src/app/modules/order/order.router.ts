import  express  from "express"
import { OrderController } from "./order.controller"
import { auth } from "../../middleware/auth"

const router = express.Router()

router.post('/orders',auth.authUser,OrderController.createOrder)
router.get('/orders/revenue',auth.authUser,OrderController.getOrder)

export const OrderRoutes = router