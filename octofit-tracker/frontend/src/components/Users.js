import React, { useEffect, useState } from 'react';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('Users: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Users: fetched data', data);
        setUsers(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Users: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="h3 fw-bold page-header">Users</h2>
      {error && <div className="alert alert-danger alert-dismissible" role="alert">{error}</div>}
      <div className="card">
        <div className="card-header bg-primary text-white">
          <span className="me-2">👥</span>Registered Users
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No users found.</td></tr>
                ) : (
                  users.map((user, idx) => (
                    <tr key={user._id || idx}>
                      <td><span className="badge bg-secondary">{idx + 1}</span></td>
                      <td className="fw-semibold">{user.username}</td>
                      <td><a href={`mailto:${user.email}`} className="link-primary">{user.email}</a></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-muted small">{users.length} user(s) total</div>
      </div>
    </div>
  );
}

export default Users;
