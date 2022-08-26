const express = require('express');
const app = express();
const cors = require('cors');
const connectDb = require('./models/database');
const faker = require('faker');
const path = require("path");

const User = require('./models/user.model');
const { model } = require('mongoose');

// configure express to use cors()
// ------------------------------------------------------------------
app.use(cors());

app.use(express.static(path.join(__dirname, "client", "build")));

app.get('/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.get('/user-create', async (req, res) => {
  const user = new User({
    username: faker.internet.userName(),
    email: faker.internet.email(),
  });

  await user.save().then(() => console.log('User created'));

  res.send('User created \n');
});

app.get('/users-delete', async (req, res) => {
  await User.deleteMany({}).then(() => console.log('Users deleted'));

  res.send('Users deleted \n');
});

app.get('/', (req, res) => {
  res.send('Hello from Node.js app \n');
});

// start server
// -----------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});



app.listen(8080, function () {
  console.log('Running on port 8080! - http://localhost:8080');
  connectDb().then(() => console.log('MongoDb connected'));
})
