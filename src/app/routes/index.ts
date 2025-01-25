import express from 'express' 
import { AdminRoute } from '../modules/admin/admin.route';
import { UserRoute } from '../modules/user/user.route';


const router = express.Router()

const moduleRoutes =[
    {
        path:'/',
        route:UserRoute
    }, 
    {
        path:'/admin',
        route:AdminRoute
    },
   

]

moduleRoutes.forEach(route =>router.use(route.path,route.route));




export default router;


