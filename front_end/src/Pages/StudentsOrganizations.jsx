import React, { useState, useEffect,  } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate} from 'react-router-dom';

const StudentsOrganizations = () => {
  // const organizations = [
  //   { id: 1, name: 'Computer Science Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' },
  //   { id: 2, name: 'Art Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
  //   { id: 3, name: 'Music Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
  //   { id: 4, name: 'Sports Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Sports' },
  //   { id: 5, name: 'Dance Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
  //   { id: 6, name: 'Science Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' },
  //   { id: 7, name: 'Literature Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' },
  //   { id: 8, name: 'Photography Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Cultural' },
  //   { id: 9, name: 'Debate Club', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', type: 'Academic' }
  // ];

  const [searchTerm, setSearchTerm] = useState('');
  const [organizations, setOrganizations] = useState([]);
  const navigate = useNavigate();

  // get user from local storage
  const user = JSON.parse(localStorage.getItem('user'));
  const userID = user.id;




//   router.get('/organizers', auth, async (req, res) => {
//     console.log("Get all organizers");
//     try {
//         const organizers = await User.findOrganizers();
//         res.json(organizers);
//     } catch (error) {
//         res.status(500).json({ error });
//     }
// })

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

  const handleDetails = (USERID, USERNAME, EMAIL) => {
    navigate(`/organization-detail`, { state: {USERID, USERNAME, EMAIL} });
    
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOrganizations = organizations.filter(org =>
    org.USERNAME.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h5 className="card-title">{org.USERNAME}</h5>
                <p className='card-text'>{org.EMAIL}</p>
                {/* <p className="card-text">{org.description}</p> */}
                <p className="card-text">Type: {"ACADEMIC"}</p>
                <button className="btn btn-primary mr-2 w-100" onClick={() => handleDetails(userID, org.USERNAME, org.EMAIL)}>
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
