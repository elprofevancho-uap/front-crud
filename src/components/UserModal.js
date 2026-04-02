import React, { useState, useEffect } from 'react';

const UserModal = ({ editing, currentUser, addUser, updateUser, setEditing }) => {
  const initialFormState = { id: null, name: '', username: '' };
  const [user, setUser] = useState(initialFormState);

  // Sincronizar el estado del formulario con el usuario a editar o limpiar si es nuevo
  useEffect(() => {
    if (editing) {
      setUser(currentUser);
    } else {
      setUser(initialFormState);
    }
  }, [editing, currentUser]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.username) return;

    if (editing) {
      updateUser(user.id, user);
    } else {
      addUser(user);
    }
    
    // Cerrar el modal programáticamente (usando el data-bs-dismiss del botón)
    document.getElementById('closeModal').click();
  };

  return (
    <div className="modal fade" id="userModal" tabIndex="-1" aria-labelledby="userModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="userModalLabel">
              {editing ? 'Editar Usuario' : 'Agregar Nuevo Usuario'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => setEditing(false)}></button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input type="text" className="form-control" name="name" value={user.name} onChange={handleInputChange} />
              </div>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input type="text" className="form-control" name="username" value={user.username} onChange={handleInputChange} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" id="closeModal" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setEditing(false)}>Cancelar</button>
              <button type="submit" className="btn btn-primary">
                {editing ? 'Guardar Cambios' : 'Crear Usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserModal;