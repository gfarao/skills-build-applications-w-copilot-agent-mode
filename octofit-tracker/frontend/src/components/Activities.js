import React, { useEffect, useState } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Activities: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Activities: fetched data', data);
        setActivities(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Activities: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="h3 fw-bold page-header">Activities</h2>
      {error && <div className="alert alert-danger alert-dismissible" role="alert">{error}</div>}
      <div className="card">
        <div className="card-header bg-warning text-dark">
          <span className="me-2">🏊</span>Activity Log
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration (min)</th>
                  <th scope="col">Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.length === 0 ? (
                  <tr><td colSpan="5" className="text-center text-muted py-4">No activities found.</td></tr>
                ) : (
                  activities.map((activity, idx) => (
                    <tr key={activity._id || idx}>
                      <td><span className="badge bg-secondary">{idx + 1}</span></td>
                      <td className="fw-semibold">{activity.user}</td>
                      <td><span className="badge bg-warning text-dark">{activity.activity_type}</span></td>
                      <td>{activity.duration}</td>
                      <td>{activity.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-muted small">{activities.length} activit{activities.length === 1 ? 'y' : 'ies'} total</div>
      </div>
    </div>
  );
}

export default Activities;
