import express, {Request, Response, Application} from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import path from 'path'

import errHandleMiddleware from './middleware/error.handel.middleware'
import routes from './routes/index'

const app: Application = express()
app.use(morgan('combined'))
app.use(express.json())
app.use(cookieParser())
import config from './config'
import upload from './upload_img/index'
const port = config.port || 3000

// app.use(cors())
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

app.post('/upload', upload.single('image'), (req: any, res) => {
	res.send(req.file.filename)
})

app.use('/uploads', express.static('uploads'))

app.get('/image/:filename', (req, res) => {
	const {filename} = req.params
	res.sendFile(req.params.filename, {root: path.join(__dirname, '/uploads')})
})

app.listen(port, () => {
	console.log(`server is start with port :${port}`)
})
app.use(errHandleMiddleware)
