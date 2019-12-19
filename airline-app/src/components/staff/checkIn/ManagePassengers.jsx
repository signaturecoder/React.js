import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import { AddToPaxSeatMap } from '../../../redux/actions/PassengerActions';
class ManagePassengers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      passengers: [],
    };
  }

  componentDidMount() {
    // after all the elements of the page is rendered correctly, this method is called
    // getting all passengers by filght id
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/passengerList/?flightId=${this.props.match.params.id}`
      )
      .then(res => {
        const passengers = res.data;

        // getting all passengers having seat
        let filteredPassengers = passengers
          .filter(passenger => passenger.seat_no !== '')
          .map(passenger => {
            return {
              paxId: passenger.id,
              seatNo: this.getSeatNoFromSeatLocation(passenger.seat_no),
              wheelChair: passenger.wheelChair,
              infantFacility: passenger.infantFacility
            };
          });
        filteredPassengers.map(item => {
          const { paxId, seatNo, wheelChair, infantFacility} = item;
          this.props.addToPaxSeatMap(paxId, seatNo, wheelChair, infantFacility);
        })
        this.setState({ passengers });
      });
  }

  getSeatNoFromSeatLocation = seatLocation => {
    let col = String(seatLocation).charAt(0);
    let row = String(seatLocation).substring(1);
    switch (col) {
      case 'A':
        col = 0;
        break;
      case 'B':
        col = 1;
        break;
      case 'C':
        col = 2;
        break;
      case 'D':
        col = 3;
        break;
      case 'E':
        col = 4;
        break;
      default:
    }
    return (row - 1) * 5 + col;
  };

  renderPassengerTable() {
    const service = this.props.match.params.services;
    return this.state.passengers.map((passenger, index) => {
      const {
        id,
        flightId,
        pName,
        seat_no,
        meals,
        wheelChair,
        shopping_items,
        infantFacility,
      } = passenger; // destructring
      return (
        <tr key={index}>
          <td>{flightId}</td>
          <td>{pName}</td>
          <td>{seat_no ? 'Yes' : 'No'}</td>
          <td>{seat_no}</td>
          <td>{meals}</td>
          <td>{shopping_items}</td>
          <td>{wheelChair ? 'Yes' : 'No'}</td>
          <td>{infantFacility ? 'Yes' : 'No'}</td>
          <td>
            {service ? (
              <Button>
                <Link to={`/staff/inFlight/flightServices/${id}`}>
                  Add Services
                </Link>
              </Button>
            ) : (
              <Button>
                {/* <Link to={`/staff/checkIn/seatAllocation/${id}/${flightId}`}>
                 Check In
                </Link> */}
                <Link to={`/staff/checkIn/seatMatrix/${id}/${flightId}`}>
                  Check In
                </Link>
              </Button>
            )}
          </td>
        </tr>
      );
    });
  }
  render() {
    const changeLabel = this.props.match.params.services;
    return (
      <>
        <h1> Manage Passenger List </h1>
        <table className="passenger-table">
          <tbody>
            <tr>
              <th>Flight Number</th>
              <th>Passenger Name</th>
              <th>Checking Status</th>
              <th>Seat Number</th>
              <th>Special Meals</th>
              <th>Shopping Items</th>
              <th>wheelChair</th>
              <th>InfantFacility</th>
              <th>{changeLabel ? 'Update Services' : 'Check in'}</th>
            </tr>
            {this.renderPassengerTable()}
          </tbody>
        </table>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    passengerSeatMap: state.paxSeatMap.passengerSeatMap,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    addToPaxSeatMap: (paxId, seatNo, wheelChair, infantFacility) =>
      dispatch(AddToPaxSeatMap(paxId, seatNo, wheelChair, infantFacility)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePassengers);