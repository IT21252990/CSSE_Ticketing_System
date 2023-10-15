import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/busDetails.css'; // Import the CSS file

const BusDetailsPage = () => {
    const location = useLocation();
    const bus = location.state;

    return (
        <div className="bus-details-container">
            <div className="info-line">
                <label>Bus No:</label>
                <span>{bus.busNo}</span>
            </div>
            <div className="info-line">
                <label>Route:</label>
                <span>{`${bus.start_route} - ${bus.end_route}`}</span>
            </div>
            <div className="info-line">
                <label>Driver:</label>
                <span>{bus.driver}</span>
            </div>
            <div className="info-line">
                <label>Conductor:</label>
                <span>{bus.conductor}</span>
            </div>
            <div className="info-line">
                <label>Time Periods:</label>
                <div>
                    {bus.timePeriods.map((time, index) => (
                        <div key={index}>
                            <label>{`Time Period ${index + 1}:`}</label>
                            <span>{time}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BusDetailsPage;
