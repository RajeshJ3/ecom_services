import { ShoppingCart } from "@mui/icons-material";
import {
  Button,
  Container,
  Grid,
  Hidden,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import urls from "../../urls.json";

export default function Header() {
  const navigate = useNavigate();

  return (
    <Container
      maxWidth="lg"
      style={{
        padding: "30px 0px",
      }}
    >
      <Grid container flex={1} justifyContent="space-between">
        <Grid item md={6}>
          <Stack
            direction="row"
            spacing={1}
            justifyContent="flex-start"
            alignItems="center"
            component={Link}
            to={urls.home.path}
          >
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Storage-PNG-Images.png"
              alt="logo"
              style={{
                maxHeight: "30px",
              }}
            />
            <Typography variant="h6" style={{ marginBottom: "-12px" }}>
              <Hidden smDown>Infinite Blob</Hidden>
            </Typography>
          </Stack>
        </Grid>
        <Grid item md={6}>
          <Grid container direction="row-reverse">
            <Button
              variant="outlined"
              color="inherit"
              size="small"
              style={{
                marginTop: "2px",
                marginLeft: "15px",
              }}
              onClick={() => navigate(urls.cart.path)}
              startIcon={<ShoppingCart />}
            >
              Cart
            </Button>
            <Button
              disableElevation
              color="inherit"
              variant="contained"
              component={Link}
              to={urls.orders.path}
            >
              Orders
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
