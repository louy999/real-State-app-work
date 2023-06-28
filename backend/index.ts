import express, {Request, Response, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
const app: Application = express()
import errHandleMiddleware from './middleware/error.handel.middleware'
import routes from './routes/index'

app.use(morgan('common'))
app.use(express.json())
app.use(cookieParser())
import config from './config'
const port = config.port || 3000

app.use(
	cors({
		allowedHeaders: [
			'Origin',
			'X-Requested-With',
			'Content-Type',
			'Accept',
			'X-Access-Token',
			'Authorization',
			'Access-Control-Allow-Origin',
			'Access-Control-Allow-Headers',
			'Access-Control-Allow-Methods',
		],
		methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
		preflightContinue: true,
		origin: '*',
	})
)

app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use('/api', routes)
app.get('/healthz', (_req: Request, res: Response) => {
	res.send({status: 'ok✌️'})
})
app.listen(port, () => {
	console.log(`server is start with port :${port}`)
})
app.use(errHandleMiddleware)
