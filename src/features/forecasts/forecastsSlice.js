import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  forecasts: [
    {
      latitude: 0,
      longitude: 0,
      temperature: 0,
      precipitation: 0,
      weatherCode: 0,
      windSpeed: 0,
    },
  ],
  loadingForecasts: false,
  errorLoadingForecasts: false,
};

export const loadForecasts = createAsyncThunk(
  "forecasts/loadForecasts",
  async (_, { getState }) => {
    const { forecasts } = getState();
    const responses = await Promise.all(
      forecasts.forecasts.map(({ latitude, longitude }) =>
        fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,precipitation_probability,weather_code&timezone=GMT&wind_speed_unit=mph`
        )
      )
    );
    const jsons = await Promise.all(responses.map((resp) => resp.json()));
    return jsons;
  }
);

const forecastsSlice = createSlice({
  name: "forecasts",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(loadForecasts.pending, (state, action) => {
        state.loadingForecasts = true;
        state.errorLoadingForecasts = false;
      })
      .addCase(loadForecasts.rejected, (state, action) => {
        state.loadingForecasts = false;
        state.errorLoadingForecasts = true;
      })
      .addCase(loadForecasts.fulfilled, (state, action) => {
        // Update the state
        for (let i = 0; i < state.forecasts.length; i++) {
          const forecast = state.forecasts[i];
          const response = action.payload[i];
          forecast.temperature = response.current.temperature_2m;
          forecast.windSpeed = response.current.wind_speed_10m;
          forecast.precipitation = response.current.precipitation_probability;
          forecast.weatherCode = response.current.weather_code;
        }
        state.loadingForecasts = false;
        state.errorLoadingForecasts = false;
      });
  },
});

export default forecastsSlice.reducer;
