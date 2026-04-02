import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';

const App = () => {
  const [users, setUsers] = useState([{ id: 1, name: 'Tania', username: 'floppydiskette' }]);
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState({ id: null, name: '', username: '' });

  const addUser = (user) => {
    user.id = users.length + 1;
    setUsers([...users, user]);
  };

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
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Directorio de Usuarios</h1>
       // En App.js
      <button 
        className="btn btn-success" 
        data-bs-toggle="modal" 
        data-bs-target="#userModal"
        onClick={() => {
          setEditing(false);
          setCurrentUser({ id: null, name: '', username: '' }); // <--- CRUCIAL: Limpia el usuario actual
        }}
      >
        + Agregar Usuario
      </button>
      </div>

      <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />

      <UserModal 
        editing={editing} 
        currentUser={currentUser} 
        addUser={addUser} 
        updateUser={updateUser}
        setEditing={setEditing}
      />
    </div>
  );
};

export default App;