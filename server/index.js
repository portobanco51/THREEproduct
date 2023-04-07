import express from 'express'
import cors from 'cors'
import dalleRoutes from './routes/dalle.routes.js'

const app = express();
app.use(cors());
app.use(express.json({ limig: "50mb" }));
app.use('/api/v1/dalle', dalleRoutes)
app.get('/', (req, res) => {
    res.status(200).json({ message: 'Active DB' })
})

app.listen(8080, () => console.log('Server Started'))
