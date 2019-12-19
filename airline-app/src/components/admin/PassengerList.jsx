import React, { useState, useEffect } from 'react';
import axios from 'axios';
const PassengerList = () => {
  const [passengers, setPassengers] = useState([]);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/passengerList`).then(res => {
      const passenger = res.data;
      setPassengers(passenger);
    });
  }, []);

  const renderTableData = () => {
    return passengers.map(passenger => {
      const { id, flightId, pName, seat_no, wheelChair, infantFacility } = passenger; // destructring
      return (
        <tr key={id}>
          <td>{flightId}</td>
          <td>{pName}</td>
          <td>{seat_no}</td>
          <td>{wheelChair ? 'Yes' : 'No'}</td>
          <td>{infantFacility ? 'Yes' : 'No'}</td>
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
            <th>Flight Id</th>
            <th>Passenger Name</th>
            <th>Seat Number</th>
            <th>Wheel Chair</th>
            <th>Infant Facility</th>
          </tr>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
};
export default PassengerList;
