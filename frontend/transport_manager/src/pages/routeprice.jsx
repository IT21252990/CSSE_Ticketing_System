import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

const Price = () => {
    const navigate = useNavigate();

    const [routeInfo, setRouteInfo] = useState({
        start_point: '',
        end_point: '',
        price: '',
    });

    const handleRouteInfoChange = (field, value) => {
        setRouteInfo({
            ...routeInfo,
            [field]: value,
        });
    };

    const handleAddRoute = () => {
        if (!routeInfo.start_point || !routeInfo.end_point || !routeInfo.price) {
            toast.error('Please fill in all route information fields.');
            return;
        }

        const routeData = {
            start_point: routeInfo.start_point,
            end_point: routeInfo.end_point,
            price: parseFloat(routeInfo.price),  // Parse the price as a float
        };

        // Send a POST request to add the new route
        fetch('http://localhost:4000/Bus/add-route', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(routeData),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Route added successfully:', data);
                navigate('/price'); 
                toast.success('Route added successfully');
            })
            .catch((error) => {
                console.error('Error adding route:', error);
                toast.error('Failed to add route');
            });
    };

    return (
        <div>
            <h2>Add a Route</h2>
            <div className="form-group">
                <label>Start Point:</label>
                <input
                    type="text"
                    placeholder="Start Point"
                    value={routeInfo.start_point}
                    onChange={(e) => handleRouteInfoChange('start_point', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>End Point:</label>
                <input
                    type="text"
                    placeholder="End Point"
                    value={routeInfo.end_point}
                    onChange={(e) => handleRouteInfoChange('end_point', e.target.value)}
                />
            </div>
            <div className="form-group">
                <label>Price:</label>
                <input
                    type="number"
                    placeholder="Price"
                    value={routeInfo.price}
                    onChange={(e) => handleRouteInfoChange('price', e.target.value)}
                />
            </div>
            <button onClick={handleAddRoute}>Add Route</button>
            <Toaster />
        </div>
    );
}

export default Price;
