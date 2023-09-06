import { Box, Toolbar, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

export function ItemDetailWrapper() {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar />
      <Typography variant="h5">
        Details
      </Typography>
      <Outlet />
    </Box>
  );
}
