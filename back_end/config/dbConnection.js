require('dotenv').config();
const mongoose = require('mongoose');   

const uri = 'mongodb://localhost:27017/EventFinder';

mongoose.connect(uri).catch((err) => { console.log(err.message); });

const pool = mongoose.connection;
pool.on('error', console.error.bind(console, 'connection error:'));
pool.once('open', function() {
  console.log('Connected to MongoDB');
});


module.exports = pool;