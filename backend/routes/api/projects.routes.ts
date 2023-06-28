import {Router, Request, Response} from 'express'
import config from '../../config'
import ProjectsModel from '../../model/projects.model'
const projectsModel = new ProjectsModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const projects = await projectsModel.createProjects(req.body)
		res.json({
			status: 'success',
			data: {...projects},
			message: 'projects created successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const projects = await projectsModel.getAllProjects()
		res.json({
			status: 'success',
			data: projects,
			message: 'projects retrieved successfully',
		})
	} catch (err: any) {
		next(err.message)
	}
})

routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const projects = await projectsModel.getOneProjects(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: projects,
			message: 'projects retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})

routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const projects = await projectsModel.UpdateProjects(req.body)
		res.json({
			status: 'success',
			data: projects,
			message: 'projects updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const projects = await projectsModel.deleteProjects(
			req.params.id as unknown as string
		)
		res.json({
			status: 'success',
			data: projects,
			message: 'projects deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})
export default routes
