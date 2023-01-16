import { React, useState } from 'react';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Box, Typography, Container } from '@mui/material';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import axios from "axios";
const theme = createTheme();

function LoginComponent() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    localStorage.clear("cart");
    const prosesLogin = async (e) => {
        e.preventDefault();
        console.log("tombol login ditekan");
        try {
            // const url_api = "https://muddy-flip-flops-bat.cyclic.app/users/login";
            const url_api = "http://localhost:3000/users/login"
            const response = await axios.post(url_api, {
                email : email,
                password : password
            });

            if(response){
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user_id", response.data.data.id)
                localStorage.setItem("user_name", response.data.data.name)
                localStorage.setItem("user_email", response.data.data.email)

                //console.log("berhasil login");
                navigate("/user/"+response.data.data.id);
            }else{
                window.alert('login failed, please try again')
                //console.log("gagal login");
            }
        } catch (error) {
            //console.log(error);
            window.alert('login failed, please try again')

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
                        Sign in
                    </Typography>
                    <Box component="form"  method='post' onSubmit={prosesLogin} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>

                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default LoginComponent