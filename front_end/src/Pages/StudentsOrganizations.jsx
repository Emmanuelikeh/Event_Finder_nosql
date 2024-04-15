import React, { useState, useEffect,  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom';

const StudentsOrganizations = () => {

  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  // get user from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user._id;



  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/organizers', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        });
        const data = await response.json();
        console.log(data);
        setOrganizations(data);
      }
      catch (error) {
        console.error('Error fetching organizations:', error);
      }
    }
    fetchOrganizations();
  }, []);

  const handleDetails = (USERID, USERNAME, EMAIL, ORGID) => {
    console.log(ORGID ,"is the ORGID")
    navigate(`/organization-detail`, { state: {USERID, USERNAME, EMAIL, ORGID} });
    
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrganizations = organizations.filter(org =>
    org.username.toLowerCase().includes(searchTerm.toLowerCase())
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
          <div key={index} className="col-md-4 col-sm-6 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{org.username}</h5>
                <p className='card-text'>{org.email}</p>
                {/* <p className="card-text">{org.description}</p> */}
                <p className="card-text">Type: {"ACADEMIC"}</p>
                <button className="btn btn-primary mr-2 w-100" onClick={() => handleDetails(userID, org.username, org.email, org._id)}>
                  Details
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
