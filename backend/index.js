import express from 'express';
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import { createConnection } from './connect.js';
import { testApi } from './api.js';

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLIENT_DIR = path.join(__dirname, '../frontend/');
const BUILD_DIR = path.join(CLIENT_DIR, 'build');

app.use(express.static(path.join(BUILD_DIR)));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
})

const conn = createConnection();
let connected = false;
conn.connect(err => {
    if (err) {
        console.log('Couldnt connect', err);
        return;
    }
    connected = true;

    console.log('Connected to MySQL server!');
})

app.listen(PORT, () => {
    console.log('Listening on port' + PORT);
   
})
app.get('/test', (req, res) => {
 if (connected) {
        testApi(conn).then(result => {
            res.send(result);
        })
        .catch(err => {
            res.send(err);
        })
    }
    else {
        res.send('Not connected');
    }
})

app.get('/create-user', (req, res) => {
    
})