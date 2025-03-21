import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loadForecasts } from "./forecastsSlice";
import Forecast from "./Forecast";

function Forecasts() {
  const dispatch = useDispatch();
  const forecasts = useSelector((state) => state.forecasts.forecasts);
  console.log(forecasts);

  useEffect(() => {
    dispatch(loadForecasts());
  }, [dispatch]);

  return (
    <>
      {forecasts.map(
        ({
          latitude,
          longitude,
          temperature,
          precipitation,
          weatherCode,
          windSpeed,
        }) => {
          return <Forecast
            location={`${latitude}, ${longitude}`}
            temperature={temperature}
            precipitation={precipitation}
            weatherCode={weatherCode}
            windSpeed={windSpeed}
          />
        }
      )}
    </>
  );
}

export default Forecasts;
