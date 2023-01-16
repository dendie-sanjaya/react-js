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
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { headerAxios } from "../../utils/headersAxios";
// import { dataProducts } from "../../utils/static";

export default function HomeComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState([]);

  useEffect(() => {
    getDataProduct()
  },[])

  const gotoDetail = id => {
    navigate("/product/" + id);
  };

  const getDataProduct = async() =>{
    const url_api = "http://localhost:3000";

  
    const response = await axios.get(url_api + "/products", { headers:headerAxios });

    if(response)
    {
      // console.log("response", response);
      setDataProducts(response.data.data);
    }
  }

  return (
    <Container sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        {dataProducts.map((data, i) => (
          <Grid key={i} item xs={3}>
            <Card>
              <CardHeader title={data.name} />
              <CardMedia
                component="img"
                height="200"
                image={data.image}
                alt={data.name}
              />
              <CardContent>
                <Typography variant="subtitle2">{data.name}</Typography>
              </CardContent>
              <CardActions>
                {data.active ?                 
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => gotoDetail(data.id)}
                  >Detail</Button>
                :
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"  
                  >Detail</Button>
                }

              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
