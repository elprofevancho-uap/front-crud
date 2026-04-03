import React, { useState } from 'react';
import UserTable from './components/UserTable';
import UserModal from './components/UserModal';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

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
      {/* 1. Navbar Fija: Siempre visible, recibe los estados de navegación */}
      <Navbar 
        isAuthenticated={isAuthenticated} 
        onLogout={handleLogout}
        onGoToLogin={() => setView('login')}
        onGoToRegister={() => setView('register')}
        view={view}
      />

      {/* 2. Contenedor de Contenido: 
          Usamos pt-5 (padding-top) o style para que el contenido empiece 
          debajo de la navbar fija (aprox 70px-80px). 
      */}
      <main style={{ paddingTop: '80px', minHeight: '100vh' }} className="bg-light">
        <div className="container">
          
          {!isAuthenticated ? (
            /* VISTA PÚBLICA: Login o Registro */
            <div className="row justify-content-center">
              <div className="col-12 col-md-6 col-lg-4">
                {view === 'login' ? (
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
                )}
              </div>
            </div>
          ) : (
            /* VISTA PRIVADA: Panel de Administración CRUD */
            <div className="row">
              <div className="col-12">
                <div className="card shadow-sm border-0 mb-4">
                  <div className="card-body d-flex justify-content-between align-items-center">
                    <div>
                      <h2 className="h4 mb-0 text-primary">Gestión de Usuarios</h2>
                      <p className="text-muted small mb-0">Administra los registros de la base de datos local</p>
                    </div>
                    <button 
                      className="btn btn-success d-flex align-items-center" 
                      data-bs-toggle="modal" 
                      data-bs-target="#userModal"
                      onClick={() => {
                        setEditing(false);
                        setCurrentUser({ id: null, name: '', username: '' });
                      }}
                    >
                      <i className="bi bi-plus-lg me-2"></i> Nuevo Usuario
                    </button>
                  </div>
                </div>

                {/* Tabla de Resultados */}
                <div className="card shadow-sm border-0">
                  <div className="card-body p-0">
                    <UserTable 
                      users={users} 
                      editRow={editRow} 
                      deleteUser={deleteUser} 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 3. Modal Unificado: 
          Fuera del flujo principal para evitar conflictos de posicionamiento.
          Se controla mediante el ID #userModal usado en los botones.
      */}
      <UserModal 
        key={editing ? `edit-${currentUser.id}` : 'add-new'}
        editing={editing} 
        currentUser={currentUser} 
        addUser={addUser} 
        updateUser={updateUser}
        setEditing={setEditing}
      />
      
      {/* 4. Footer */}
      <Footer />
    </div>
  );
};

export default App;