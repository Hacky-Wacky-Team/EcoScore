import React, { useState } from 'react';
import { auth } from './firebase.js';
import { rtdb } from './firebase.js';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import './styles/SignupPage.css';

function SignupPage({ onSignup, onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!email || !password || !username) {
      setError('Please fill in all fields.');
      return;
    }
  
    try {
      console.log('before auth');
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('before usercredntial.user');
      const user = userCredential.user;
      console.log('ran auth');

      const db = getDatabase();
      console.log('ran getDatabase');
      await set(ref(db, `users/${user.uid}`), {
        username,
        email,
        createdAt: new Date().toISOString(),
        trees: 0,
        carbon: {
          "mon": 0,
          "tue": 0,
          "wed": 0,
          "thu": 0,
          "fri": 0,
          "sat": 0,
          "sun": 0
        }
      });
      console.log('set users');
  
      alert('Signup successful! You can now log in.');
      onSignup();
    } catch (error) {
      console.error('Error during signup:', error); 
      const errorMessage = {
        'auth/email-already-in-use': 'Email already exists.',
        'auth/invalid-email': 'Invalid email format.',
        'auth/weak-password': 'Password should be at least 6 characters.',
      }[error.code] || 'An error occurred. Please try again.';
      setError(errorMessage);
    }
  };
  
  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="error">{error}</p>}
        <button type="submit">Sign Up</button>
      </form>
      <p>
        Already have an account?{' '}
        <span onClick={onLogin}>Log in here</span>.
      </p>
    </div>
  );
}

export default SignupPage;
