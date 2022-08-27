import { useEffect, useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/utils/utilsSlice";

import SafeArea from "../../components/wrappers/SafeArea";

import urls from "../../urls.json";
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import Loading from "../../components/wrappers/Loading";

import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActiveTab(urls.home.name));
  }, [dispatch]);

  useEffect(() => {
    axios({
      method: "GET",
      url: "http://localhost:8080/products",
    }).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, []);

  const Product = (props) => (
    <Card
      style={{
        cursor: "pointer",
      }}
      onClick={() => navigate(`/blob/${props.pk}`)}
    >
      <CardMedia
        component="img"
        height="160"
        image={props.thumbnail_url}
        alt="Paella dish"
      />
      <CardContent
        style={{
          padding: "5px 8px",
        }}
      >
        <Stack direction="column" spacing={0.3}>
          <Typography variant="body1" fontWeight={700}>
            {props.name}
          </Typography>
          <Stack direction="column" spacing={0}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">Price</Typography>
              <Typography variant="caption" color="text.secondary">
                Downloads
              </Typography>
            </Stack>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2">${props.price}</Typography>
              <Typography variant="caption" color="text.secondary">
                {props.downloads}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );

  return (
    <SafeArea>
      <Grid container>
        <Grid
          item
          xs={12}
          md={4}
          style={{
            position: "static",
            minHeight: "85vh",
            height: "100%",
            backgroundImage:
              "url('https://images.pexels.com/photos/1078981/pexels-photo-1078981.jpeg?auto=compress&cs=tinysrgb&w=1600')",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        ></Grid>
        <Grid
          item
          xs={12}
          md={8}
          style={{
            height: "85vh",
            padding: "0px 20px",
            overflowY: "scroll",
          }}
        >
          <Grid container spacing={3}>
            {loading ? (
              <Loading />
            ) : (
              data.map((item, index) => (
                <Grid item xs={6} sm={4} lg={3} key={index}>
                  <Product {...item} />
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Grid>
    </SafeArea>
  );
}
