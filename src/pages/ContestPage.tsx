import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "antd";
import { RedoOutlined } from "@ant-design/icons";
import { useGameStore } from "../store/game";

const { Title, Text } = Typography;

export const ContestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contest = useGameStore((s) => s.contests.find((c) => c.id === id));
  const setTaskPlayed = useGameStore((s) => s.setTaskPlayed);

  if (!contest) return <div style={{ padding: 12 }}>Конкурс не найден</div>;

  return (
    <div className="page-section">
      {/* Заголовок с лейблом баллов */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          gap: "12px",
        }}
      >
        <Title
          level={1}
          style={{ margin: 0, fontSize: "48px", fontWeight: 700 }}
        >
          {contest.title}
        </Title>
        <div
          className="contestCard-points-label"
          style={{
            position: "static",
            margin: 0,
            fontSize: "18px",
            padding: "8px 16px",
            borderRadius: "12px",
          }}
        >
          +{contest.points}
        </div>
      </div>

      <Text
        style={{
          display: "block",
          marginBottom: 40,
          fontSize: "18px",
          lineHeight: 1.6,
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 40px auto",
        }}
      >
        {contest.description}
      </Text>

      {/* Сетка с карточками заданий */}
      <div
        style={{
          marginBottom: 32,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="grid-container"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, 154px)",
            gap: "16px",
            justifyContent: "center",
            maxWidth: "1000px",
            width: "100%",
          }}
        >
          {contest.tasks.map((t) => (
            <div key={t.id}>
              <Card
                hoverable={!t.played}
                onClick={() =>
                  !t.played && navigate(`/contest/${contest.id}/task/${t.id}`)
                }
                className={`taskCard grid-item ${t.played ? "disabled" : ""}`}
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  cursor: !t.played ? "pointer" : "default",
                  width: "154px",
                  height: "112px",
                }}
                styles={{
                  body: {
                    padding: "16px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  },
                }}
              >
                {t.played && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setTaskPlayed(contest.id, t.id, false);
                    }}
                    style={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      border: "none",
                      background: "rgba(22, 119, 255, 0.1)",
                      borderRadius: "6px",
                      width: "28px",
                      height: "28px",
                      cursor: "pointer",
                      color: "#1677ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 10,
                    }}
                    aria-label="Сделать доступным"
                    title="Сделать доступным"
                  >
                    <RedoOutlined />
                  </button>
                )}
                <div
                  style={{
                    fontSize: "34px",
                    fontWeight: 700,
                    color: t.played ? "#9CA3AF" : "#EAEAFF",
                    lineHeight: 1,
                  }}
                >
                  {t.order}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Кнопка возврата к конкурсам внизу */}
      <div style={{ textAlign: "center" }}>
        <Button onClick={() => navigate("/")} size="large">
          К конкурсам
        </Button>
      </div>
    </div>
  );
};
