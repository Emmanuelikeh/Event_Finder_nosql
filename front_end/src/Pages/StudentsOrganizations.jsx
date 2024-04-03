import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const StudentsOrganizations = () => {
  const organizations = [
    { id: 1, name: 'Computer Science Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' },
    { id: 2, name: 'Art Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
    { id: 3, name: 'Music Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
    { id: 4, name: 'Sports Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Sports' },
    { id: 5, name: 'Dance Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
    { id: 6, name: 'Science Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' },
    { id: 7, name: 'Literature Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' },
    { id: 8, name: 'Photography Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
    { id: 9, name: 'Debate Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' }
  ];

  const [searchTerm, setSearchTerm] = useState('');

  const handleFavorite = (orgId) => {
    // Handle adding organization to favorites
    console.log(`Add organization with ID ${orgId} to favorites`);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrganizations = organizations.filter(org =>
    org.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="mb-0">Organizations</h1>
        <div className="input-group w-25">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button">Search</button>
          </div>
        </div>
      </div>
      <div className="row">
        {filteredOrganizations.map((org, index) => (
          <div key={org.id} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{org.name}</h5>
                <p className="card-text">{org.description}</p>
                <p className="card-text">Type: {org.type}</p>
                <button className="btn btn-primary mr-2 w-100" onClick={() => handleFavorite(org.id)}>
                  Favorite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentsOrganizations;
