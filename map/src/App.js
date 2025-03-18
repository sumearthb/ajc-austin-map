import logo from './logo.svg';
import './App.css';
import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';



function App() {

  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div className="App">
      <div class="main_card">
        <div class="title">Austin Recommendations Map</div>
        <div class="tool_card">
          <div class="left-col">
            <FormControlLabel class="check_container" control={<Checkbox sx={{ p: .5 }}/>} label="Kid-Friendly" />
            <FormControlLabel class="check_container" control={<Checkbox sx={{ p: .5 }}/>} label="Open Now" />
            <FormControlLabel class="check_container" control={<Checkbox sx={{ p: .5 }}/>} label="Free" />
          </div>
          <div class="right-col">
          <div class = "right_container">Location Type</div>
          <FormControl fullWidth>
           {/* <InputLabel id="type_label">Location Type</InputLabel> */}
            <Select
            // labelId="type_label"
            id="type_select"
            value = {type}
            // label="Location Type"
            onChange={handleChange}
            >
            <MenuItem value="Restraunts">Restaraunts</MenuItem>
            <MenuItem value="Grocery Stores">Grocery Stores</MenuItem>
            <MenuItem value="Parks">Parks</MenuItem>
            </Select>
            </FormControl>
          </div>
        </div>
        <div class="map_container">
            <img class="map" src='https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/05/google-maps-icon-on-map.jpg' alt='Map'></img>
        </div>
      </div>
    </div>
  );
}

export default App;
