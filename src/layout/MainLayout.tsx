import { Outlet } from "react-router-dom";
import { PlayersBar } from "../components/PlayersBar";

export const MainLayout = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <div className="staticBar">
        <div className="container">
          <PlayersBar />
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
