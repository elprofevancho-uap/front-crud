import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';

const App = () => {
  const [users, setUsers] = useState([{ id: 1, name: 'Tania', username: 'floppydiskette' }]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', username: '' });
  const handleLogout = () => setIsAuthenticated(false);
  const [whiteList, setWhiteList] = useState([
    { email: 'admin@correo.com', password: '123' }
  ]);
  const [view, setView] = useState('login'); // 'login' o 'register'

  const handleRegister = (newUser) => {
    setWhiteList([...whiteList, newUser]);
    setView('login'); // Al terminar, lo mandamos al login
    alert('Usuario registrado con éxito. ¡Ya puedes iniciar sesión!');
  };

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const deleteUser = (id) => setUsers(users.filter((user) => user.id !== id));

  const updateUser = (id, updatedUser) => {
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)));
    setEditing(false);
  };

  const editRow = (user) => {
    setEditing(true);
    setCurrentUser(user);
    // Disparamos el modal manualmente si es necesario o usamos data-bs-toggle en la tabla
  };

  return (
<div className="App">
      {!isAuthenticated ? (
        view === 'login' ? (
          <LoginForm 
            whiteList={whiteList} 
            onLogin={() => setIsAuthenticated(true)} 
            onGoToRegister={() => setView('register')} 
          />
        ) : (
          <RegisterForm 
            onRegister={handleRegister} 
            onGoToLogin={() => setView('login')} 
          />
        )
      ) : (
        <div className="container mt-5">
        {/* Header con botón de salir */}
        <div className="d-flex justify-content-between align-items-center mb-4 p-3 bg-light rounded shadow-sm">
          <h1 className="h3 mb-0">Directorio de Usuarios</h1>
          <div>
            <button 
              className="btn btn-success me-2" 
              data-bs-toggle="modal" data-bs-target="#userModal"
              onClick={() => { setEditing(false); setCurrentUser({ id: null, name: '', username: '' }); }}
            >
              + Agregar Usuario
            </button>
            <button className="btn btn-outline-danger" onClick={handleLogout}>
              Salir
            </button>
          </div>
        </div>

        {/* Tu tabla y modal aquí abajo igual que antes */}
        <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        <UserModal 
          key={editing ? `edit-${currentUser.id}` : 'add-new'}
          editing={editing} 
          currentUser={currentUser} 
          addUser={addUser} 
          updateUser={updateUser}
          setEditing={setEditing}
        />
      </div>
    )}
  </div>
  );
};

export default App;