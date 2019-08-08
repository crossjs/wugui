import { Container, Typography } from "@material-ui/core";
import { Link } from "@wugui/plugin-router";
import React from "react";

export default function NotFound(props: any) {
  return (
    <Container>
      <Typography variant="h1">404 from Nested</Typography>
      Sorry, the page you visited does not exist.
      <hr />
      <Link to="/">Home</Link>
    </Container>
  );
}