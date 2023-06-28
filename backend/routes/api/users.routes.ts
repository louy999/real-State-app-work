import {Router, Request, Response} from 'express'
import UsersModel from '../../model/users.model'
import config from '../../config'
import jwt from 'jsonwebtoken'
const usersModel = new UsersModel()

const routes = Router()
//create
routes.post('/', async (req: Request, res: Response, next) => {
	try {
		const user = await usersModel.createUsers(req.body)
		res.json({
			status: 'success',
			data: {...user},
			message: 'user created successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/', async (req: Request, res: Response, next) => {
	try {
		const user = await usersModel.getAllUsers()
		res.json({
			status: 'success',
			data: {...user},
			message: 'user created successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await usersModel.getOneUsers(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: user,
			message: 'user retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.get('/email/:email', async (req: Request, res: Response, next) => {
	try {
		const user = await usersModel.getOneFromEmail(
			req.params.email as unknown as string
		)
		res.json({
			status: 'success',
			data: user,
			message: 'user retrieved successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await usersModel.updateUsers(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.patch('/pass/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await usersModel.updatePassUsers(req.body)
		res.json({
			status: 'success',
			data: user,
			message: 'user updated successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.delete('/:id', async (req: Request, res: Response, next) => {
	try {
		const user = await usersModel.deleteUsers(req.params.id as unknown as string)
		res.json({
			status: 'success',
			data: user,
			message: 'user deleted successfully',
		})
	} catch (err) {
		next(err)
	}
})
routes.post('/auth', async (req: Request, res: Response, next) => {
	try {
		const {email, password} = req.body
		const user = await usersModel.auth(email, password)
		const token = jwt.sign({user}, config.tokenSecret as unknown as string)
		if (!user) {
			return res.status(401).json({
				status: 'error',
				message: 'password do not match please try agin',
			})
		}
		res.cookie('accessToken', token, {
			httpOnly: true,
		})

		res.json({
			status: 'success',
			data: {...user, token},
			message: 'user auth successfully',
		})
	} catch (err) {
		next(err)
	}
})

export default routes
