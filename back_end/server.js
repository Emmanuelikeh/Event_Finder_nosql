const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/UserRoutes');
const eventRoutes = require('./routes/EventRoutes');
const venueRoutes = require('./routes/VenueRoutes');
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use('/api', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/venues', venueRoutes);




const server = require('http').createServer(app);
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

});