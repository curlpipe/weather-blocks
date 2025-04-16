import {
  getWeatherDescription,
  getWeatherIcon,
} from "../../utils/weatherUtils.js";
import { useDispatch } from "react-redux";
import { deleteForecast } from "./forecastsSlice.js";

function Forecast({
  location,
  weatherCode,
  temperature,
  windSpeed,
  precipitation,
}) {
  const dispatch = useDispatch();

  const handleDelete = (location) => {
    const [latitude, longitude] = location.split(", ").map(Number);
    const payload = { latitude, longitude };
    dispatch(deleteForecast(payload));
  };

  return (
    <div className="flex flex-col my-6 p-6 border-2 rounded-3xl" data-testid="forecast">
      <h2 className="text-2xl mx-auto">{location}</h2>
      <p className="text-5xl py-2 my-auto mx-auto">
        {getWeatherIcon(weatherCode)}
      </p>
      <div className="flex flex-row align-center py-5 mx-auto">
        <p className="text-xl px-5 my-auto">🌡 {temperature}°C</p>
        <p className="text-xl px-5 my-auto">🌪 {windSpeed}mph</p>
        <p className="text-xl px-5 my-auto">💧 {precipitation}%</p>
      </div>
      <p
        className="text-center text-red-400 hover:text-red-500"
        data-testid="delete-button"
        onClick={() => handleDelete(location)}
      >
        <span className="font-bold">X</span> Delete
      </p>
    </div>
  );
}

export default Forecast;
