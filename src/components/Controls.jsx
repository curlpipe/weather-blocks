import { Link } from "react-router-dom";

function Controls() {
  return (
    <Link to="/forecasts/new">
      <button className="p-3 border-2 rounded-2xl w-full mt-6 text-xl hover:bg-purple-200 active:bg-purple-300 hover:font-medium">
        New Forecast
      </button>
    </Link>
  );
}

export default Controls;
