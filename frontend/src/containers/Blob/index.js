import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/utils/utilsSlice";

import SafeArea from "../../components/wrappers/SafeArea";

import urls from "../../urls.json";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/wrappers/Loading";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import { BASE_URL } from "../../utils/config";

export default function Blob(props) {
  const [loadingData, setLoadingData] = useState(true);
  const [loadingSimilarProducts, setLoadingSimilarProducts] = useState(true);
  const [loadingAd, setLoadingAd] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  const [data, setData] = useState({});
  const [similarProducts, setsimilarProducts] = useState({});
  const [ad, setAd] = useState({});

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // react-router-dom
  const { id } = useParams();

  // fetch product
  useEffect(() => {
    setLoadingData(true);
    axios({
      method: "GET",
      url: `${BASE_URL}/products/${id}`,
    }).then((res) => {
      setData(res.data);
      setLoadingData(false);
    });
  }, [id]);

  // fetch similar products
  useEffect(() => {
    setLoadingSimilarProducts(true);
    axios({
      method: "GET",
      url: `${BASE_URL}/similar-products`,
      params: {
        pk: id,
      },
    }).then((res) => {
      let tempSimilarProducts = res.data.filter((item) => item.pk !== id);
      if (tempSimilarProducts.length > 3) {
        tempSimilarProducts = tempSimilarProducts.slice(0, 3);
      }
      setsimilarProducts(tempSimilarProducts);
      setLoadingSimilarProducts(false);
    });
  }, [id]);

  // fetch ad
  useEffect(() => {
    setLoadingAd(true);
    axios({
      method: "GET",
      url: `${BASE_URL}/ad`,
      params: {
        pk: id,
      },
    }).then((res) => {
      setAd(res.data);
      setLoadingAd(false);
    });
  }, [id]);

  useEffect(() => {
    dispatch(setActiveTab(urls.blob.name));
  }, [dispatch]);

  const AddToCart = () => {
    setAddingToCart(true);
    axios({
      method: "POST",
      url: `${BASE_URL}/add-to-cart`,
      params: {
        token: getToken(),
        pk: id,
      },
    }).then((res) => {
      setAddingToCart(true);
      navigate(urls.cart.path);
    });
  };

  const Ad = () => (
    <Grid
      container
      onClick={() => navigate(`/blob/${ad.pk}`)}
      style={{
        position: "relative",
        backgroundColor: "pink",
        padding: "50px 40px",
        cursor: "pointer",
        marginBottom: "50px",
      }}
    >
      <Typography align="center" style={{ width: "100%" }}>
        Get <b>{ad.name}</b> for just <b>${ad.price}</b> now. Limited Time
        Offer, hurry up..
      </Typography>
      <Typography
        style={{
          position: "absolute",
          top: "10px",
          left: "15px",
          fontSize: "12px",
        }}
      >
        Ad
      </Typography>
    </Grid>
  );

  const SimilarProducts = () =>
    loadingSimilarProducts ? null : (
      <Stack>
        <Typography
          align="center"
          variant="h6"
          style={{ marginBottom: "20px" }}
        >
          Similar Products
        </Typography>
        <Grid container justifyContent="center" alignItems="center" spacing={4}>
          {similarProducts.map((item, index) => (
            <Grid item key={index}>
              <Paper
                elevation={0}
                onClick={() => navigate(`/blob/${item.pk}`)}
                style={{ cursor: "pointer" }}
              >
                <img
                  src={item.thumbnail_url}
                  alt="alternative text"
                  style={{
                    maxHeight: "150px",
                  }}
                />
                <Typography variant="body2" fontWeight={700}>
                  {item.name}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Stack>
    );

  return loadingData ? (
    <Loading />
  ) : (
    <SafeArea>
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            <img
              src={data.image_url}
              alt={data.name}
              style={{ maxWidth: "100%" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Stack direction="column" spacing={2}>
              <div>
                <Typography variant="h4" fontWeight={700}>
                  {data.name}
                </Typography>
                <div
                  style={{
                    borderBottom: "2px solid #000",
                    width: "75px",
                  }}
                ></div>
              </div>
              <Typography variant="body1" fontWeight={700}>
                ${data.price}
              </Typography>
              <Typography variant="body1">
                {data.downloads} Downloads
              </Typography>
              <Typography
                variant="body2"
                style={{
                  lineHeight: "1.75em",
                  fontStyle: "italic",
                }}
              >
                {data.description}
              </Typography>
              <Button
                disabled={addingToCart}
                variant="outlined"
                color="inherit"
                size="small"
                style={{
                  marginTop: "50px",
                  borderWidth: "2px",
                }}
                onClick={AddToCart}
              >
                {addingToCart ? "Adding" : "Add"} to Cart
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </div>
      <br />
      {!loadingAd && <Ad />}
      <SimilarProducts />
    </SafeArea>
  );
}
