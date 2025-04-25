const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const accountSchema = new mongoose.Schema({
  accountNumber: { type: String, unique: true },
  password: String,
  balance: { type: Number, default: 0 },
});

const Account = mongoose.model('Account', accountSchema);

// ✅ Register a new account
app.post('/api/register', async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const newAccount = new Account({ accountNumber, password });
    await newAccount.save();
    res.status(201).json({ message: 'Account registered successfully' });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed. Maybe account already exists?' });
  }
});

// ✅ Login to an account
app.post('/api/login', async (req, res) => {
  try {
    const { accountNumber, password } = req.body;
    const account = await Account.findOne({ accountNumber });

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    if (account.password !== password) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful', accountNumber: account.accountNumber });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

app.listen(5000, () => {
  console.log('Server running at http://localhost:5000');
});
