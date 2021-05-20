const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = 9001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.all("/*", function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});

app.get('/allFriends', function (request, response) {
  Friend.find().then(allFriends => response.status(200).send(allFriends));
});

app.post('/addFriend', function (request, response) {
  const addNewFriend = new Friend(request.body);
  addNewFriend.save().then(r => console.log(response, 'friend added'));
  response.status(200).send({"message": "Data received"});
});

app.post('/deleteFriend', function (request, response) {
  console.log(request.body);
   Friend.deleteOne({ email: request.body }).then(r =>response.status(200).send({"message": "Data deleted"}));
  });

app.post('/deleteFriend', function (request, response){
  Friend.deleteOne({email: request.body.email}).then(r => response.status(200).send({"message": "Data received"}));
});

app.listen(PORT, function () {
});

/* Mongoose */
const mongoose = require('mongoose');
const friendSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String
});

const Friend = mongoose.model("Friend", friendSchema, "friends");


// getting-started.js

mongoose.connect('mongodb+srv://user:Micha@cluster.y5etb.mongodb.net/friend', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//mongodb+srv://user:user@cluster.y5etb.mongodb.net/test


const db = mongoose.connection;
db.on('error', function (err) {
  console.error("connection error;", err);
});
db.once('open', function () {

  const friend = new Friend();
  friend.save().then(response => console.log(response, 'friend saved'));
  friend.firstName = 'Alexandra';
  friend.lastName = 'Banica';
  friend.email = 'Alexjesss@ACTagency.com';
  friend.phoneNumber = '0498335421';
  Friend.find().then(response => console.log(response, 'friend found'));
});

