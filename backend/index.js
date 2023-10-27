import express from 'express';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import userRoutes from './routes/userRoutes.js';
// import subjectRoutes from './routes/subjectRoutes.js';

const app = express();
const PORT = 5000;

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLIENT_DIR = path.join(__dirname, '../frontend/');
const BUILD_DIR = path.join(CLIENT_DIR, 'build');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}

app.use(cors(corsOptions))
app.use(cookieParser('1234'));
app.use(express.static(path.join(BUILD_DIR)));
app.use('/api', userRoutes)
// app.use('/api', subjectRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
})

app.listen(PORT, () => {
    console.log('Listening on port' + PORT);

})