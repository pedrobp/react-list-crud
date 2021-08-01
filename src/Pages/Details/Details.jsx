import { useMutation } from '@apollo/react-hooks';
import { UPDATE_USER } from 'GraphQL/Mutations';
import { ALL_USERS_QUERY } from 'GraphQL/Queries';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './details.css';

const Details = ({ selectedUser }) => {
  const [name, setName] = useState(selectedUser.name);
  const [role, setRole] = useState(selectedUser.role);
  const [updateUser] = useMutation(UPDATE_USER, { refetchQueries: [{ query: ALL_USERS_QUERY }] });

  const handleSaveUser = () => {
    updateUser({
      variables: {
        email: selectedUser.email,
        newAttributes: {
          name,
          role,
        },
      },
    });
  };

  return (
    <div className="root">
      {Object.keys(selectedUser).length === 0 && <Redirect to="/list" />}

      <div className="page-header">
        <h1 className="page-name">{selectedUser.email}</h1>
        <Link to="/list">
          <button className="save-button" onClick={handleSaveUser}>
            Save
          </button>
        </Link>
      </div>

      <div className="information">
        <div className="user-name">
          <div>Name</div>
          <input
            className="name-input"
            maxLength={50}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="user-role">
          <div>Role</div>
          <div className="radio-buttons" onChange={(e) => setRole(e.target.value)}>
            <label>
              <input type="radio" value="ADMIN" name="role" defaultChecked={role === 'ADMIN'} />
              Admin
            </label>

            <label>
              <input
                type="radio"
                value="DEVELOPER"
                name="role"
                defaultChecked={role === 'DEVELOPER'}
              />
              Developer
            </label>

            <label>
              <input
                type="radio"
                value="APP_MANAGER"
                name="role"
                defaultChecked={role === 'APP_MANAGER'}
              />
              App Manager
            </label>

            <label>
              <input
                type="radio"
                value="MARKETING"
                name="role"
                defaultChecked={role === 'MARKETING'}
              />
              Marketing
            </label>

            <label>
              <input type="radio" value="SALES" name="role" defaultChecked={role === 'SALES'} />
              Sales
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
