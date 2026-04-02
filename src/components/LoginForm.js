import React, { useState } from 'react';

const LoginForm = ({ onLogin, whiteList, onGoToRegister }) => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar contra la White List
    const validUser = whiteList.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (validUser) {
      onLogin(); // Cambia el estado en App.js
    } else {
      setError('Credenciales incorrectas. Intenta de nuevo.');
    }
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger py-2 text-center">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" name="email" className="form-control" 
              required onChange={handleChange} 
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" name="password" className="form-control" 
              required onChange={handleChange} 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Ingresar</button>
          <p className="text-center mt-3">
            ¿No tienes cuenta? 
            <button 
                type="button" 
                className="btn btn-link p-0 ms-1" 
                onClick={onGoToRegister}
            >
                Regístrate aquí
            </button>
            </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;