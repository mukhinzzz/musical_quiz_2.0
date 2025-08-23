import { Outlet } from "react-router-dom";
import { PlayersBar } from "../components/PlayersBar";
import { useGameStore } from "../store/game";

export const MainLayout = () => {
  const playersBarVertical = useGameStore((s) => s.playersBarVertical);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: playersBarVertical ? "row" : "column",
      }}
    >
      {playersBarVertical ? (
        // Вертикальный режим - бар слева
        <>
          <div style={{ flexShrink: 0 }}>
            <PlayersBar />
          </div>
          <div style={{ flex: 1, overflow: "hidden" }}>
            <div
              className="container"
              style={{ height: "100vh", overflowY: "auto" }}
            >
              <Outlet />
            </div>
          </div>
        </>
      ) : (
        // Горизонтальный режим - бар сверху
        <>
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
        </>
      )}
    </div>
  );
};
