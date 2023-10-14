import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;
  
//  ************fetching User data from backend *********
  useEffect(() => {
    axios.get('http://localhost:3000/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const showUserDetails = (user) => {
    setSelectedUser(user);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container">
      <div>
      {/* *************** User List ********************  */}
        <h1 className="my-4">User List</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>City</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              currentUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.address.city}</td>
                <td>{user.email}</td>
                <td>
                  <button className="btn btn-primary" 
                  onClick={() => showUserDetails(user)}>
                    View Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
{/* ********** Pagination *********************  */}
        <ul className="pagination justify-content-center">
          {Array(Math.ceil(users.length / usersPerPage))
            .fill()
            .map((_, index) => (
              <li key={index} className="page-item">
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
        </ul>
      </div>

{/* ************User Details **********************  */}
      {selectedUser && (
        <div className='container'>
          <div className='container-fluid'>
            <h2 className="my-4">Details of {selectedUser.name}</h2>
            <table className="table table-striped table-responsive">
              <tbody>
                <tr>
                  <td className="font-weight-bold">Username:</td>
                  <td>{selectedUser.username}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Email:</td>
                  <td>{selectedUser.email}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Address:</td>
                  <td>
                    {selectedUser.address.street}, 
                    {selectedUser.address.suite},
                    {selectedUser.address.city}
                  </td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Zipcode:</td>
                  <td>{selectedUser.address.zipcode}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Phone:</td>
                  <td>{selectedUser.phone}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Website:</td>
                  <td>{selectedUser.website}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Company:</td>
                  <td>{selectedUser.company.name}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Catchphrase:</td>
                  <td>{selectedUser.company.catchPhrase}</td>
                </tr>
                <tr>
                  <td className="font-weight-bold">Business:</td>
                  <td>{selectedUser.company.bs}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserList;
