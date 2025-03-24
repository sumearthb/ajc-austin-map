import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import { useEffect, useState } from 'react';

function App() {
  const [type, setType] = useState('');
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    fetch('places.json') 
      .then(response => response.json())
      .then(data => {
        setPlaces(data.places);
      })
      .catch(error => console.error('Error loading places:', error));
  }, []);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const initMap = () => {
    const austin = { lat: 30.2672, lng: -97.7431 };
    const map = new window.google.maps.Map(document.getElementById('map'), {
      zoom: 12,
      center: austin,
    });

    places.forEach((place) => {
      const marker = new window.google.maps.Marker({
        position: { lat: place.latitude, lng: place.longitude },
        map: map,
        title: place.name,
      });

      const infoWindow = new window.google.maps.InfoWindow({
        content: `<h3>${place.name}</h3><p>${place.description}</p>`,
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      initMap();
    }
  }, [places]);

  return (
    <div className="App">
      <div className="main_card">
        <div className="title">Austin Recommendations Map</div>
        <div className="tool_card">
          <div className="left-col">
            <FormControlLabel
              className="check_container"
              control={<Checkbox sx={{ p: 0.5 }} />}
              label="Kid-Friendly"
            />
            <FormControlLabel
              className="check_container"
              control={<Checkbox sx={{ p: 0.5 }} />}
              label="Dogs Allowed"
            />
            <FormControlLabel
              className="check_container"
              control={<Checkbox sx={{ p: 0.5 }} />}
              label="Free"
            />
          </div>
          <div className="right-col">
            <div className="right_container">Location Type</div>
            <FormControl fullWidth>
              <Select
                id="type_select"
                value={type}
                onChange={handleChange}
              >
                <MenuItem value="Sightseeing/Attractions">Sightseeing/Attractions</MenuItem>
                <MenuItem value="Restaurants/Cafes">Restaurants/Cafes</MenuItem>
                <MenuItem value="Grocery/Specialty">Grocery/Specialty</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Entertainment/Nightlife">Entertainment/Nightlife</MenuItem>
                <MenuItem value="Beauty/Wellness">Beauty/Wellness</MenuItem>
                <MenuItem value="Sports/Recreation">Sports/Recreation</MenuItem>
                <MenuItem value="Work/Study Spaces">Work/Study Spaces</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="map_container">
          <div id="map" style={{ width: '100%', height: '500px' }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;