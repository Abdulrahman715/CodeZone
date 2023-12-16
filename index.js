require('dotenv').config();

const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');

const app = express();

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const httpStatusText = require('./utils/httpStatusText');

const mongoose = require('mongoose');

const url =
  "mongodb+srv://abdoNagiub:abdo_12345@nagiub.ucxy09b.mongodb.net/MyProject?retryWrites=true&w=majority";

mongoose.connect(url).then(() => {
  console.log('mongo DB server started');
});

app.use(bodyParser.json());

const coursesRouter = require('./Router/route');
const usersRouter = require('./Router/userRoute');

app.use('/api/courses', coursesRouter); // /api/courses
app.use('/api/users', usersRouter);    // /api/users

app.all("*", (req, res, next) => [
  res.status(400).json({
    status: httpStatusText.ERROR,
    data:null,
    message : "the url is wrong"
  })
])

app.listen(3000, () => {
    console.log("listening on port 3000");
});