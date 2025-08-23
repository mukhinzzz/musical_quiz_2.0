import { useMemo, useState } from "react";
import {
  Button,
  Card,
  Flex,
  InputNumber,
  Modal,
  Space,
  Typography,
  Tooltip,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  UserAddOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useGameStore } from "../store/game";

const { Text } = Typography;

export const PlayersBar = () => {
  const location = useLocation();
  const playersState = useGameStore((s) => s.players);
  const playersOrder = useGameStore((s) => s.playersOrder);
  const contests = useGameStore((s) => s.contests);
  const addPlayer = useGameStore((s) => s.addPlayer);
  const adjustScore = useGameStore((s) => s.adjustScore);
  const deleteMode = useGameStore((s) => s.deleteMode);
  const setDeleteMode = useGameStore((s) => s.setDeleteMode);
  const removePlayerById = useGameStore((s) => s.removePlayerById);

  const players = useMemo(() => {
    if (playersOrder.length === 0) return playersState;
    const map = new Map(playersState.map((p) => [p.id, p] as const));
    const ordered = playersOrder
      .map((id) => map.get(id))
      .filter(Boolean) as typeof playersState;
    // добаляем внезапно появившихся (на всякий случай)
    const rest = playersState.filter((p) => !playersOrder.includes(p.id));
    return [...ordered, ...rest];
  }, [playersState, playersOrder]);

  // Вычисляем quickPoints из URL: /contest/:id или /contest/:id/task/:taskId
  const quickPoints = useMemo(() => {
    const path = location.pathname;
    const match = path.match(/^\/contest\/([^\/]+)/);
    if (!match) return undefined;
    const contestId = match[1];
    const contest = contests.find((c) => c.id === contestId);
    return contest?.points ?? undefined;
  }, [location.pathname, contests]);
  const [addOpen, setAddOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [change, setChange] = useState<number>(100);

  const maxLen = 15;
  const leaderId = players[0]?.id;
  const lastId = players[players.length - 1]?.id;

  const canAdd = newName.trim().length > 0 && newName.trim().length <= maxLen;

  const handleAdd = () => {
    if (!canAdd) return;
    addPlayer(newName.trim());
    setNewName("");
    setAddOpen(false);
  };

  return (
    <div
      className="glass"
      style={{ width: "100%", overflowX: "auto", padding: 12 }}
    >
      <Space style={{ marginBottom: 8 }}>
        <Button
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => setAddOpen(true)}
        >
          Добавить игрока
        </Button>
        <Tooltip
          title={
            deleteMode ? "Выберите карточку для удаления" : "Удалить игрока"
          }
        >
          <Button
            danger
            icon={<DeleteOutlined />}
            type={deleteMode ? "primary" : "default"}
            onClick={() => setDeleteMode(!deleteMode)}
          >
            Удалить игрока
          </Button>
        </Tooltip>
        <Text>Шаг изменения очков:</Text>
        <InputNumber
          value={change}
          onChange={(v) => setChange(Number(v) || 0)}
          step={50}
          min={-10000}
          max={10000}
        />
      </Space>
      <div
        style={{
          display: "grid",
          gridAutoFlow: "column",
          gap: 12,
          alignItems: "stretch",
          minHeight: 120,
        }}
      >
        <AnimatePresence initial={false}>
          {players.map((p) => {
            const isLeader = p.id === leaderId;
            const isLast = p.id === lastId && players.length > 1;
            return (
              <motion.div
                key={p.id}
                layout
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                style={{ minWidth: 220 }}
              >
                <Card
                  hoverable
                  size="small"
                  onClick={() => {
                    if (deleteMode) {
                      removePlayerById(p.id);
                    } else if (quickPoints && quickPoints !== 0) {
                      adjustScore(p.id, quickPoints);
                    }
                  }}
                  className="glass cardHover"
                  style={{
                    borderColor: isLeader
                      ? "#52c41a"
                      : isLast
                      ? "#ff4d4f"
                      : undefined,
                    boxShadow: isLeader
                      ? "0 0 0 2px rgba(82,196,26,0.3), 0 10px 30px rgba(34,197,94,0.2)"
                      : isLast
                      ? "0 0 0 2px rgba(255,77,79,0.3), 0 10px 30px rgba(239,68,68,0.2)"
                      : undefined,
                    cursor: deleteMode ? "pointer" : "default",
                  }}
                  title={
                    <Space>
                      <Text strong>{p.name}</Text>
                      {deleteMode && (
                        <Text
                          type="danger"
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <ExclamationCircleOutlined /> Нажмите для удаления
                        </Text>
                      )}
                    </Space>
                  }
                >
                  <Flex align="center" gap={8}>
                    <Button
                      icon={<MinusOutlined />}
                      onClick={() => adjustScore(p.id, -Math.abs(change))}
                    />
                    <InputNumber
                      value={change}
                      onChange={(v) => setChange(Number(v) || 0)}
                      step={50}
                      min={-10000}
                      max={10000}
                    />
                    <Button
                      type="primary"
                      icon={<PlusOutlined />}
                      onClick={() => adjustScore(p.id, Math.abs(change))}
                    />
                    <Text style={{ marginLeft: "auto" }} strong>
                      {p.score}
                    </Text>
                  </Flex>
                  {typeof quickPoints === "number" && quickPoints !== 0 && (
                    <div style={{ marginTop: 8 }}>
                      <Text type="success">+{quickPoints}</Text>
                    </div>
                  )}
                </Card>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <Modal
        open={addOpen}
        onCancel={() => setAddOpen(false)}
        onOk={handleAdd}
        okText="Добавить"
        title="Введите имя игрока"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <input
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            maxLength={maxLen}
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid #d9d9d9",
              borderRadius: 6,
            }}
            placeholder="Имя игрока"
          />
          <Text type={newName.length > maxLen ? "danger" : undefined}>
            {newName.length}/{maxLen}
          </Text>
        </Space>
      </Modal>
    </div>
  );
};
