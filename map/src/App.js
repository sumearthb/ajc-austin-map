import './App.css';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect, useState } from 'react';

function App() {
  const [type, setType] = useState('Show All  全て表示');
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [filters, setFilters] = useState({
    "Kid-Friendly  子供に優しい": false,
    "Dogs Allowed  犬可": false,
    "Free Admission  無料入場": false,
    "Japanese  日本人": false,
  });

  useEffect(() => {
    fetch('/ajc-austin-map/places.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setPlaces(data.places);
        setFilteredPlaces(data.places);
      })
      .catch(error => console.error('Error loading places:', error));
  }, []);

  useEffect(() => {
    let filtered = places.filter(place => 
      (type === 'Show All  全て表示' || place.type === type) &&
      Object.keys(filters).every(tag => !filters[tag] || place.tags.includes(tag))
    );
    setFilteredPlaces(filtered);
  }, [type, filters, places]);

  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters(prev => ({ ...prev, [event.target.name]: event.target.checked }));
  };

  useEffect(() => {
    if (window.google && window.google.maps) {
      const austin = { lat: 30.2672, lng: -97.7431 };
      const map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: austin,
      });

      filteredPlaces.forEach((place) => {
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
    }
  }, [filteredPlaces]);

  return (
    <div className="App">
      <div className="main-card">
        <div className='title-container'>
          <div className="title">オースティンのおすすめ地図 <br /> Austin Recommendations Map</div>
        </div>
        <div className="tool-card">

          <div className="right-col">
            <div className='drop-down-container'>
            <FormControl className="drop-down">
              <InputLabel id="demo-simple-select-label">Show Category</InputLabel>
              <Select
                id="type-select"
                value={type}
                labelId="demo-simple-select-label"
                label="Show Category"
                onChange={handleChange}
              >
                <MenuItem value="Show All  全て表示">Show All  全て表示</MenuItem>
                <MenuItem value="Sightseeing/Attractions  観光・名所">Sightseeing/Attractions  観光・名所</MenuItem>
                <MenuItem value="Restaurants/Cafes  レストラン＆カフェ">Restaurants/Cafes  レストラン＆カフェ</MenuItem>
                <MenuItem value="Grocery/Specialty  食料品店・専門店">Grocery/Specialty  食料品店・専門店</MenuItem>
                <MenuItem value="Shopping  買い物">Shopping  買い物</MenuItem>
                <MenuItem value="Entertainment/Nightlife  エンターテイメントとナイトライフ">Entertainment/Nightlife  エンターテイメントとナイトライフ</MenuItem>
                <MenuItem value="Beauty/Wellness  美容＆セルフケア">Beauty/Wellness  美容＆セルフケア</MenuItem>
                <MenuItem value="Sports/Recreation  スポーツ＆レクリエーション">Sports/Recreation  スポーツ＆レクリエーション</MenuItem>
                <MenuItem value="Work/Study Spaces  勉強スペースと作業スペース">Work/Study Spaces  勉強スペースと作業スペース</MenuItem>
              </Select>
            </FormControl>
            </div>
          </div>
          <div className="left-col">
            {Object.keys(filters).map((tag) => (
              <FormControlLabel
                key={tag}
                className="check-container"
                control={<Checkbox checked={filters[tag]} onChange={handleFilterChange} name={tag} />}
                label={tag}
              />
            ))}
          </div>
        </div>
        <div className="map-container">
          <div id="map" style={{ width: '100%', height: '500px' }}></div>
        </div>
      </div>
    </div>
  );
}

export default App;