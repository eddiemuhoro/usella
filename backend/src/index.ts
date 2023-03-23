import express from 'express';
import 'dotenv/config';
import morgan from 'morgan';
import cors from 'cors';
import { login, register } from './User/user';
import bodyParser from 'body-parser';
import productRouter from './product/product';
// import {login, register} from './User/user';

const app = express();

const port = process.env.PORT || 4200;

//* creating default middleware for the app
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

//* routes
app.all('/', (_req, res) => {
  res.send('welcome to usella, where send hand good has value');
});

app.use('/login', login);
app.use('/register', register);
app.use('/product', productRouter);

//* create listen app
app.listen(port, () => {
  console.log(`Server is listening in port : ${port}`);
});
