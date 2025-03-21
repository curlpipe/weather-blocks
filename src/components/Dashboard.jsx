import Controls from "./Controls";
import Forecasts from "../features/forecasts/Forecasts";

function Dashboard() {
  return (
    <div className="w-120 mx-auto">
      <Controls />
      <Forecasts />
    </div>
  );
}

export default Dashboard;
