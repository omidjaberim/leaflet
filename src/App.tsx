import './App.css';
import { TextField,Grid, Select, MenuItem, Button, InputLabel } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Dropzone from './components/DropZone';
import { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet'
import DraggableMarker from "./components/DraggableMarker"
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const center = {
  lat: 51.505,
  lng: -0.09,
}

const useStyles  = makeStyles({
  root:{
    minHeight:'100vh'
  },
  main :{
    width : 350,
    padding:35,
    border :"1px solid silver",
    boxShadow : '1px 1px #888888',
    borderRadius :5,
    background:"#E7E9EB",
    "& .leaflet-container":{
      height: 300,
      width: '100%'    
    }
  },
  input:{
    "& input":{
      background : 'white'
    },
    background : 'white !important',
    marginTop:15
  }
})
function App() {
  const classes = useStyles();
  const [logo,setLogo] = useState('')
  
  let DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;
  return (
    <Grid container justifyContent={"center"} alignItems={"center"} className={classes.root}  >
      <Grid item className={classes.main} >
        <InputLabel>Location Name :</InputLabel>
        <TextField
          className={classes.input}
          fullWidth        
          color="primary"
        />        
        <InputLabel>Location on map :</InputLabel>
        <Grid className="leaflet-container" >
        <MapContainer center={center} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <DraggableMarker />
        </MapContainer>
        </Grid>
        <InputLabel>location type :</InputLabel>
        <Select color="primary"   fullWidth  className={classes.input} >
          <MenuItem value={'Business'}>Business</MenuItem>
          <MenuItem value={'Home'}>Home</MenuItem>
          <MenuItem value={'School'}>School</MenuItem>
        </Select>
          <InputLabel>Click or Drag to upload a logo :</InputLabel>
          <Dropzone hasText={false}  setPicture={(img:any)=>setLogo(img)} initialImg={logo} />
          <Grid container justifyContent={"space-between"} >
            <Button color="primary" >Cancel</Button>
            <Button variant='contained' color='info' >Save</Button>
          </Grid>

      </Grid>
    </Grid>
   );
}

export default App;
