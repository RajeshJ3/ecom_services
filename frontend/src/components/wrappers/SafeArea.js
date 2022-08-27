import { Container } from "@mui/material";

export default function SafeArea({ children }) {
  return (
    <Container maxWidth="lg" style={{ padding: 0, minHeight: "65vh" }}>
      {children}
    </Container>
  );
}
