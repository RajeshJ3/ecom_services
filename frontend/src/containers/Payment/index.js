import { useEffect, useState } from "react";

// redux
import { useDispatch } from "react-redux";
import { setActiveTab } from "../../redux/utils/utilsSlice";

import SafeArea from "../../components/wrappers/SafeArea";

import urls from "../../urls.json";
import Loading from "../../components/wrappers/Loading";
import { useNavigate, useParams } from "react-router-dom";
import Success from "../../components/wrappers/Success";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import { BASE_URL } from "../../utils/config";

export default function Payment() {
  const [paid, setPaid] = useState(false);

  // redux
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // react-router-dom
  const { id } = useParams();

  useEffect(() => {
    axios({
      method: "POST",
      url: `${BASE_URL}/orders/${id}`,
      params: {
        token: getToken(),
        status: "completed",
      },
    }).then((res) => {
      setPaid(true);
    });
  }, [id]);

  useEffect(() => {
    dispatch(setActiveTab(urls.payment.name));
  }, [dispatch]);

  return (
    <SafeArea>
      {paid ? (
        <Success
          text="Order Completed"
          handleContinue={() => navigate(urls.orders.path)}
        />
      ) : (
        <Loading text="Processing Payment..." />
      )}
    </SafeArea>
  );
}
