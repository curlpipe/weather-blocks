import React from "react";
import Dashboard from "./Dashboard";
import NewForecastForm from "./NewForecastForm";
import { screen, render, within } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "../store";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

import "@testing-library/jest-dom";
import { userEvent } from "@testing-library/user-event";

it("Creates a new forecast correctly", async () => {
  // Create test router
  const router = createMemoryRouter(
    [
      {
        path: "/forecasts",
        element: <Dashboard />,
      },
      {
        path: "/forecasts/new",
        element: <NewForecastForm />,
      },
    ],
    {
      initialEntries: ["/forecasts"],
    }
  );

  render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );

  // Get the new forecast button and click it!
  const newForecastButton = screen.getByText("New Forecast");
  await userEvent.click(newForecastButton);

  // Fill out the new forecast form
  const latitude = screen.getByTestId("latitude");
  const longitude = screen.getByTestId("longitude");
  await userEvent.type(latitude, "41.763982");
  await userEvent.type(longitude, "-2.649332");

  // Submit the form
  const submitButton = screen.getByRole("button");
  await userEvent.click(submitButton);

  // Verify the new forecast is present
  const lastForecast = screen.getAllByTestId("forecast").at(-1);
  const lastForecastHeading = within(lastForecast).getByRole("heading");
  expect(lastForecastHeading).toHaveTextContent("41.763982, -2.649332");
});
