import { Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";

const { Text } = Typography;

export const ContestGrid = () => {
  const navigate = useNavigate();
  const contests = useGameStore((s) => s.contests);

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
      <Row
        gutter={[24, 24]}
        justify="center"
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {contests.map((c) => {
          const total = c.tasks.length;
          const played = c.tasks.filter((t) => t.played).length;
          const remaining = total - played;
          const isCompleted = remaining === 0;
          return (
            <Col
              key={c.id}
              style={{
                minWidth: "200px",
                maxWidth: "250px",
                flex: "1 1 200px",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Card
                hoverable
                onClick={() => navigate(`/contest/${c.id}`)}
                className={`contestCard ${isCompleted ? "disabled" : ""}`}
                style={{
                  opacity: isCompleted ? 0.7 : 1,
                  height: "100%",
                  position: "relative",
                  cursor: "pointer",
                  width: "100%",
                  minWidth: "200px",
                  minHeight: "200px",
                }}
                styles={{
                  header: {
                    backgroundColor: "transparent",
                    borderBottom: "1px solid rgba(124, 58, 237, 0.15)",
                    color: "#EAEAFF",
                    fontSize: "16px",
                    fontWeight: 600,
                  },
                  body: {
                    backgroundColor: "transparent",
                    padding: "20px",
                  },
                }}
                title={c.title}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    minHeight: "80px",
                    paddingBottom: "40px",
                  }}
                >
                  <Text
                    style={{
                      color: "#B4B4CC",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      textAlign: "center",
                    }}
                  >
                    {c.description.slice(0, 150)}
                    {c.description.length > 150 ? "..." : ""}
                  </Text>
                </div>

                {/* Лейбл прогресса в левом нижнем углу */}
                <div className="contestCard-progress-label">
                  {isCompleted ? "Завершено" : `${remaining} из ${total}`}
                </div>

                {/* Лейбл баллов в правом нижнем углу */}
                <div className="contestCard-points-label">+{c.points}</div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
