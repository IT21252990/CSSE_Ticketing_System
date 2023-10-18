import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import '../styles/RoutePrice.css';

const RoutePrice = () => {
  const [routes, setRoutes] = useState([]);
  const [routeInfo, setRouteInfo] = useState({
    start_point: '',
    end_point: '',
    price: '',
  });
  const [updateMode, setUpdateMode] = useState(false); // Track if in update mode
  const [routeToUpdate, setRouteToUpdate] = useState(null); // Store the route being updated

  const fetchRoutes = () => {
    fetch('http://localhost:4000/Bus/getprice')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          console.log('Fetched routes:', data);
          setRoutes(data);
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch((error) => console.error('Error fetching routes:', error));
  };

  useEffect(() => {
    fetchRoutes();
  }, []); // Fetch routes on component mount

  const handleRouteInfoChange = (field, value) => {
    setRouteInfo({
      ...routeInfo,
      [field]: value,
    });
  };

  const handleAddRoute = () => {
    let url = 'http://localhost:4000/Bus/add-route';
  
    if (updateMode && routeToUpdate) {
      // If in update mode, modify the URL and add the route ID to update
      url = `http://localhost:4000/Bus/update-route/${routeToUpdate._id}`;
    }
  
    if (!routeInfo.start_point || !routeInfo.end_point || !routeInfo.price) {
      toast.error('Please fill in all route information fields.');
      return;
    }
  
    const routeData = {
      start_point: routeInfo.start_point,
      end_point: routeInfo.end_point,
      price: parseFloat(routeInfo.price),
    };
  
    fetch(url, {
      method: updateMode ? 'PUT' : 'POST', // Use PUT for update
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(routeData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Route data:', data);
        toast.success(`${updateMode ? 'Route updated' : 'Route added'} successfully`);
        fetchRoutes();
        // Clear the form fields after successful addition/update
        setRouteInfo({
          start_point: '',
          end_point: '',
          price: '',
        });
        setUpdateMode(false);
        setRouteToUpdate(null);
      })
      .catch((error) => {
        console.error(`Error ${updateMode ? 'updating' : 'adding'} route:`, error);
        toast.error(`Failed to ${updateMode ? 'update' : 'add'} route`);
      });
  };

  const handleUpdateRoute = (route) => {
    // Populate form fields with existing data for update
    setRouteInfo({
      start_point: route.start_point,
      end_point: route.end_point,
      price: route.price.toString(),
    });
    setUpdateMode(true);
    setRouteToUpdate(route);
  };

  const handleDeleteRoute = (id) => {
    const url = `http://localhost:4000/Bus/delete-route/${id}`;
  
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Route deleted:', data);
        toast.success('Route deleted successfully');
        fetchRoutes(); // Fetch updated routes after deletion
      })
      .catch((error) => {
        console.error('Error deleting route:', error);
        toast.error('Failed to delete route');
      });
  };

  return (
    <div className="container route-price-page">
  

    <div className="container">
      <div className="form-container">
        <h2>{updateMode ? 'Update Route' : 'Add a Route'}</h2>
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
        <div className="button-container">
          <button onClick={handleAddRoute}>
            {updateMode ? 'Update Route' : 'Add Route'}
          </button>
        </div>
      </div>

      <div className="table-container">
        <h2>Bus Routes and Prices</h2>
        <table>
          <thead>
            <tr>
              <th>Start Point</th>
              <th>End Point</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((route, index) => (
              <tr key={index}>
                <td>{route.start_point}</td>
                <td>{route.end_point}</td>
                <td>{route.price}</td>
                <td>
                  <button onClick={() => handleUpdateRoute(route)}>
                    Update
                  </button>
                  <button onClick={() => handleDeleteRoute(route._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Toaster />
    </div>
    </div>
  );
};

export default RoutePrice;
