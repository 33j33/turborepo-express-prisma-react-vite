import "./App.css";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { Root } from "./routes/root";
import ErrorPage from "./components/ErrorPage";
import { getitemLoader, itemAction, ItemDetail } from "./routes/ItemDetail";
import { getEntityLoader, Sidebar } from "./routes/Sidebar";
import { ItemDetailWrapper } from "./routes/ItemDetailWrapper";
import { ROUTES } from "types";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
      <Route index element={<Navigate to={ROUTES.EVENTS} />} />
      {Object.values(ROUTES).map((o) => (
        <Route
          path={o}
          key={o}
          loader={getEntityLoader(o)}
          element={
            <>
              <Sidebar /> <ItemDetailWrapper />
            </>
          }>
          <Route index element={<ItemDetail entity={o} />} action={itemAction}/>
          <Route path=":id" element={<ItemDetail entity={o} />} loader={getitemLoader(o)} action={itemAction}/>
        </Route>
      ))}
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
