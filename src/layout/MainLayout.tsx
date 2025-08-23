import { Outlet, Link } from "react-router-dom";
import { PlayersBar } from "../components/PlayersBar";
import { FireOutlined } from "@ant-design/icons";

export const MainLayout = () => {
  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <header
        className="glass"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 16px",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "#EAEAFF",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          <FireOutlined /> Musical Quiz
        </Link>
      </header>
      <PlayersBar />
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
};
