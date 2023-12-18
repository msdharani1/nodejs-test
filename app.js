const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const exphbs = require('express-handlebars');
const Music = require('./models/musicModel');

const app = express();

// Set up handlebars engine
app.engine('hbs', exphbs({ extname: '.hbs', defaultLayout: 'main', layoutsDir: path.join(__dirname, '/views/layouts/') }).engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// MongoDB connection setup
mongoose.connect('mongodb://127.0.0.1:27017/musicDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
});

// Static files setup
app.use(express.static('views'));

// Define routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.hbs'));
});

// ... (other routes)

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/own-tracks', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'own-tracks.hbs'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'contact.hbs'));
});

app.get('/tracks', async (req, res) => {
  try {
    const musicData = await Music.find().lean();
    res.render('index', { musicData });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { error });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
