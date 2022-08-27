import { useEffect } from "react";

// redux
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/utils/utilsSlice";

import SafeArea from "../../components/wrappers/SafeArea";

import urls from "../../urls.json";
import { Typography } from "@mui/material";

export default function Terms() {
  // redux
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setActiveTab(urls.terms.name));
  }, [dispatch]);

  return (
    <SafeArea>
      <Typography align="center">Terms</Typography>
    </SafeArea>
  );
}
