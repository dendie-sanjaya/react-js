import { React, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from './logo.svg';
import './App.css';

function App(){
    const[state, setstate] = useState(
        {
            nama : "",
            angka : 0,
            desc : ""
        }
    )

    const hendleCahange = (fieldName, value) => {
        let newState ={...state}
        newState[fieldName] = value
        setstate(newState)
    }

    return (
        <>
        <header image={logo} name="tes"></>
            <input>
                type="text"
                name="nama"
                onChange={(e) => hendleCahange("nama", e.target.value)}
            </>
            <input>
                type="text"
                name="angka"
                onChange={(e) => hendleCahange("angka", e.target.value)}
            </>
            <input>
                type="text"
                name="desc"
                onChange={(e) => hendleCahange("desc", e.target.value)}
            </>
        </>
    )
}