import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
export default class FlightDetails extends Component {
  state = {
    flights: [],
  };

  componentDidMount() {
    // after all the elements of the page is rendered correctly, this method is called
    axios.get(`${process.env.REACT_APP_API_URL}/flightList`).then(res => {
      const flights = res.data;
      this.setState({ flights });
    });
  }
  renderFlightTable() {
    return this.state.flights.map((flight, index) => {
      const {
        id,
        flightId,
        flightName,
        meals,
        wheelChair,
        shopping_items,
        infantFacility,
      } = flight; // destructring
      return (
        <tr key={index}>
          <td>{flightId}</td>
          <td>{flightName}</td>
          <td>{meals}</td>
          <td>{shopping_items}</td>
          <td>{wheelChair ? 'Yes' : 'No'}</td>
          <td>{infantFacility ? 'Yes' : 'No'}</td>
          <td>
            <Button>
              <Link to={'/admin/addPassenger'}>Manage</Link>
            </Button>
          </td>
          <td>
            <Button>
              <Link to={'/admin/addServices/' + id}>Update</Link>
            </Button>
          </td>
          {/* <td>
            <Button>
              <Link to={"/admin/addServices/" + _id}>Delete</Link>
            </Button>
          </td> */}
        </tr>
      );
    });
  }
  render() {
    return (
      <div>
        <h1>Flight List</h1>
        <table className="passenger-table">
          <tbody>
            <tr>
              <th>Flight Number</th>
              <th>Flight Name</th>
              <th>Special Meals</th>
              <th>Shopping Items</th>
              <th>wheelChair</th>
              <th>InfantFacility</th>
              <th>Manage Passengers</th>
              <th>Manage Services</th>
              {/* <th>Delete Services</th> */}
            </tr>
            {this.renderFlightTable()}
          </tbody>
        </table>
      </div>
    );
  }
}
