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


import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [accountNumber, setAccountNumber] = useState('');
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const handleCheckBalance = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/balance/${accountNumber}`);
      setBalance(response.data.balance);
      setError('');
    } catch (err) {
      setBalance(null);
      setError('Account not found or server error');
    }
  };

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h2>🏦 Bank Balance Checker</h2>

      <input
        type="text"
        placeholder="Enter Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        style={{ padding: '10px', marginRight: '10px' }}
      />

      <button onClick={handleCheckBalance} style={{ padding: '10px' }}>
        View Balance
      </button>

      <div style={{ marginTop: '20px' }}>
        {balance !== null && (
          <h3>💰 Balance: ₹{balance}</h3>
        )}
        {error && (
          <p style={{ color: 'red' }}>{error}</p>
        )}
      </div>
    </div>
  );
}

export default App;
