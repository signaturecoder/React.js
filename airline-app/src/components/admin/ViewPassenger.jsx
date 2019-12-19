import React, { useState, useEffect } from 'react';

import axios from 'axios';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
// import PassengerList from "./PassengerList";
const ViewPassengerTable = () => {
  // state = {
  //   passengers: []
  // };
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/passengerList`).then(res => {
      const passenger = res.data;
      setPassengers(passenger);
    });
  }, []);

  // componentDidMount() {
  //   // after all the elements of the page is rendered correctly, this method is called
  //   axios.get(`http://localhost:3001/api/passengers`).then(res => {
  //     const passengers = res.data;
  //     this.setState({ passengers });
  //   });
  // }

  const renderTableData = () => {
    return passengers.map(passenger => {
      const {
        id,
        pName,
        passport,
        address,
      } = passenger; // destructring
      return (
        <tr key={id}>
          <td>{pName}</td>
          <td>{passport.passportNum}</td>
          <td>{passport.expiry_date}</td>
          <td>{address}</td>
          <td>
            <Button>
              <Link to={'/admin/editPassenger/' + id}>Edit</Link>
            </Button>
          </td>
        </tr>
      );
    });
  };
  return (
    <div>
      <h1>Passenger List</h1>
      <table className="passenger-table">
        <tbody>
          <tr>
            <th>Name</th>
            <th>Passport Number</th>
            <th>Expiry Date</th>
            <th>Address</th>
            <th>Edit</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};
export default ViewPassengerTable;
