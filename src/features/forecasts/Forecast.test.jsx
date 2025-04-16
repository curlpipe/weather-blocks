import React from "react";
import Forecast from "./Forecast";
import Forecasts from "./Forecasts";
import { render, screen, within } from "@testing-library/react";
import store from "../../store";
import { Provider } from "react-redux";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

it("Renders a forecast correctly", () => {
  render(
    <Provider store={store}>
      <Forecast
        location={"0, 0"}
        weatherCode={99}
        temperature={21}
        precipitation={48}
        windSpeed={20}
      />
    </Provider>
  );

  // Ensure the heading is present
  const locationText = screen.getByRole("heading");
  expect(locationText).toBeInTheDocument();
  expect(locationText).toHaveTextContent("0, 0");

  // Ensure the precipitation probability is in the correct format
  const precipitationText = screen.getAllByRole("paragraph")[3];
  expect(precipitationText).toBeInTheDocument();
  expect(precipitationText).toHaveTextContent(/💧 \d{1,3}%/);
});

it("Can delete itself correctly", async () => {
  render(
    <Provider store={store}>
      <Forecasts />
    </Provider>
  );

  // Get relevant items in the DOM
  const firstForecast = screen.getAllByTestId("forecast")[0];
  const firstForecastDelete =
    within(firstForecast).getByTestId("delete-button");

  // Ensure our forecast exists in forecasts
  expect(firstForecast).toBeInTheDocument();
  expect(firstForecastDelete).toBeInTheDocument();

  // Get the delete button of the first forecast and click it
  userEvent.click(firstForecastDelete);

  await new Promise((r) => setTimeout(r, 100));

  // Ensure that the forecast is now no longer in the DOM
  expect(screen.queryAllByTestId("forecast")[1]).toBeUndefined();
});
