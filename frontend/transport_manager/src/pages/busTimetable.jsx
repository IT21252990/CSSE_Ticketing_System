import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import '../styles/busTimetable.css';
//import stratergies 
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
                // Update the buses state after deletion
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

//stratergy pattern
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
            <input
          type="text"
          value={searchBusNo}
          onChange={handleSearchChange}
          className="search-input"
          placeholder="Search Bus No"
        />
        <select onChange={(e) => handleFilterChange(e.target.value)}>
          <option value="busNo">Bus No</option>
          <option value="driver">Driver</option>
          <option value="conductor">Conductor</option>
        </select>
            </div>
            <table className="bus-table">
                <thead>
                    <tr>
                        <th className="table-heading">Bus No</th>
                        <th className="table-heading">Driver</th>
                        <th className="table-heading">Conductor</th>
                        <th className="table-heading">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBuses.map((bus) => (
                        <tr key={bus._id}>
                            <td>{bus.busNo}</td>
                            <td>{bus.driver}</td>
                            <td>{bus.conductor}</td>
                            <td>
                                <button onClick={() => handleDelete(bus._id)} className="action-button delete">
                                    Delete
                                </button>
                                <button onClick={() => handleUpdate(bus)} className="action-button update">
                                    Update
                                </button>
                                <button onClick={() => handleViewDetails(bus)} className="action-button view">
                                    View
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BusTimetable;
