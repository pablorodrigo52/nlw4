import 'reflect-metadata';
import express from  'express';
import './database';
import { router } from './routes';
import { createConnection } from 'typeorm';

const app = express();

createConnection();
app.use(express.json());
app.use(router);

export { app };