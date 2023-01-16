import { React, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, CssBaseline, TextField, Link, Grid, Box, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
const theme = createTheme();

function RegisterComponent() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confpassword, setConfPassword] = useState("");
    const navigate = useNavigate();
    
    const prosesRegis = async (e) => {
        e.preventDefault();
        console.log("tombol register ditekan");
        try {
            const url_api = "https://muddy-flip-flops-bat.cyclic.app/users/register";
            const response = await axios.post(url_api, {
                name : name,
                email : email,
                password : password,
                confPassword : confpassword
            });

            if(response){
                console.log("berhasil register");
                navigate("/");
            }else{
                console.log("gagal register");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>
                    <Box component="form" method='post' onSubmit={prosesRegis} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="name"
                            label="Name"
                            name="name"
                            autoFocus
                            onChange={(e) => setName(e.target.value) }
                        />
                        
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onChange={(e) => setEmail(e.target.value) }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => setPassword(e.target.value) }
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="confPassword"
                            label="Confirmated Password"
                            type="password"
                            id="confPassword"
                            autoComplete="current-password"
                            onChange={(e) => setConfPassword(e.target.value) }
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link component={RouterLink} to="/" variant="body2">
                                    {"Don't have an account? Sign In"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default RegisterComponent