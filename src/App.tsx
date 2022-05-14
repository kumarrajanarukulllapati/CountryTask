import React, { Fragment } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";
import { Button, TextField,Modal,Typography, Box } from "@mui/material"

const access_key="c688d599ed958b619908200b86470c44";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<CountryComponent />} />
        <Route path='/details' element={<DetailsComponent />} />
        {/* <Route/> */}

      </Routes>
    </BrowserRouter>
  );
}

export default App;

const CountryComponent = () => {
  const [newValue, setNewValue] = React.useState('');
  const navigate = useNavigate();

  // const hemanth=useNavigate();
  // navigate('/DetailsComponent');



  const samanthaSubmit = () => {
    fetch(`https://restcountries.com/v2/name/${newValue}`)
      .then((data) => data.json())
      .then((res) => {
        localStorage.setItem("idValue", JSON.stringify(res));
        console.log('res', res);
        return navigate('/details')
        // return window.open('/details')

      })
  }

  // const samanthaSubmit =(e:any) =>{
  //   e.preventDefalut();
  //   // fetch()
  // }
  return (
    <Fragment>
      <div className='App' >
        <div style={{ width: '50%', margin: '50px' }}>
          <form >
            <TextField variant='filled' placeholder='Enter your Country' value={newValue}
              onChange={(e) => setNewValue(e.target.value)} />


            <Button onClick={samanthaSubmit} variant='contained'>Submit</Button>

          </form>
        </div>
      </div>
    </Fragment>
  );

}
const style ={
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const DetailsComponent = () => {


  const [values, setValues] = React.useState<any>()
  const [Weather, setWeather] = React.useState<any>({})
const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  React.useEffect(() => {
    const data = localStorage.getItem('idValue');
    if (data) {
      setValues(JSON.parse(data));
      console.log(JSON.parse(data))
    }

  }, [])
  
  const WeatherHandle =(self:any)=>{
    // e.preventDefault();
    
        fetch(`http://api.weatherstack.com/current?access_key=${access_key}&query=${self}`)
        .then((self)=>self.json())
        .then((res) => {
          console.log(res?.current,'res')
          setWeather(res?.current)
        // setOpen(true)}/
        .catch((err)=>console.log(err))
  }

        
    // fetch(`https://api.weatherstack.com/current? 
    // &query = ${c.capital}`)

  return (
   
    <div>
      
      <table style={{border:'1px solid green',padding:'10px'}}>
        <tr>
          <th>Capital</th>
          <th>population</th>
          <th>latlng</th>
          <th>4</th>
        </tr>
      {values?.map((c:any,i:any)=>{
        
        return <tr key={i}>
        <td>{c?.capital}</td>
        <td>{c?.population}</td>
        <td>{c?.latlng.join() }</td>
        <td>{<img src= {c?.flag} alt='flag' style={{height:'50px',width:'80px'}}/>}</td>
        <td><Button variant='contained' onClick={()=>WeatherHandle(c?.capital)}>country weather</Button></td>
      </tr> 
      
      })}
      </table>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      This is temperature:{Weather?.temperature}
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    This is temperature:{Weather?.Precip}    </Typography>
  </Box>
</Modal>
    </div>
    
  );
}