import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import errorHandler from './errors/handler';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb+srv://daniel:1234@clustertest.dxhzhwd.mongodb.net/test');

app.use(cors());
app.use(express.json());
app.use('/api', routes);
app.use(errorHandler);

app.listen(3333, () => {
    console.log('O servidor está rodando na porta 3333.');
})