// BusTimetable.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import '../styles/busTimetable.css';
import { BusNoFilterStrategy, DriverFilterStrategy, ConductorFilterStrategy } from '../strategies/strategies';

const BusTimetable = () => {
  const navigate = useNavigate();
  const [buses, setBuses] = useState([]);
  const [searchBusNo, setSearchBusNo] = useState('');
  const [filterStrategy, setFilterStrategy] = useState(new BusNoFilterStrategy());

  useEffect(() => {
    // Fetch the bus data
    fetch('http://localhost:4000/Bus', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setBuses(data);
      })
      .catch((error) => {
        console.error('Error fetching bus data:', error);
      });
  }, []);

  const handleDelete = (busId) => {
    fetch(`http://localhost:4000/Bus/${busId}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Bus deleted successfully:', data);
        setBuses((prevBuses) => prevBuses.filter((bus) => bus._id !== busId));
        toast.success('Bus deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting bus:', error);
      });
  };

  const handleUpdate = (bus) => {
    navigate(`/update/${bus._id}`, { state: bus });
  };

  const handleSearchChange = (event) => {
    setSearchBusNo(event.target.value);
  };

  const handleViewDetails = (bus) => {
    navigate(`/view/${bus._id}`, { state: bus });
  };

  const handleFilterChange = (filterType) => {
    switch (filterType) {
      case 'busNo':
        setFilterStrategy(new BusNoFilterStrategy());
        break;
      case 'driver':
        setFilterStrategy(new DriverFilterStrategy());
        break;
      case 'conductor':
        setFilterStrategy(new ConductorFilterStrategy());
        break;
      default:
        setFilterStrategy(new BusNoFilterStrategy());
        break;
    }
  };

  const filteredBuses = filterStrategy.filter(buses, searchBusNo);

  return (
    <div className="bus-timetable-container">
      <h2 className="bus-timetable-heading">Bus Timetable</h2>
      <div className="search-container">
      <select onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="busNo">Bus No</option>
          <option value="driver">Driver</option>
          <option value="conductor">Conductor</option>
        </select>
        <input
          type="text"
          value={searchBusNo}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search Bus No"
        />
        
      </div>
      <table className="bus-table">
        <thead>
          <tr>
            <th className="table-heading" data-label="Bus No">
              Bus No
            </th>
            <th className="table-heading" data-label="Driver">
              Driver
            </th>
            <th className="table-heading" data-label="Conductor">
              Conductor
            </th>
            <th className="table-heading" data-label="Actions">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredBuses.map((bus) => (
            <tr key={bus._id}>
              <td data-label="Bus No">{bus.busNo}</td>
              <td data-label="Driver">{bus.driver}</td>
              <td data-label="Conductor">{bus.conductor}</td>
              <td data-label="Actions">
                <div className="action-buttons">
                  <button onClick={() => handleDelete(bus._id)} className="action-button delete">
                    Delete
                  </button>
                  <button onClick={() => handleUpdate(bus)} className="action-button update">
                    Update
                  </button>
                  <button onClick={() => handleViewDetails(bus)} className="action-button view">
                    View
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Toaster />
    </div>
  );
};

export default BusTimetable;
