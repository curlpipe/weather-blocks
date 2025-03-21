import { configureStore } from '@reduxjs/toolkit';
import forecastsReducer from './features/forecasts/forecastsSlice';

const store = configureStore({
    reducer: {
        forecasts: forecastsReducer,
    }
})

export default store;