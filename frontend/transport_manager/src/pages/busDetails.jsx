// BusDetailsPage.js

import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/busDetails.css'; // Import the CSS file

const BusDetailsPage = () => {
  const location = useLocation();
  const bus = location.state;

  return (
    <div>
      <h2 className="page-title">{`${bus.busNo} - Bus Details`}</h2>
      <div className="bus-details-container">
        <div className="info-line">
          <div className="info-item">
            <label>Bus No:</label>
            <span>{bus.busNo}</span>
          </div>
          <div className="info-item">
            <label>Route:</label>
            <span>{`${bus.start_route} - ${bus.end_route}`}</span>
          </div>
        </div>
        <div className="info-line">
          <div className="info-item">
            <label>Driver:</label>
            <span>{bus.driver}</span>
          </div>
          <div className="info-item">
            <label>Conductor:</label>
            <span>{bus.conductor}</span>
          </div>
        </div>
        <div className="info-line">
          
          <table className="time-periods-table">
            <thead>
              <tr>
                <th>Time Period</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {bus.timePeriods.map((time, index) => (
                <tr key={index}>
                  <td>{`Time Period ${index + 1}`}</td>
                  <td>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BusDetailsPage;
