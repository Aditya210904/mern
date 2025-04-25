import React, { useState } from 'react';
import axios from 'axios';

const api = 'http://localhost:5000/api';

function App() {
  const [accountNumber, setAccountNumber] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [mode, setMode] = useState('login'); // 'login' or 'register'

  const handleSubmit = async () => {
    try {
      const endpoint = mode === 'register' ? 'register' : 'login';
      const response = await axios.post(`${api}/${endpoint}`, { accountNumber, password });
      setMessage(response.data.message || 'Success');
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error occurred');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '40px' }}>
      <h2>{mode === 'login' ? 'Login' : 'Register'} Account</h2>
      <input
        type="text"
        placeholder="Account Number"
        value={accountNumber}
        onChange={(e) => setAccountNumber(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
      />
      <button onClick={handleSubmit} style={{ width: '100%', padding: '10px' }}>
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
      <p style={{ marginTop: '15px' }}>
        {mode === 'login' ? "Don't have an account?" : 'Already registered?'}{' '}
        <span
          onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          style={{ color: 'blue', cursor: 'pointer' }}
        >
          {mode === 'login' ? 'Register here' : 'Login here'}
        </span>
      </p>
      {message && <p style={{ marginTop: '20px', color: 'green' }}>{message}</p>}
    </div>
  );
}

export default App;
