import express from 'express'
import { AuthRoute } from '../modules/auth/auth.route';
import { AdminRoute } from '../modules/admin/admin.route';


const router = express.Router()

const moduleRoutes =[
    {
        path:'/',
        route:AuthRoute
    }, 
    {
        path:'/admin',
        route:AdminRoute
    },
   

]

moduleRoutes.forEach(route =>router.use(route.path,route.route));




export default router;


