import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/utils/utilsSlice";

import SafeArea from "../../components/wrappers/SafeArea";

import urls from "../../urls.json";
import { Typography } from "@mui/material";

export default function Contact() {
  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab(urls.contact.name));
  }, [dispatch]);

  return (
    <SafeArea>
      <Typography align="center">Contact</Typography>
    </SafeArea>
  );
}
