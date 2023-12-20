import express, { Application, Request, Response } from 'express'
import cors from 'cors'
// import { StudentRoutes } from './app/modules/student/student.route'
// import { UserRoutes } from './app/modules/user/user.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
import notFound from './app/middlewares/notFound'
import router from './app/routes'


const app: Application = express()
// const port = 3000

// parsers
app.use(express.json())
app.use(cors())

// application routes move to route index.ts
// app.use('/api/v1/students', StudentRoutes)
// app.use('/api/v1/users', UserRoutes)

// for cleaning the to call here is router
app.use('/api/v1', router)

app.get('/', (req: Request, res: Response) => {
  res.send('this is main route')
})

const getAController = (req: Request, res: Response) => {
  const a = 10
  res.send(a)
}
app.get('/', getAController)

//global error handler
app.use(globalErrorHandler)
// not found
app.use(notFound)

export default app
