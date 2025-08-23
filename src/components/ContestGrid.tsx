import { Card, Col, Row, Typography } from "antd";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";

const { Text } = Typography;

export const ContestGrid = () => {
  const navigate = useNavigate();
  const contests = useGameStore((s) => s.contests);

  return (
    <div style={{ padding: "0 12px" }}>
      <Row gutter={[12, 12]}>
        {contests.map((c) => {
          const total = c.tasks.length;
          const played = c.tasks.filter((t) => t.played).length;
          const remaining = total - played;
          const isCompleted = remaining === 0;
          return (
            <Col key={c.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                onClick={() => navigate(`/contest/${c.id}`)}
                className={`contestCard ${isCompleted ? "disabled" : ""}`}
                style={{
                  opacity: isCompleted ? 0.7 : 1,
                  height: "100%",
                  position: "relative",
                  cursor: "pointer",
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
                    padding: "16px",
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
