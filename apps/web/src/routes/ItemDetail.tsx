import { Add, PlusOne, RemoveCircleOutlineOutlined } from "@mui/icons-material";
import { Box, Button, Divider, Grid, IconButton, TextField, Typography } from "@mui/material";
import { Fragment, ReactNode, useEffect, useId, useState } from "react";
import {
  ActionFunction,
  Form,
  LoaderFunction,
  json,
  matchPath,
  useLoaderData,
  useLocation,
  useParams,
} from "react-router-dom";
import { EventWithTrackinPlansResponseType, ROUTES, RoutesType, TrackingPlanWithEventsResponseType } from "types";

export const getitemLoader =
  (entity: RoutesType): LoaderFunction =>
  async ({ params }) => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${entity}/${params.id}`);
    const data = await res.json();
    return data;
  };

export const itemAction: ActionFunction = async ({ request, params }) => {
  console.log({ request, params }, request.method);
  const formData = await request.formData();
  const formDataObject: Record<string, FormDataEntryValue> = {};

  for (const [key, value] of formData.entries()) {
    formDataObject[key] = value;
  }
  const childrenArray: Record<string, FormDataEntryValue>[] = [];
  const payload: Record<string, any> = {};
  // create child events/plans from variables like this -> child_0_name, child_0_description
  for (const key in formDataObject) {
    const match = key.match(/^child_(\d+)_(.*)$/);
    if (match) {
      const index = parseInt(match[1]);
      const childProperty = match[2];

      if (!childrenArray[index]) {
        childrenArray[index] = {};
      }
      if (childProperty === "rules") {
        childrenArray[index][childProperty] = JSON.parse(formDataObject[key] as string);
      } else childrenArray[index][childProperty] = formDataObject[key];
    } else {
      if (key === "rules") {
        payload[key] = JSON.parse(formDataObject[key] as string)
      } else {payload[key] = formDataObject[key]};
    }
  }
  let entity = "";
  if (request.url.includes(ROUTES.EVENTS)) {
    if (request.method === "POST") payload.trackingPlans = childrenArray;
    payload.trackingPlanIds = childrenArray.map(o => o.id)
    entity = ROUTES.EVENTS;
  } else if (request.url.includes(ROUTES.PLANS)) {
    payload.events = childrenArray;
    if (request.method === 'PATCH') payload.eventIds = childrenArray.map(o => o.id)
    entity = ROUTES.PLANS;
  }
  
  if (request.method ===  "POST"){
      
      const res = await fetch(`${import.meta.env.VITE_API_URL}/${entity}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      return json(data)
    }
  else if (request.method === 'PATCH'){
    const res = await fetch(`${import.meta.env.VITE_API_URL}/${entity}/${params.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return json(data);
  }

  return null;
};

export function ItemDetail({ entity }: { entity: RoutesType }) {
  const params = useParams();
  const data = useLoaderData() as EventWithTrackinPlansResponseType | TrackingPlanWithEventsResponseType | undefined;
  const location = useLocation();

  const isEvent = entity === ROUTES.EVENTS;
  const event = data as EventWithTrackinPlansResponseType;
  const isPlan = entity === ROUTES.PLANS;
  const plan = data as TrackingPlanWithEventsResponseType;

  const indexRoute = matchPath(`${entity}`, location.pathname);
  const method = indexRoute ? "POST" : "PATCH";

  const [newChildEvents, setNewChildEvents] = useState<number[]>([]);
  const [removedChildrenIds, setRemovedChildrenIds] = useState<string[]>([])

  let childEvents = (plan?.events ?? []).filter(evt => !removedChildrenIds.includes(evt.id));
  let childPlans = (event?.trackingPlans ?? []).filter(plan => !removedChildrenIds.includes(plan.id));
  

  const onAdd = () => {
    isPlan && setNewChildEvents((s) => [...s, 1]);
   
  };

  const onRemove = ({idx, id}: {idx?: number, id?: string}) => {
    if (idx) isPlan && setNewChildEvents((s) => s.filter((_, i) => i !== idx));
    if (id){
      setRemovedChildrenIds((s) => [...s, id])
    }
  };

  const id = useId();

  useEffect(() => {
    // reset
    setNewChildEvents([])
  }, [params.id, entity])

  return (
    <Box>
      <Form method={method}>
        <Grid container spacing={4} width="70%" marginLeft={0} marginTop={4} columns={12}>
          <Grid md={3}>
            <Typography variant="subtitle2">Name</Typography>
          </Grid>
          <Grid md={9} marginBottom={3} key={data?.name || id}>
            <TextField required fullWidth defaultValue={data?.name ?? ""} variant="outlined" name="name" />
          </Grid>
          {isEvent && (
            <Grid md={3}>
              <Typography variant="subtitle2">Description</Typography>
            </Grid>
          )}
          {isEvent && (
            <Grid md={9} marginBottom={3}>
              <TextField
                required
                fullWidth
                defaultValue={event?.description || ""}
                variant="outlined"
                multiline
                rows={2}
                name="description"
              />
            </Grid>
          )}
          {isEvent && (
            <Grid md={3}>
              <Typography variant="subtitle2">Rules</Typography>
            </Grid>
          )}
          {isEvent && (
            <Grid md={9} marginBottom={3}>
              <TextField
                required
                fullWidth
                defaultValue={event?.rules ? JSON.stringify(event.rules) : ""}
                variant="outlined"
                multiline
                rows={4}
                name="rules"
              />
            </Grid>
          )}

          <Grid md={9} gap={2}>
            {!indexRoute && <Divider textAlign="left"> {isPlan ? "Events" : "Tracking Plans"} Associated </Divider>}
          </Grid>
          <Grid md={3}>
            {indexRoute && isPlan && <Button size="small" variant="outlined" sx={{ marginLeft: "30px" }} onClick={onAdd}>
              {"Associate Event"}
            </Button>}
          </Grid>
          {!indexRoute &&
            isPlan &&
            childEvents.map((evt, idx) => (
              <ChildContainer key={evt.id} onRemove={() => onRemove({id: evt.id})}>
                <TextField
                    defaultValue={evt?.id || ""}
                    name={`child_${idx}_id`}
                    hidden
                    sx={{display: "none"}}
                  />
                <Grid md={3}>
                  <Typography variant="subtitle2">Name</Typography>
                </Grid>
                <Grid md={9} marginBottom={3}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={evt?.name || ""}
                    variant="outlined"
                    helperText={evt?.id || ""}
                    name={`child_${idx}_name`}
                  />
                </Grid>

                <Grid md={3}>
                  <Typography variant="subtitle2">Description</Typography>
                </Grid>

                <Grid md={9} marginBottom={3}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={evt?.description || ""}
                    variant="outlined"
                    multiline
                    rows={2}
                  />
                </Grid>

                <Grid md={3}>
                  <Typography variant="subtitle2">Rules</Typography>
                </Grid>

                <Grid md={9} marginBottom={3}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={evt?.rules ? JSON.stringify(evt.rules) : ""}
                    variant="outlined"
                    multiline
                    rows={4}
                  />
                </Grid>
              </ChildContainer>
            ))}
          {indexRoute &&
            isPlan &&
            newChildEvents.map((_, idx) => (
              <ChildContainer key={idx} onRemove={() => onRemove({idx})}>
                <Grid md={3}>
                  <Typography variant="subtitle2">Name</Typography>
                </Grid>
                <Grid md={9} marginBottom={3}>
                  <TextField required fullWidth defaultValue={""} variant="outlined" name={`child_${idx}_name`} />
                </Grid>

                <Grid md={3}>
                  <Typography variant="subtitle2">Description</Typography>
                </Grid>

                <Grid md={9} marginBottom={3}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={""}
                    variant="outlined"
                    multiline
                    rows={2}
                    name={`child_${idx}_description`}
                  />
                </Grid>

                <Grid md={3}>
                  <Typography variant="subtitle2">Rules</Typography>
                </Grid>

                <Grid md={9} marginBottom={3}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={""}
                    variant="outlined"
                    multiline
                    rows={4}
                    name={`child_${idx}_rules`}
                  />
                </Grid>
              </ChildContainer>
            ))}

          {!indexRoute &&
            isEvent &&
            childPlans.map((plan, idx) => (
              <ChildContainer key={plan.id} onRemove={() => onRemove({id: plan.id})}>
                <TextField
                    defaultValue={plan?.id || ""}
                    name={`child_${idx}_id`}
                    hidden
                    sx={{display: "none"}}
                  />
                <Grid md={3}>
                  <Typography variant="subtitle2">Name</Typography>
                </Grid>
                <Grid md={9} marginBottom={3}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={plan?.name || ""}
                    variant="outlined"
                    helperText={plan?.id || ""}
                    name={`child_${idx}_id`}
                  />
                </Grid>
              </ChildContainer>
            ))}
          {/* {indexRoute &&
            isEvent &&
            newChildPlans.map((_, idx) => (
              <ChildContainer key={idx} onRemove={() => onRemove(idx)}>
                <Grid md={3}>
                  <Typography variant="subtitle2">Name</Typography>
                </Grid>
                <Grid md={9} marginBottom={3}>
                  <TextField
                    required
                    fullWidth
                    defaultValue={""}
                    variant="outlined"
                    name={`child_${childPlans.length + idx}_name`}
                  />
                </Grid>
              </ChildContainer>
            ))} */}

          <Button
            type="submit"
            startIcon={<Add />}
            size="large"
            color="primary"
            variant="outlined"
            sx={{ position: "absolute", top: "90px", right: "150px" }}>
            Save
          </Button>
        </Grid>
      </Form>
    </Box>
  );
}

function ChildContainer({
  onRemove,
  children,
}: {
  onRemove?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: ReactNode;
}) {
  return (
    <Grid md={12} container border="1px dashed grey" padding={4} marginTop={2} position="relative">
      {children}
      <Button
        startIcon={<RemoveCircleOutlineOutlined />}
        size="small"
        aria-label="remove"
        color="primary"
        variant="outlined"
        sx={{ position: "absolute", bottom: "10px", right: "32px", fontSize: "10px" }}
        onClick={onRemove}>
        Remove
      </Button>
    </Grid>
  );
}
