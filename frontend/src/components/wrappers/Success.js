import { CheckCircle } from "@mui/icons-material";
import { Button, Stack, Typography } from "@mui/material";
import SafeArea from "./SafeArea";

export default function Success({ text, handleContinue }) {
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
          <CheckCircle color="success" fontSize="large" />
          <Typography align="center">{text || "Success"}</Typography>
          {handleContinue && (
            <Button variant="outlined" color="inherit" onClick={handleContinue}>
              Continue
            </Button>
          )}
        </Stack>
      </div>
    </SafeArea>
  );
}
