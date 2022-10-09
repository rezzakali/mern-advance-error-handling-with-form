// external imports
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

// internal imports
import connectionToDb from './config/dbConnection.js';
import userHandler from './handler/userHandler.js';
import errorHandler from './middleware/errorHandler.js';

// call the app object
const app = express();

// cors policy setup
app.use(
  cors({
    origin: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// environment && database connection setup
dotenv.config();
connectionToDb();

// routes
app.use('/api/user', userHandler);
// app.use('/api/todos', todoHandler);

//  error handler
app.use(errorHandler);

// listening the server
app.listen(process.env.PORT || 8000, process.env.HOST_NAME || localhost, () => {
  console.log(
    `Your server is running successfully at http://${process.env.HOST_NAME}:${process.env.PORT}`
  );
});
