import { Outlet } from "react-router-dom";
import { PlayersBar } from "../components/PlayersBar";

export const MainLayout = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <PlayersBar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};
