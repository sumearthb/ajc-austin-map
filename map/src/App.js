import logo from './logo.svg';
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
        <div className='title_container'>
        <div className="title">オースティンのおすすめ地図 <br /> Austin Recommendations Map</div>
        </div>
        <div className="tool_card">
          
          <div className="right-col">
            <div className='drop_down_container'>
            <FormControl className="drop_down">
              <InputLabel id="demo-simple-select-label">Show Category</InputLabel>
              <Select
                id="type_select"
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
            <FormControlLabel
              className="check_container"
              control={<Checkbox sx={{ p: 0.5 }} />}
              label="Kid-Friendly  子供に優しい"
            />
            <FormControlLabel
              className="check_container"
              control={<Checkbox sx={{ p: 0.5 }} />}
              label="Dogs Allowed  犬可"
            />
            <FormControlLabel
              className="check_container"
              control={<Checkbox sx={{ p: 0.5 }} />}
              label="Free Admission  無料入場"
            />
            <FormControlLabel
              className="check_container"
              control={<Checkbox sx={{ p: 0.5 }} />}
              label="Japanese  日本人"
            />
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