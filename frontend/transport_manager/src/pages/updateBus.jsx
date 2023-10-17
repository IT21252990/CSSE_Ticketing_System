import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import '../styles/addNewBuss.css';
import { useNavigate } from 'react-router-dom';

const UpdateBus = () => {
  const location = useLocation();
  const bus = location.state;
  const navigate = useNavigate();

  const [updatedBusInfo, setUpdatedBusInfo] = useState({
    busNo: bus.busNo,
    start_route: bus.start_route,
    end_route: bus.end_route,
    driver: bus.driver,
    conductor: bus.conductor,
    conductor_username: bus.conductor_username,
    conductor_password: bus.conductor_password,
    timePeriods: bus.timePeriods || ['', '', '', ''], // Default to 4 time periods if not provided
  });

  const handleUpdateBus = () => {
    fetch(`http://localhost:4000/Bus/${bus._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedBusInfo),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Bus updated successfully:', data);
        navigate('/busTimetable');
        toast.success('Bus updated successfully');
      })
      .catch(error => {
        console.error('Error updating bus:', error);
        toast.error('Failed to update bus');
      });
  };

  const handleTimePeriodChange = (index, value) => {
    const newTimePeriods = [...updatedBusInfo.timePeriods];
    newTimePeriods[index] = value;
    setUpdatedBusInfo({ ...updatedBusInfo, timePeriods: newTimePeriods });
  };

  return (
    <div className="add-new-bus-container">
      <div className="left-side">
        <h2>Update Bus Information</h2>
        <div className="form-group">
          <label>Bus No:</label>
          <input
            type="text"
            placeholder="Bus No"
            value={updatedBusInfo.busNo}
            onChange={e => setUpdatedBusInfo({ ...updatedBusInfo, busNo: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Starting Route:</label>
          <input
            type="text"
            placeholder="Starting route"
            value={updatedBusInfo.start_route}
            onChange={e => setUpdatedBusInfo({ ...updatedBusInfo, start_route: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Ending Route:</label>
          <input
            type="text"
            placeholder="Ending route"
            value={updatedBusInfo.end_route}
            onChange={e => setUpdatedBusInfo({ ...updatedBusInfo, end_route: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Driver:</label>
          <input
            type="text"
            placeholder="Driver"
            value={updatedBusInfo.driver}
            onChange={e => setUpdatedBusInfo({ ...updatedBusInfo, driver: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Conductor:</label>
          <input
            type="text"
            placeholder="Conductor"
            value={updatedBusInfo.conductor}
            onChange={e => setUpdatedBusInfo({ ...updatedBusInfo, conductor: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Conductor UserName:</label>
          <input
            type="text"
            placeholder="Conductor UserName"
            value={updatedBusInfo.conductor_username}
            onChange={e => setUpdatedBusInfo({ ...updatedBusInfo, conductor_username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label>Conductor Password:</label>
          <input
            type="text"
            placeholder="Conductor Password"
            value={updatedBusInfo.conductor_password}
            onChange={e => setUpdatedBusInfo({ ...updatedBusInfo, conductor_password: e.target.value })}
          />
        </div>
      </div>
      <div className="right-side">
        <h2>Time Periods</h2>
        {[1, 2, 3, 4].map((period, index) => (
          <div className="form-group" key={index}>
            <label>{`Time Period ${period}:`}</label>
            <input
              type="time"
              value={updatedBusInfo.timePeriods[index]}
              onChange={e => handleTimePeriodChange(index, e.target.value)}
            />
          </div>
        ))}

        <button className="add-button" onClick={handleUpdateBus}>Update</button>
      </div>
      <Toaster />
    </div>
  );
};

export default UpdateBus;
