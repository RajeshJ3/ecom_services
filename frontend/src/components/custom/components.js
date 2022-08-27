import { TextField } from "@mui/material";

import { styled } from "@mui/material/styles";

export const CustomTextField = styled(TextField)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(2),
  },
  "& .MuiInputBase-input": {
    borderBottom: "0px",
    fontSize: 16,
    padding: "10px 12px",
  },
}));
