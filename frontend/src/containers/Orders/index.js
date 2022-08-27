import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/utils/utilsSlice";

import SafeArea from "../../components/wrappers/SafeArea";

import urls from "../../urls.json";
import { Typography } from "@mui/material";
import OrderList from "./orderList";

export default function Orders() {
  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab(urls.orders.name));
  }, [dispatch]);

  return (
    <SafeArea>
      <Typography align="center" variant="h5">Orders</Typography>
      <br />
      <OrderList />
    </SafeArea>
  );
}
