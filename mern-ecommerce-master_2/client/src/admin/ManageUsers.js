import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';
import { getUsers, deleteUser } from './apiAdmin';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const { user, token } = isAuthenticated();

  const loadUsers = () => {
    getUsers().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setUsers(data);
      }
    });
  };

  const destroy = (userId) => {
    deleteUser(userId, user._id, token).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        loadUsers();
      }
    });
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <Layout
      title='Manage Users'
      description='Perform CRUD on users'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-12'>
          <h2 className='text-center'>Total {users.length} Users</h2>
          <hr />
          <ul className='list-group'>
            {users.map((u, i) => (
              <li
                key={i}
                className='list-group-item d-flex justify-content-between align-items-center'
              >
                <strong>{u.name}</strong>
                <Link to={`/admin/user/update/${u._id}`}>
                  <span className='badge badge-warning badge-pill'>Update</span>
                </Link>
                <Link>
                  <span
                    onClick={() => destroy(u._id)}
                    className='badge badge-danger badge-pill'
                  >
                    Delete
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageUsers;
