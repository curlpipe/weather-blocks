import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import NewForecastForm from "./components/NewForecastForm";
import Root from "./components/Root";
import Forecasts from "./features/forecasts/Forecasts";
import "./App.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route path="forecasts" element={<Forecasts />} />
      <Route path="forecasts/new" element={<NewForecastForm />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
