import { CircularProgress, Stack, Typography } from "@mui/material";
import SafeArea from "./SafeArea";

export default function Loading({ text }) {
  return (
    <SafeArea>
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "60vh",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          spacing={3}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress style={{ color: "inherit" }} />
          {text && <Typography align="center">{text}</Typography>}
        </Stack>
      </div>
    </SafeArea>
  );
}
