import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('Fetching from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setTeams(results);
        console.log('Fetched teams:', results);
      })
      .catch(err => console.error('Error fetching teams:', err));
  }, [endpoint]);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <h2 className="card-title mb-4 text-primary">Teams</h2>
        <div className="table-responsive">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Members</th>
                <th>Captain</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr><td colSpan="5" className="text-center">No teams found.</td></tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{team.name || '-'}</td>
                    <td>{Array.isArray(team.members) ? team.members.length : '-'}</td>
                    <td>{team.captain || '-'}</td>
                    <td><button className="btn btn-sm btn-outline-primary" onClick={() => alert(JSON.stringify(team, null, 2))}>View</button></td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teams;
