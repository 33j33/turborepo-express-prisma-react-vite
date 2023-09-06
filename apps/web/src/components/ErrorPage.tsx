import * as React from "react";
import { Alert, Container, Typography } from "@mui/material";

import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  let errorMessage: string;

  if (isRouteErrorResponse(error)) {
    // error is type `ErrorResponse`
    errorMessage = error.error?.message || error.statusText;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === "string") {
    errorMessage = error;
  } else {
    console.error(error);
    errorMessage = "Unknown error";
  }

  return (
    <Container>
      <Typography variant="h5" noWrap component="div">
        Not Found
      </Typography>
      <Alert variant="filled" severity="error">
        Sorry, an unexpected error has occurred.<i>{errorMessage}</i>
      </Alert>
    </Container>
  );
}
