import React from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useDispatch } from 'react-redux';
import { filterByRange } from '../Redux/Crud/filterslice';

function valuetext(value) {
  return `${value}$`;
}

export default function RangeSlider() {
    const [value, setValue] = React.useState([200, 656]);
   const dispatch= useDispatch()

    const handleChange = (event, newValue) => {
      setValue(newValue);
      dispatch(filterByRange(value))
    };
  return (
    <Box sx={{ width: 300 }}>
    <Slider
      getAriaLabel={() => 'Price range'}
      value={value}
      onChange={handleChange}
      valueLabelDisplay="auto"
      getAriaValueText={valuetext}
      min={10}
      max={1000}
    />
  </Box>
  )
}
