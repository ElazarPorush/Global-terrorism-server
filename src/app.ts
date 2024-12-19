import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import { connectToMongo } from './config/db'
import analysisRouter from './routes/analysis'
import relationshipsRouter from './routes/relationships'

const PORT = process.env.PORT

const app = express()

connectToMongo()

app.use(cors());
app.use(express.json());

app.use('/api/analysis', analysisRouter)
app.use('/api/relationships', relationshipsRouter)

app.listen(PORT, () => {
    console.log(`[server] is running on http://localhost:${PORT}`)
})