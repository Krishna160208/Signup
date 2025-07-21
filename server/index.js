const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const NexusModel = require('./models/Nexus');

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(
    'mongodb+srv://krishnarughani101:C93PynZ5oVmCgodM@cluster16.owussml.mongodb.net/nexus?retryWrites=true&w=majority&appName=Cluster16',
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  )
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  NexusModel.findOne({ email })
    .then((user) => {
      if (!user) return res.json('No Record Existed');
      if (user.password === password) return res.json('Sucess');
      return res.json('The Password is Incorrect');
    })
    .catch((err) => res.status(500).json('Error checking credentials'));
});

app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

app.post('/register', (req, res) => {
  NexusModel.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json(err));
});

app.listen(3001, () => {
  console.log('🚀 Server is Running on http://localhost:3001');
});
