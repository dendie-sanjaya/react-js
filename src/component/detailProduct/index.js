import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Stack,
  Typography,
  Link
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import { dataProducts } from "../../utils/static";
import { headerAxios } from "../../utils/headersAxios";
import { currencyFormat } from "../../utils/functions";
import { Link as RouterLink, useNavigate} from "react-router-dom";

export default function DetailProductComponent() {
  const params = useParams();
  const [qty, setQty] = useState(1);
  const [dataProducts, setDataProducts] = useState([]);
  const [loading, setLoading] = useState(null);
  const [dataDetail, setDataDetail] = useState(null);
  const navigate = useNavigate();
  var mychart = [];

  // useEffect(() => {
  //   updateState();
  // }, []);

  useEffect(() => {
    getDataProduct();
  },[qty])

  const updateState = () => {
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      let newCart = cart.filter((val) => val.id == dataDetail.id);
      if (newCart.length > 0) {
        setQty(newCart.qty);
      }
    }
  };


  const qtyChange = (type) => {
    let newQty = qty;
    if (type === "min") {
      newQty--;
    } else {
      newQty++;
    }

    if (newQty < 1) {
      newQty = 1;
    }else if( newQty > dataDetail.qty){
      newQty = dataDetail.qtyl
    }

    setQty(newQty);
  };

  /*
  const updateCart = () => {
    let cart = localStorage.getItem("cart");
    let cart_new = [];
    if(!cart || cart.length < 1) {
      cart_new.push(JSON.stringify(dataDetail));
    } else {
      cart_new = localStorage.getItem("cart");
      let newCart = cart_new.filter((val) => val.id == dataDetail.id);
      console.log(newCart);
    }

    alert("Berhasil ditambahkan ke Cart");
    //navigate("/product");
  };
*/  


const updateCart = () => {
  mychart = [];
  let mycart_new = [];

  let cart_exsiting = localStorage.getItem("cart");
  if(cart_exsiting == null || cart_exsiting.length < 1 ) {
    dataDetail.qty = qty;
    mychart.push(dataDetail);    
    localStorage.setItem("cart",JSON.stringify(mychart));
    //console.log(cart_exsiting);
  } else {
    let cart_exsiting_parsing = JSON.parse(cart_exsiting);
    //mycart_new.push(cart_exsiting_parsing);
    //console.log(mycart_new)
    for (let j = 0; j < cart_exsiting_parsing.length; j++){     
      if(dataDetail.id == cart_exsiting_parsing[j].id) {
        console.log('data sudah ada update qty ' + cart_exsiting_parsing[j].name);
        cart_exsiting_parsing[j].qty = (cart_exsiting_parsing[j].qty + qty);  
        mycart_new.push(cart_exsiting_parsing[j]);   
      } else {
        let cek_exist = false;
        for(let k = 0; k < mycart_new.length  ; k++ )  {
          if(mycart_new[k].id == dataDetail.id) {
            cek_exist = true;
          }
        }

        let cek_exist_2 = false;
        for (let l = 0; l < cart_exsiting_parsing.length; l++){ 
          if(cart_exsiting_parsing[l].id == dataDetail.id) {
            cek_exist_2 = true;
          }
        }   

        if(cek_exist == false && cek_exist_2 == false) {
          console.log('data baru ' + dataDetail.name)
          dataDetail.qty = qty;         
          mycart_new.push(dataDetail); 
          mycart_new.push(cart_exsiting_parsing[j]);
        }  else {
          mycart_new.push(cart_exsiting_parsing[j]);
        }
        
      }
    }  

    localStorage.setItem("cart",JSON.stringify(mycart_new));
    console.log(mycart_new);

  }

 
  alert("Berhasil ditambahkan ke Cart");
  navigate("/product");
};
  const getDataProduct = async() =>{
    const url_api = "http://localhost:3000";

    const response = await axios.get(url_api + "/products/" + params.id, { headers:headerAxios });
    if(response)
    {
      // console.log("response", response);
      setDataDetail(response.data.data);
    }
  }
// console.log(dataDetail);
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
      </Grid>
      
      { dataDetail &&
        <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={3}>
          <img
            src={dataDetail.image}
            srcSet={dataDetail.image}
            alt={dataDetail.name}
            loading="lazy"
            style={{ width: "100%" }}
          />
        </Grid>
        <Grid item xs={9}>
          <Card>
            <CardHeader title={dataDetail.name} />
            <CardContent>
              {/* <Typography variant="subtitle2">Rp. 150.000</Typography> */}
              <Typography variant="h5" fontWeight="bold" sx={{ mt: 2 }}>
                {currencyFormat(dataDetail.price)}
              </Typography>
              <Stack direction={"row"} alignItems="center" sx={{ mt: 3 }}>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("min")}
                >
                  <RemoveIcon fontSize="small" />
                </Button>
                <Typography
                  sx={{
                    borderBottom: 5,
                    width: 50,
                    mx: 1,
                    textAlign: "center",
                    fontSize: 20,
                  }}
                  variant="subtitle2"
                >
                  {qty}
                </Typography>
                <Button
                  size="small"
                  variant="contained"
                  color="success"
                  onClick={() => qtyChange("plus")}
                >
                  <AddIcon fontSize="small" />
                </Button>
              </Stack>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button variant="contained" color="error" onClick={updateCart}>
                + Cart
              </Button>
            </CardActions>
          </Card>
        </Grid>
        </Grid>
      }  
    </Container>
  );
}
