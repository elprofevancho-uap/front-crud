import React from 'react';

const UserTable = (props) => (
  <table className="table table-striped table-hover mt-4">
    <thead className="table-dark">
      <tr>
        <th>Nombre</th>
        <th>Usuario</th>
        <th className="text-center">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {props.users.map((user) => (
        <tr key={user.id}>
          <td className="align-middle">{user.name}</td>
          <td className="align-middle">{user.username}</td>
          <td className="text-center">
           <button
            className="btn btn-sm btn-info me-2"
            data-bs-toggle="modal" 
            data-bs-target="#userModal"
            onClick={() => props.editRow(user)} // Actualiza el estado en App.js
            >
            Editar
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => props.deleteUser(user.id)}>Eliminar</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default UserTable;