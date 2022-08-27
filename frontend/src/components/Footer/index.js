import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import urls from "../../urls.json";

export default function Footer() {
  return (
    <footer
      style={{
        width: "100%",
        bottom: 0,
        padding: "50px 0px",
      }}
    >
      <Stack
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={1.5}
      >
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5.5}
        >
          <Typography
            variant="body2"
            fontWeight={700}
            component={Link}
            to={urls.home.path}
            color={"black"}
            style={{
              textTransform: "uppercase",
            }}
          >
            {urls.home.name}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={700}
            component={Link}
            to={urls.orders.path}
            color={"black"}
            style={{
              textTransform: "uppercase",
            }}
          >
            {urls.orders.name}
          </Typography>
          <Typography
            variant="body2"
            fontWeight={700}
            component={Link}
            to={urls.contact.path}
            color={"black"}
            style={{
              textTransform: "uppercase",
            }}
          >
            {urls.contact.name}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={5.5}
        >
          <Typography
            variant="caption"
            color={"#b3b3b3"}
            className="redisXdev"
            style={{
              cursor: "pointer",
            }}
            onClick={() =>
              window.location.replace(
                "https://dev.to/devteam/announcing-the-redis-hackathon-on-dev-3248"
              )
            }
          >
            Redis x DEV Hackathon Project by RajeshJ3
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          <Typography variant="body2" color={"#b3b3b3"}>
            Copyright © 2022
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            to={urls.privacy.path}
            color={"#b3b3b3"}
          >
            {urls.privacy.name}
          </Typography>
          <Typography
            variant="body2"
            component={Link}
            to={urls.terms.path}
            color={"#b3b3b3"}
          >
            {urls.terms.name}
          </Typography>
        </Stack>
      </Stack>
    </footer>
  );
}
