import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";

import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@mui/material";
import { ROUTES } from "types";

export function Root() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Box sx={{ display: "flex", gap: "20px" }}>
            <Button
              component={NavLink}
              to={ROUTES.PLANS}
              sx={{
                "&.active": {
                  border: "1px solid",
                },
              }}>
              Tracking Plans
            </Button>
            <Button
              component={NavLink}
              to={ROUTES.EVENTS}
              sx={{
                "&.active": {
                  border: "1px solid",
                },
              }}>
              Events
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
