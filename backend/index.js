import express from 'express';
import path from 'path';
import {dirname} from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

const CLIENT_DIR = path.join(__dirname, '../frontend/');
const BUILD_DIR = path.join(CLIENT_DIR, 'build');

app.use(express.static(path.join(BUILD_DIR)));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
})