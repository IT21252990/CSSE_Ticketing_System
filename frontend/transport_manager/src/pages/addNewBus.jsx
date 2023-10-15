import React, { useState } from 'react';
import '../styles/addNewBuss.css';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const AddNewBus = () => {
    const navigate = useNavigate();

    const [busInfo, setBusInfo] = useState({
        busNo: '',
        start_route: '',
        end_route: '',
        driver: '',
        conductor: '',
    });

    const [timePeriods, setTimePeriods] = useState([]);

    const handleBusInfoChange = (field, value) => {
        setBusInfo({
            ...busInfo,
            [field]: value,
        });
    };

    const handleTimePeriodChange = (index, value) => {
        const newTimePeriods = [...timePeriods];
        newTimePeriods[index] = value;
        setTimePeriods(newTimePeriods);
    };

    const handleAddBus = () => {
        if (
            !busInfo.busNo ||
            !busInfo.start_route ||
            !busInfo.end_route ||
            !busInfo.driver ||
            !busInfo.conductor
        ) {
            toast.error('Please fill in all bus information fields.');
            return;
        }

        const busData = {
            ...busInfo,
            timePeriods,
        };

        // Send a POST request to add the new bus
        fetch('http://localhost:4000/Bus/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(busData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Bus added successfully:', data);
                navigate('/busTimetable');
                toast.success('Bus added successfully');
            })
            .catch((error) => {
                console.error('Error adding bus:', error);
                toast.error('Failed to add bus');
            });
    };

    return (
        <div className="add-new-bus-container">
            <div className="left-side">
                <h2>Bus Information</h2>
                <div className="form-group">
                    <label>Bus No:</label>
                    <input
                        type="text"
                        placeholder="Bus No"
                        value={busInfo.busNo}
                        onChange={(e) => handleBusInfoChange('busNo', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Starting Route:</label>
                    <input
                        type="text"
                        placeholder="Starting Route"
                        value={busInfo.start_route}
                        onChange={(e) => handleBusInfoChange('start_route', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Ending Route:</label>
                    <input
                        type="text"
                        placeholder="Ending Route"
                        value={busInfo.end_route}
                        onChange={(e) => handleBusInfoChange('end_route', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Driver:</label>
                    <input
                        type="text"
                        placeholder="Driver"
                        value={busInfo.driver}
                        onChange={(e) => handleBusInfoChange('driver', e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Conductor:</label>
                    <input
                        type="text"
                        placeholder="Conductor"
                        value={busInfo.conductor}
                        onChange={(e) => handleBusInfoChange('conductor', e.target.value)}
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
                            value={timePeriods[index]}
                            onChange={(e) => handleTimePeriodChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <button className="add-button" onClick={handleAddBus}>
                Add Bus
            </button>
            <Toaster />
        </div>
    );
};

export default AddNewBus;
