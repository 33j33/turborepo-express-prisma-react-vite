import { Box, Toolbar, Typography } from "@mui/material";
import { Outlet, useParams } from "react-router-dom";

export function ItemDetailWrapper() {
  const params = useParams();

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h5">{params?.id ? "Details" : "Create New"}</Typography>
      <Outlet />
    </Box>
  );
}
