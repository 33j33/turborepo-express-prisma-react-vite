import { Box, Container, Grid, TextField, Typography } from "@mui/material";
import { LoaderFunction, useLoaderData, useParams } from "react-router-dom";
import {
  EventResponseType,
  EventWithTrackinPlansResponseType,
  ROUTES,
  RoutesType,
  TrackingPlanWithEventsResponseType,
} from "types";

export const getitemLoader =
  (entity: RoutesType): LoaderFunction =>
  async ({ params }) => {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/${entity}/${params.id}`
    );
    const data = await res.json();
    return data;
  };

export function ItemDetail({ entity }: { entity: RoutesType }) {
  const params = useParams();
  const data = useLoaderData() as EventWithTrackinPlansResponseType | 
    TrackingPlanWithEventsResponseType | undefined;

const isEvent = entity === ROUTES.EVENTS
const event = data as EventWithTrackinPlansResponseType
const isPlan = entity === ROUTES.PLANS
const plan = data as TrackingPlanWithEventsResponseType

  return (
    <Box>
      <Grid
        container
        spacing={4}
        width="70%"
        alignItems={"center"}
        marginLeft={0}
        marginTop={4}
        columns={12}
      >
        <Grid md={3}>
          <Typography variant="subtitle2">Name</Typography>
        </Grid>
        <Grid md={9} marginBottom={3}>
          <TextField
            fullWidth
            value={data?.name ?? ""}
            variant="outlined"
          />
        </Grid>
        {isEvent && <Grid md={3}>
          <Typography variant="subtitle2">Description</Typography>
        </Grid>}
        {isEvent && <Grid md={9} marginBottom={3}>
          <TextField
            fullWidth
            value={event?.description || ""}
            variant="outlined"
            multiline
            rows={2}
          />
        </Grid>}
        {isEvent && <Grid md={3}>
          <Typography variant="subtitle2">Rules</Typography>
        </Grid>}
        {isEvent && <Grid md={9} marginBottom={3}>
          <TextField
            fullWidth
            value={event?.rules ? JSON.stringify(event.rules) :  ""}
            variant="outlined"
            multiline
            rows={4}
          />
        </Grid>}
      </Grid>
    </Box>
  );
}
