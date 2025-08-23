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
          const disabled = remaining === 0;
          return (
            <Col key={c.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable={!disabled}
                onClick={() => !disabled && navigate(`/contest/${c.id}`)}
                className={`contestCard ${disabled ? "disabled" : ""}`}
                style={{
                  opacity: disabled ? 0.7 : 1,
                  height: "100%",
                  position: "relative",
                  cursor: disabled ? "not-allowed" : "pointer",
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
                <div style={{ marginBottom: 12 }}>
                  <Text
                    style={{
                      color: "#B4B4CC",
                      fontSize: "14px",
                      lineHeight: 1.5,
                      display: "block",
                    }}
                  >
                    {c.description.slice(0, 150)}
                    {c.description.length > 150 ? "..." : ""}
                  </Text>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: 16,
                  }}
                >
                  <Text
                    type={disabled ? undefined : "secondary"}
                    style={{
                      fontSize: "13px",
                      color: disabled ? "#9CA3AF" : "#8B8BA3",
                      fontWeight: 500,
                    }}
                  >
                    Осталось {remaining} из {total}
                  </Text>
                  <div
                    className="badge"
                    style={{
                      position: "static",
                      background: disabled
                        ? "rgba(156, 163, 175, 0.15)"
                        : "linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(99, 102, 241, 0.15))",
                      border: disabled
                        ? "1px solid rgba(156, 163, 175, 0.25)"
                        : "1px solid rgba(124, 58, 237, 0.3)",
                      color: disabled ? "#9CA3AF" : "#C7C7E8",
                      fontSize: "12px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "12px",
                    }}
                  >
                    {c.points} баллов
                  </div>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
