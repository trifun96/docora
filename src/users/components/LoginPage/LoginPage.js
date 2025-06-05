import React, { useState } from 'react';
import './LoginPage.css';
import Header from '../Header/Header';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login sa:', email, password);
  };

  return (
    <div className="login-wrapper">
      <Header />

      <main className="login-main">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2>Prijava</h2>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Unesite email"
          />

          <label htmlFor="password">Lozinka:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Unesite lozinku"
          />

          <button type="submit" className="login-button">
            Prijavi se
          </button>
        </form>
      </main>
    </div>
  );
};

export default LoginPage;
