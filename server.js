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

app.put('/api/accounts/:accountNumber',async(req,res)=>{
try{
    const {balance} = req.body;
    const up = await Account.findOneAndUpdate({accountNumber:req.params.accountNumber},{balance},{new:true});
    if(up){
        res.status(201).json({message:'Account updated'});
    }
    else{
        res.status(404).json({error:"Account not found"});
    }
}
catch(err){
    res.status(201).json({message:'update failed'});
}
});

app.post('/api/accounts',async(req,res) => {
    try{
        const {accountNumber,balance} = req.body;
        const newa = new Account({accountNumber,balance});
        await newa.save();
    }
}); 

app.listen(5000,()=>{console.log('Running at http://localhost:5000')});