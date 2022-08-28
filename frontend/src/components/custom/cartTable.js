import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Button, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import Loading from "../../components/wrappers/Loading";
import { getToken } from "../../utils/helpers";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "../../utils/config";

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const CustomTableRow = styled(TableRow)(({ theme }) => ({
  [`&.${tableRowClasses.root}`]: {
    cursor: "pointer",
  },
}));

export const CartTable = (props) => {
  const [removing, setRemoving] = useState(null);

  const navigate = useNavigate();

  const removeFromCart = (pk) => {
    setRemoving(pk);
    axios({
      method: "POST",
      url: `${BASE_URL}/remove-from-cart`,
      params: {
        pk: pk,
        token: getToken(),
      },
    }).then((res) => {
      window.location.reload();
    });
  };

  return props.loadingData ? (
    <Loading />
  ) : (
    <TableContainer component={Paper}>
      <Table aria-label="blob table">
        <TableHead>
          <TableRow>
            <CustomTableCell>Image</CustomTableCell>
            <CustomTableCell align="right">Title</CustomTableCell>
            <CustomTableCell align="right">Price</CustomTableCell>
            <CustomTableCell align="right">Remove</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.length ? (
            props.rows.map((row, index) => (
              <CustomTableRow
                key={index}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  cursor: "pointer",
                }}
              >
                <CustomTableCell onClick={() => navigate(`/blob/${row.id}`)}>
                  <img
                    src={row.img}
                    alt={row.title}
                    style={{ height: "50px" }}
                  />
                </CustomTableCell>
                <CustomTableCell
                  onClick={() => navigate(`/blob/${row.id}`)}
                  align="right"
                >
                  {row.title}
                </CustomTableCell>
                <CustomTableCell
                  onClick={() => navigate(`/blob/${row.id}`)}
                  align="right"
                >
                  <b>${row.price}</b>
                </CustomTableCell>
                <CustomTableCell align="right">
                  <IconButton
                    disabled={removing === row.id}
                    color="error"
                    component="label"
                    onClick={() => removeFromCart(row.id)}
                  >
                    <Delete />
                  </IconButton>
                </CustomTableCell>
              </CustomTableRow>
            ))
          ) : (
            <CustomTableRow>
              <CustomTableCell align="center" colSpan={4}>
                <Typography>Your cart is empty..</Typography>
                <br />
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate("/")}
                >
                  Continue Shopping
                </Button>
              </CustomTableCell>
            </CustomTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
