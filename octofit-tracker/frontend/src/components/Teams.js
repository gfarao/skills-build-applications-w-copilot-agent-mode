import React, { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);

  const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Teams: fetching from', apiUrl);
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
        console.log('Teams: fetched data', data);
        setTeams(Array.isArray(data) ? data : data.results || []);
      })
      .catch(err => {
        console.error('Teams: fetch error', err);
        setError(err.message);
      });
  }, [apiUrl]);

  return (
    <div className="container mt-4">
      <h2 className="h3 fw-bold page-header">Teams</h2>
      {error && <div className="alert alert-danger alert-dismissible" role="alert">{error}</div>}
      <div className="card">
        <div className="card-header bg-success text-white">
          <span className="me-2">🏆</span>Teams
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-striped table-hover align-middle mb-0">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Team Name</th>
                  <th scope="col">Members</th>
                </tr>
              </thead>
              <tbody>
                {teams.length === 0 ? (
                  <tr><td colSpan="3" className="text-center text-muted py-4">No teams found.</td></tr>
                ) : (
                  teams.map((team, idx) => (
                    <tr key={team._id || idx}>
                      <td><span className="badge bg-secondary">{idx + 1}</span></td>
                      <td className="fw-semibold">{team.name}</td>
                      <td>
                        {Array.isArray(team.members)
                          ? team.members.map((m, i) => (
                              <span key={i} className="badge bg-light text-dark border me-1">{m}</span>
                            ))
                          : <span className="badge bg-light text-dark border">{team.members}</span>
                        }
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer text-muted small">{teams.length} team(s) total</div>
      </div>
    </div>
  );
}

export default Teams;
