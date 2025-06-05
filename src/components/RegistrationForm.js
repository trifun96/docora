import React, { useState, useEffect } from 'react';

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    ordinacija: '',
    adresa: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/users');
        const users = await response.json();
        console.log('Registrovani korisnici:', users);
      } catch (err) {
        console.error('Greška prilikom dohvatanja korisnika:', err);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const response = await fetch('http://localhost:3001/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const text = await response.text();
      console.log('Raw response text:', text);

      let data;
      try {
        data = JSON.parse(text);
      } catch (e) {
        throw new Error(`Nevalidan JSON: ${text}`);
      }

      if (!response.ok) {
        setError(data.error || 'Došlo je do greške');
      } else {
        setMessage('Uspešna registracija!');
        setFormData({
          name: '',
          email: '',
          password: '',
          ordinacija: '',
          adresa: '',
        });
      }
    } catch (err) {
      console.error('Greška:', err);
      setError('Ne mogu da se povežem sa serverom.');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h2>Registracija korisnika</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Ime i prezime:</label><br />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Šifra:</label><br />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
        </div>
        <div>
          <label>Ordinacija:</label><br />
          <input
            type="text"
            name="ordinacija"
            value={formData.ordinacija}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Adresa:</label><br />
          <input
            type="text"
            name="adresa"
            value={formData.adresa}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>
          Registruj se
        </button>
      </form>
    </div>
  );
}
