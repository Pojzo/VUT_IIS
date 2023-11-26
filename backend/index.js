import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
import subjectRoutes from './routes/subjectRoutes.js'
import roomRoutes from './routes/roomRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import { getAllDatesInRange } from './utils/dateUtils.js';

const app = express();
const PORT = 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLIENT_DIR = path.join(__dirname, '../frontend/');
const BUILD_DIR = path.join(CLIENT_DIR, 'build');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://34.118.123.150:3000'];


const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'credentials']
}

app.use(cors(corsOptions))
app.use(cookieParser('1234'));
app.use(express.static(path.join(BUILD_DIR)));
app.use('/api', userRoutes)
app.use('/api', subjectRoutes)
app.use('/api', roomRoutes)
app.use('/api', activityRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
})

app.listen(PORT, () => {
    console.log('Listening on port' + PORT);
})

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})
