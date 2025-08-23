import { useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Col, Row, Space, Typography } from "antd";
import { useGameStore } from "../store/game";
import { PlayersBar } from "../components/PlayersBar";

const { Title, Text } = Typography;

export const ContestPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contest = useGameStore((s) => s.contests.find((c) => c.id === id));

  if (!contest) return <div style={{ padding: 12 }}>Конкурс не найден</div>;

  const remaining = contest.tasks.filter((t) => !t.played).length;

  // quickPoints теперь вычисляются внутри PlayersBar от URL

  return (
    <div style={{ padding: 12 }}>
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={() => navigate("/")}>К конкурсам</Button>
      </Space>
      <Title level={3} style={{ marginTop: 0 }}>
        {contest.title}
      </Title>
      <Text>{contest.description}</Text>
      <div style={{ marginTop: 8 }}>
        <Text strong>Цена: {contest.points} баллов</Text>
      </div>

      <div style={{ marginTop: 12, marginBottom: 12 }}>
        <Text type="secondary">
          Быстрое начисление: нажмите по игроку сверху (+{contest.points})
        </Text>
      </div>

      {/* Быстрое начисление поверх карточек игроков уже доступно в PlayersBar через ручной ввод.
            Добавим также возможность быстрого клика здесь по списку игроков, как подсказка. */}
      <Row gutter={[12, 12]}>
        {contest.tasks.map((t) => (
          <Col key={t.id} xs={12} sm={8} md={6} lg={4}>
            <Card
              hoverable={!t.played}
              onClick={() =>
                !t.played && navigate(`/contest/${contest.id}/task/${t.id}`)
              }
              style={{ textAlign: "center", opacity: t.played ? 0.6 : 1 }}
            >
              <Title level={4} style={{ margin: 0 }}>
                {t.order}
              </Title>
              <Text type="secondary">{t.played ? "Сыграно" : "Доступно"}</Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};
