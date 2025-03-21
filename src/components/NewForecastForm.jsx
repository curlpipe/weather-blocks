import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { newForecast } from "../features/forecasts/forecastsSlice";

function NewForecastForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      newForecast({
        latitude: Number(latitude),
        longitude: Number(longitude),
      })
    );

    navigate("/forecasts");
  };

  return (
    <div className="my-3 flex flex-col m-auto w-80">
      <h2 className="text-2xl font-medium text-center my-3 mb-6">
        New Forecast
      </h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="latitude" className="my-1 mx-auto">
          Latitude
        </label>
        <input
          type="text"
          name="latitude"
          id="latitude"
          className="p-2 rounded-xl border-2"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
        <br />
        <label htmlFor="longitude" className="my-1 mx-auto">
          Longitude
        </label>
        <input
          type="text"
          name="longitude"
          id="longitude"
          className="p-2 rounded-xl border-2"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <br />
        <input
          type="submit"
          className="bg-purple-200 hover:bg-purple-300 active:bg-purple-400 p-3 rounded-xl my-3 mx-auto w-30 font-semibold"
        />
      </form>
    </div>
  );
}

export default NewForecastForm;
