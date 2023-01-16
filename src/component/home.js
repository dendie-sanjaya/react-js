import { React, useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';

function HomeComponent() {

    const[state, setstate] = useState(
        {
            nama : "",
            angka : 0
        }
    )

    const hendleCahange = (fieldName, value) => {
        let newState ={...state}
        newState[fieldName] = value
        setstate(newState)
    }

    return (
        <div className="App">
          <header className="App-header">
          <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                onChange={(e) => hendleCahange("nama",e.target.value) }
            />
            
            <TextField
                margin="normal"
                required
                fullWidth
                id="angka"
                label="Angka"
                name="angka"
                autoComplete="angka"
                onChange={(e) => hendleCahange("angka",e.target.value) }
            />
         { state.nama }
         { state.angka }
          </header>
        </div>
      );
}

export default HomeComponent