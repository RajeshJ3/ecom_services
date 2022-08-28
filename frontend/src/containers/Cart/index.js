import { useEffect, useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/utils/utilsSlice";

import SafeArea from "../../components/wrappers/SafeArea";

import urls from "../../urls.json";
import {
  Button,
  Divider,
  Stack,
  Box,
  TextField,
  Typography,
  Hidden,
} from "@mui/material";
import { CartTable } from "../../components/custom/cartTable";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

function createData(id, img, title, price) {
  return { id, img, title, price };
}

export default function Cart() {
  const [data, setData] = useState({});
  const [total, setTotal] = useState(0);
  const [rows, setRows] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  // Contact Info
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("john@example.com");

  const [submitting, setSubmitting] = useState(false);

  // redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setActiveTab(urls.cart.name));
  }, [dispatch]);

  // fetch product
  useEffect(() => {
    setLoadingData(true);
    axios({
      method: "GET",
      url: `${BASE_URL}/current-order`,
      params: {
        token: getToken(),
      },
    })
      .then((res) => {
        setData(res.data);
        if (!res.data.order_items) {
          setLoadingData(false);
          return;
        }

        // calculate total
        let tempTotal = 0;
        res.data.order_items.map((i) => {
          tempTotal += i.price;
          return tempTotal;
        });

        setTotal(tempTotal);
        setRows(
          res.data.order_items.map((item, index) =>
            createData(item.pk, item.thumbnail_url, item.name, item.price)
          )
        );
        setLoadingData(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const placeOrder = () => {
    setSubmitting(true);
    axios({
      method: "PATCH",
      url: `${BASE_URL}/orders/${data.pk}`,
      params: {
        token: getToken(),
      },
      data: {
        customer: {
          first_name: firstName,
          last_name: lastName,
          email,
        },
      },
    }).then(() => {
      navigate(`/payment/${data.pk}`);
    });
  };

  return (
    <SafeArea>
      <Stack direction="column" spacing={3} alignItems="flex-end">
        <Typography
          variant="h5"
          style={{
            marginBottom: "10px",
            width: "100%",
          }}
        >
          Cart
        </Typography>
        <CartTable data={data} rows={rows} loadingData={loadingData} />
        <Divider style={{ width: "100%" }} />
        <Typography align="right" variant="body1">
          TOTAL: <b>${total}</b>
        </Typography>

        <Box style={{ width: "100%" }}>
          <Stack direction="row" spacing={3}>
            <Hidden mdDown>
              <Stack
                direction="column"
                spacing={2}
                style={{ width: "100%" }}
              ></Stack>
            </Hidden>
            <Stack direction="column" spacing={2} style={{ width: "100%" }}>
              <Typography variant="subtitle1">Contact Info</Typography>
              <TextField
                fullWidth
                required
                label="First Name"
                variant="filled"
                color="info"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                fullWidth
                required
                label="Last Name"
                variant="filled"
                color="info"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                fullWidth
                required
                label="Email"
                variant="filled"
                color="info"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Stack>
          </Stack>
        </Box>

        <Button
          disabled={submitting}
          variant="outlined"
          color="inherit"
          onClick={placeOrder}
        >
          Place Order
        </Button>
      </Stack>
    </SafeArea>
  );
}
