import {
  getWeatherDescription,
  getWeatherIcon,
} from "../../utils/weatherUtils.js";

function Forecast({
  location,
  weatherCode,
  temperature,
  windSpeed,
  precipitation,
}) {
  return (
    <div className="flex flex-col my-6 p-6 border-2 rounded-3xl">
      <h2 className="text-2xl mx-auto">{location}</h2>
      <p className="text-5xl py-2 my-auto mx-auto">{getWeatherIcon(weatherCode)}</p>
      <div className="flex flex-row align-center py-5 mx-auto">
        <p className="text-xl px-5 my-auto">🌡 {temperature}°C</p>
        <p className="text-xl px-5 my-auto">🌪 {windSpeed}mph</p>
        <p className="text-xl px-5 my-auto">💧 {precipitation}%</p>
      </div>
    </div>
  );
}

export default Forecast;
