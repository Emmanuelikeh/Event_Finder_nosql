const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', userRoutes);


const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});