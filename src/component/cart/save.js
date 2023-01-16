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
      //console.log(rows);
      let user_id = localStorage.getItem("user_id");
      const url_api = "http://localhost:3000/cart/save/" + user_id;
      const response = axios.post(url_api,rows);  
      console.log(response);
    }
    
    window.alert('Cart Success to Checkout / Save Database')
    localStorage.removeItem("cart");
    navigate("/product");
  } 
    

  //getDataProduct();
  
}
