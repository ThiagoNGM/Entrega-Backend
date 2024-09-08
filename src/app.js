import express from 'express';
import cartRoutes from './cartRoutes.js';
import productRoutes from './productsRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', cartRoutes);
app.use('/api', productRoutes);

const server = app.listen(8080);