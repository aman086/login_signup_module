// app.js or index.js
import express from 'express';
import { connectDB } from './db.js';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import user from './models/user.js';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
import cors from 'cors'
 
const corsOptions = {
  origin: 'http://localhost:5173/'
  // optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Use cors middleware with options
app.use(cors(corsOptions));
// app.use(corsOptions);


const PORT = 3000;

connectDB();

app.post('/api/signup', async (req, res) => {
  console.log(req.body);

  const { name, password } = req.body;

  let userData = new user({
    name,
    password
  });

  await userData
    .save()
    .then(() => {
      console.log(userData);  // Corrected from 'user' to 'userData'
      res.send('User created successfully');
    })
    .catch((err) => {
      console.log('Error: ', err);
      res.status(500).send('Internal Server Error');
    });
});

app.post('/api/login', async (req, res) => {
  const { name, password } = req.body;

  try {
    // Check if the user exists in the database (assuming 'user' is your mongoose model)
    const existingUser = await user.findOne({ name: name, password });

    if (existingUser) {
      // Successful login
      res.status(200).json({ message: 'Login successful', user: existingUser });
    } else {
      // Incorrect username or password
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


app.get('/', (req, res) => {
  res.send('Home');
});

app.get('/name', (req, res) => {
  res.send('Name');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
