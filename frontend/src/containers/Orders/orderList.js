import { useEffect, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import { getToken } from "../../utils/helpers";
import Loading from "../../components/wrappers/Loading";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/config";

export default function OrderList() {
  const [loadingData, setLoadingData] = useState(true);
  const [loadingInvoice, setLoadingInvoice] = useState(null);
  const [invoiceAvailable, setInvoiceAvailable] = useState(true);
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const navigate = useNavigate();

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // fetch product
  useEffect(() => {
    setLoadingData(true);
    axios({
      method: "GET",
      url: `${BASE_URL}/orders`,
      params: {
        token: getToken(),
      },
    })
      .then((res) => {
        let tempData = res.data;
        tempData.reverse();
        setData(tempData.filter((i) => i.status === "completed"));
        setLoadingData(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const fetchInvoice = (pk) => {
    setInvoiceAvailable(true);
    setLoadingInvoice(pk);
    axios({
      method: "GET",
      url: `${BASE_URL}/order`,
      params: {
        pk: pk,
        token: getToken(),
      },
    }).then((res) => {
      if (res.data.invoice_url) {
        setInvoiceAvailable(true);
        window.open(res.data.invoice_url, "_blank");
      } else {
        setInvoiceAvailable(false);
      }
      setLoadingInvoice(null);
    });
  };

  return (
    <div>
      {loadingData ? (
        <Loading />
      ) : data.length ? (
        data.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>
                <b>{index + 1}.</b> Order <u>#{item.pk}</u>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                disabled={loadingInvoice === item.pk}
                variant="link"
                onClick={() => fetchInvoice(item.pk)}
              >
                <u>Download Invoice</u>
              </Button>
              {!invoiceAvailable ? (
                <>
                  <br />
                  <Typography color="red" variant="caption">
                    Invoice not generated yet, please try again after few
                    seconds.
                  </Typography>
                </>
              ) : null}
            </AccordionDetails>
          </Accordion>
        ))
      ) : (
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Typography>You haven't place any orders yet..</Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </Button>
        </Stack>
      )}
    </div>
  );
}
