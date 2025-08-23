import { useEffect } from "react";
import { Typography } from "antd";
import { ContestGrid } from "../components/ContestGrid";
import { contestsData } from "../data/contests";
import { useGameStore } from "../store/game";

const { Title } = Typography;

export const HomePage = () => {
  const setContests = useGameStore((s) => s.setContests);
  const hasContests = useGameStore((s) => s.contests.length > 0);
  useEffect(() => {
    if (!hasContests) setContests(contestsData);
  }, [setContests, hasContests]);

  return (
    <div className="page-section">
      {/* Заголовок */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <Title
          level={1}
          style={{ margin: 0, fontSize: "48px", fontWeight: 700 }}
        >
          Выберите конкурс
        </Title>
      </div>

      <ContestGrid />
    </div>
  );
};
