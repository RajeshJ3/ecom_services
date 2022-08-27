import { Box } from "@mui/material";

export default function Layout({ children }) {
  return (
    <Box
      style={{
        backgroundColor: "#fff",
        minHeight: "100vh",
        padding: "0px 15px",
        height: "100%",
      }}
    >
      {children}
    </Box>
  );
}
