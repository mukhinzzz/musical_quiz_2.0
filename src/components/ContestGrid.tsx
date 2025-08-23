import { Card, Col, Row, Typography } from "antd";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGameStore } from "../store/game";

const { Text, Title } = Typography;

export const ContestGrid = () => {
  const navigate = useNavigate();
  const contests = useGameStore((s) => s.contests);

  return (
    <div style={{ padding: 12 }}>
      <Title level={3} style={{ marginTop: 0 }}>
        Выбор конкурса
      </Title>
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
                style={{ opacity: disabled ? 0.6 : 1, height: "100%" }}
                title={c.title}
              >
                <Text>{c.description.slice(0, 200)}</Text>
                <div style={{ marginTop: 8 }}>
                  <Text type="secondary">
                    Осталось {remaining} из {total}
                  </Text>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
};
