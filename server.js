const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const accountSchema = new mongoose.Schema({
    accountNumber: String,
    balance: Number
});

const Account = mongoose.model('Account',accountSchema);

app.get('/api/balance/:accountNumuber',async(req,res)=>{
    try{
    const b = await Account.findOne({accountNumber: req.params.accountNumuber});
    res.status(201).json({balance: b.balance});
        }
    catch(err){
        res.status(404).json({error:'Account cannot be found.'});
    }
    });

// Create new account
app.post('/api/accounts', async (req, res) => {
    const { accountNumber, balance } = req.body;
    try {
      const newAccount = new Account({ accountNumber, balance });
      await newAccount.save();
      res.status(201).json({ message: 'Account created' });
    } catch (error) {
      res.status(400).json({ error: 'Failed to create account' });
    }
  });
  
  // Update balance
  app.put('/api/accounts/:accountNumber', async (req, res) => {
    const { balance } = req.body;
    try {
      const updated = await Account.findOneAndUpdate(
        { accountNumber: req.params.accountNumber },
        { balance },
        { new: true }
      );
      if (updated) {
        res.json({ message: 'Account updated', updated });
      } else {
        res.status(404).json({ error: 'Account not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Update failed' });
    }
  });
  
  // Delete account
  app.delete('/api/accounts/:accountNumber', async (req, res) => {
    try {
      const deleted = await Account.findOneAndDelete({ accountNumber: req.params.accountNumber });
      if (deleted) {
        res.json({ message: 'Account deleted' });
      } else {
        res.status(404).json({ error: 'Account not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Delete failed' });
    }
  });
  

app.listen(5000,()=>{console.log('Running at http://localhost:5000')});