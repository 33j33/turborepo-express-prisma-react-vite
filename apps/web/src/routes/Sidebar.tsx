import { Drawer, Toolbar, Box, Link, Button } from "@mui/material";
import { LoaderFunction, NavLink, useLoaderData, useLocation } from "react-router-dom";
import { EventResponseType, RoutesType, TrackingPlanResponseType } from "types";
const drawerWidth = `20%`;

export const getEntityLoader =
  (entity: RoutesType): LoaderFunction =>
  async ({}) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${entity}`);
    const data = await res.json();
    return data;
  };
export function Sidebar() {
  const data = useLoaderData() as
    | EventResponseType[]
    | TrackingPlanResponseType[];
    
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />
      <Box
        sx={{
          overflow: "auto",
          margin: "20px",
          display: "flex",
          gap: "20px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {data?.map((o) => (
          <Button
            size="small"
            component={NavLink}
            key={o.id}
            to={o.id}
            sx={{
              textTransform: "capitalize",
              "&.active": {
                border: "1px solid",
              },
            }}
          >
            {o.name}
          </Button>
        ))}
      </Box>
    </Drawer>
  );
}
