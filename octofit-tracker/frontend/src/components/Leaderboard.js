import React, { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard: fetched data', data);
        setEntries(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Leaderboard: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="h3 fw-bold page-header">Leaderboard</h2>
      {error && <div className="alert alert-danger alert-dismissible" role="alert">{error}</div>}
      <div className="card">
        <div className="card-header bg-danger text-white">
          <span className="me-2">🏅</span>Top Performers
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">User</th>
                  <th scope="col">Score</th>
                </tr>
              </thead>
              <tbody>
                {entries.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No entries found.</td></tr>
                ) : (
                  entries.map((entry, idx) => (
                    <tr key={entry._id || idx} className={idx === 0 ? 'table-warning' : ''}>
                      <td>
                        {idx === 0 ? <span className="badge bg-warning text-dark fs-6">🥇 1</span>
                          : idx === 1 ? <span className="badge bg-secondary fs-6">🥈 2</span>
                          : idx === 2 ? <span className="badge bg-danger fs-6">🥉 3</span>
                          : <span className="badge bg-light text-dark border">{idx + 1}</span>
                        }
                      </td>
                      <td className="fw-semibold">{entry.user}</td>
                      <td><span className="badge bg-primary fs-6">{entry.score}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-muted small">{entries.length} participant(s) ranked</div>
      </div>
    </div>
  );
}

export default Leaderboard;
