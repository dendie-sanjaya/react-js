import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  Grid,
  Typography,
  Link
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { headerAxios } from "../../utils/headersAxios";
import { Link as RouterLink} from "react-router-dom";
import { currencyFormat } from "../../utils/functions";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// import { dataProducts } from "../../utils/static";

export default function CartComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);
  let [rows, setRows] = useState([]);
  
  useEffect(() => {
    getDataProduct()
  },[])


  const getDataProduct = async() =>{
    let cart_exsiting = localStorage.getItem("cart");
    if(cart_exsiting != null && cart_exsiting.length > 0 ) {
      rows = JSON.parse(cart_exsiting);
      setRows(rows)
      ///console.log(rows);
    }
    
    

 
    
  }

  
  return (

    <Container sx={{ mt: 2 }}>
      <Grid container>
      <Grid item xs>
          <Link component={RouterLink} to={"/user/edit/"} variant="body2">
              My Profile 
          </Link>
      </Grid>
      <Grid item xs>
          <Link component={RouterLink} to="/product" variant="body2">
              List Product
          </Link>
      </Grid>

      <Grid item xs>
        <Link component={RouterLink} to="/cart" variant="body2">
            My Cart
        </Link>
      </Grid>

      <Grid item>
          <Link component={RouterLink} to="/login" variant="body2">
              Logout
          </Link>
      </Grid>
      
      <Grid container spacing={2}  sx={{ mt:3 }}>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>&nbsp;</TableCell>
              <TableCell>Product</TableCell>
              <TableCell align="center">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell align="left" width="60px" margi="10">
                  <CardMedia
                  component="img"
                  height="60"
        
                  image={row.image}
                  alt={row.id}
                />

                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">{currencyFormat(row.price)}</TableCell>
                  <TableCell align="center">{row.qty}</TableCell>
                  <TableCell align="center">{currencyFormat(row.qty * row.price)}</TableCell>
              </TableRow>
            ))}  
          </TableBody>
        </Table>
        </TableContainer>
      </Grid>

      <Button type="button" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} component={RouterLink} to={"/cart/save"}  >
        Checkout    
      </Button>     
    </Grid>        
    </Container>
  
  );
}
