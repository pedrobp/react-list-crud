import React, { useEffect, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { ALL_USERS_QUERY } from 'GraphQL/Queries';
import { DELETE_USERS, RESET_USERS } from 'GraphQL/Mutations';
import { Redirect } from 'react-router-dom';
import './user-list.css';
import LoadingOverlay from 'react-loading-overlay';

const roleLabels = {
  ADMIN: 'Admin',
  DEVELOPER: 'Developer',
  APP_MANAGER: 'App Manager',
  MARKETING: 'Marketing',
  SALES: 'Sales',
};

const UserList = ({ handleSelectUser }) => {
  const { data } = useQuery(ALL_USERS_QUERY);
  const [deleteUsers] = useMutation(DELETE_USERS, { refetchQueries: [{ query: ALL_USERS_QUERY }] });

  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [checkedUsers, setCheckedUsers] = useState([]);

  useEffect(() => {
    if (data) {
      setUsers(data.allUsers);
      setIsLoading(false);
    }
  }, [data]);

  const handleCheckUser = (email) => {
    if (checkedUsers.includes(email)) {
      setCheckedUsers([...checkedUsers].filter((e) => e !== email));
    } else {
      setCheckedUsers([...checkedUsers, email]);
    }
  };

  const handleDelete = () => {
    setIsLoading(true);

    deleteUsers({
      variables: {
        emails: checkedUsers,
      },
    }).then(() => {
      setCheckedUsers([]);
    });
  };

  const handleShowDetails = (email) => {
    handleSelectUser(users.find((u) => u.email === email));
    setRedirect(true);
  };

  return (
    <div className="root">
      {redirect && <Redirect to="/details" />}

      <div className="page-header">
        <h1 className="page-name">Users</h1>
        <button className="delete-button" onClick={handleDelete}>
          Delete
        </button>
      </div>
      <LoadingOverlay active={isLoading} className="loading" spinner text="Updating users...">
        <table>
          <thead>
            <tr>
              <th />
              <th>EMAIL</th>
              <th>NAME</th>
              <th>ROLE</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              let checked = checkedUsers.includes(user.email);

              return (
                <tr onClick={() => handleShowDetails(user.email)} key={index}>
                  <td className="checkbox">
                    <input
                      type="checkbox"
                      checked={checked}
                      onClick={(e) => e.stopPropagation()}
                      onChange={() => handleCheckUser(user.email)}
                    />
                  </td>
                  <td className={`email ${checked && 'checked'}`}>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{roleLabels[user.role]}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </LoadingOverlay>
    </div>
  );
};

export default UserList;
