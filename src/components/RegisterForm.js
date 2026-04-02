import React, { useState } from 'react';

const RegisterForm = ({ onRegister, onGoToLogin }) => {
  const [user, setUser] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      return setError('Las contraseñas no coinciden');
    }
    
    onRegister({ email: user.email, password: user.password });
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="card shadow p-4" style={{ width: '400px' }}>
        <h2 className="text-center mb-4">Registro</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" name="email" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input type="password" name="password" className="form-control" required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Confirmar Contraseña</label>
            <input type="password" name="confirmPassword" className="form-control" required onChange={handleChange} />
          </div>
          <button type="submit" className="btn btn-success w-100 mb-3">Registrarse</button>
          <p className="text-center">
            ¿Ya tienes cuenta? <button type="button" className="btn btn-link p-0" onClick={onGoToLogin}>Inicia Sesión</button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;