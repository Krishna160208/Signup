const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const NexusModel = require('./models/Nexus');

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

// MongoDB connection
mongoose
  .connect(
    'mongodb+srv://krishnarughani101:C93PynZ5oVmCgodM@cluster16.owussml.mongodb.net/nexus?retryWrites=true&w=majority&appName=Cluster16',
    { useNewUrlParser: true, useUnifiedTopology: true },
  )
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// ✅ FIXED: Login route with proper error handling
app.post('/login', async (req, res) => {
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.log('❌ Password mismatch for:', email);
    return res.status(401).json('Incorrect password');
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json('Missing email or password');
  }

  try {
    const user = await NexusModel.findOne({ email });

    if (!user) {
      console.log('❌ No user found for:', email);
      return res.status(404).json('User not found');
    }

    if (user.password !== password) {
      console.log('❌ Password mismatch for:', email);
      return res.status(401).json('Incorrect password');
    }

    console.log('✅ Login successful for:', email);
    return res.status(200).json('Success');
  } catch (err) {
    console.error('❌ Login Error:', err);
    return res.status(500).json('Login failed');
  }
});

app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json('Please fill all fields');
  }

  try {
    const existing = await NexusModel.findOne({ email });
    if (existing) {
      return res.status(400).json('User already exists');
    }

    const user = await NexusModel.create({ name, email, password });
    console.log('✅ User Registered:', user);
    res.json(user);
  } catch (err) {
    console.error('❌ Register Error:', err);
    res.status(500).json('Registration failed');
  }
});

// Health check
app.get('/', (req, res) => {
  res.send('🚀 API is working!');
});

// Start server
app.listen(3001, () => {
  console.log('🚀 Server is Running on http://localhost:3001');
});
