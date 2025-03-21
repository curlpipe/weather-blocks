import { Outlet } from "react-router-dom";

function Root() {
  return (
    <div className="m-6">
      <h1 className="text-4xl font-bold">
        <span className="text-purple-500">Weather</span>Blocks
      </h1>
      <Outlet />
    </div>
  );
}

export default Root;
