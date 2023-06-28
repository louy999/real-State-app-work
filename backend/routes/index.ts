import {Router} from 'express'
import usersRoutes from './api/users.routes'
import projectsRoutes from './api/projects.routes'
const routes = Router()
routes.use('/users', usersRoutes)
routes.use('/proj', projectsRoutes)
export default routes
