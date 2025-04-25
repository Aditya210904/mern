import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState('');
  const [fetchedBalance, setFetchedBalance] = useState(null);
  const [message, setMessage] = useState('');

  const api = 'http://localhost:5000/api';

  const handleCheckBalance = async () => {
    try {
      const res = await axios.get(`${api}/balance/${accountNumber}`);
      setFetchedBalance(res.data.balance);
      setMessage('');
    } catch (err) {
      setFetchedBalance(null);
      setMessage('❌ Account not found');
    }
  };

  const handleCreateAccount = async () => {
    try {
      await axios.post(`${api}/accounts`, { accountNumber, balance: Number(balance) });
      setMessage('✅ Account created');
    } catch (err) {
      setMessage('❌ Failed to create account');
    }
  };

  const handleUpdateAccount = async () => {
    try {
      await axios.put(`${api}/accounts/${accountNumber}`, { balance: Number(balance) });
      setMessage('✅ Account updated');
    } catch (err) {
      setMessage('❌ Failed to update account');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`${api}/accounts/${accountNumber}`);
      setMessage('✅ Account deleted');
      setFetchedBalance(null);
    } catch (err) {
      setMessage('❌ Failed to delete account');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: 'auto' }}>
      <h2>🏦 Bank Account Manager</h2>

      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />
      <input
        type="number"
        placeholder="Balance"
        value={balance}
        onChange={(e) => setBalance(e.target.value)}
        style={{ width: '100%', marginBottom: '10px' }}
      />

      <button onClick={handleCreateAccount}>➕ Create Account</button>
      <button onClick={handleCheckBalance} style={{ marginLeft: '10px' }}>🔍 View Balance</button>
      <button onClick={handleUpdateAccount} style={{ marginLeft: '10px' }}>✏️ Update Balance</button>
      <button onClick={handleDeleteAccount} style={{ marginLeft: '10px', background: 'crimson', color: 'white' }}>🗑️ Delete</button>

      <div style={{ marginTop: '20px' }}>
        {fetchedBalance !== null && <h3>💰 Balance: ₹{fetchedBalance}</h3>}
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default App;
