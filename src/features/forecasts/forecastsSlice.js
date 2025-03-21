import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  forecasts: [
    {
      latitude: 51.441225,
      longitude: -0.121155,
      temperature: 0,
      precipitation: 0,
      weatherCode: 0,
      windSpeed: 0,
    },
    {
      latitude: 20.968008,
      longitude: 15.176482,
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
  reducers: {
    newForecast: (state, action) => {
      state.forecasts.push({
        ...action.payload,
        temperature: 0,
        precipitation: 0,
        weatherCode: 0,
        windSpeed: 0,
      });
    },
    deleteForecast: (state, action) => {
      const { latitude, longitude } = action.payload;
      for (let i = 0; i < state.forecasts.length; i++) {
        const thisForecast = state.forecasts[i];
        const isMatch =
          thisForecast.latitude === latitude &&
          thisForecast.longitude === longitude;
        if (isMatch) {
          state.forecasts.splice(i, 1);
          break;
        }
      }
    },
  },
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

export const { newForecast, deleteForecast } = forecastsSlice.actions;
export default forecastsSlice.reducer;
