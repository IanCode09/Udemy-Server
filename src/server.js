import express from 'express'
import dotenv from 'dotenv'
import connect from './mongodb/db.js'
import { errorHandler } from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'

dotenv.config()
connect();

const app = express();

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Server Here')
})

app.use('/user', userRoutes)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('Server running on PORT ', PORT);
})