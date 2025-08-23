import { useMemo, useState, useRef, useEffect, useCallback } from "react";
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
  const reorderPlayersByScore = useGameStore((s) => s.reorderPlayersByScore);

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
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  const maxLen = 20;
  const leaderId = players[0]?.id;
  const lastId = players[players.length - 1]?.id;

  const canAdd = newName.trim().length > 0 && newName.trim().length <= maxLen;

  const handleAdd = () => {
    if (!canAdd) return;
    addPlayer(newName.trim());
    setNewName("");
    setAddOpen(false);
  };

  // Debounce функция для пересортировки игроков
  const debouncedReorder = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    debounceTimerRef.current = window.setTimeout(() => {
      reorderPlayersByScore();
    }, 1500);
  }, [reorderPlayersByScore]);

  // Функция изменения счета с debounce пересортировкой
  const handleScoreChange = useCallback(
    (playerId: string, delta: number) => {
      adjustScore(playerId, delta);
      debouncedReorder();
    },
    [adjustScore, debouncedReorder]
  );

  useEffect(() => {
    if (addOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [addOpen]);

  // Очистка таймера при размонтировании
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return (
    <Flex
      className="glass"
      vertical
      gap={8}
      style={{
        width: "100%",
        overflowX: "auto",
        padding: 16,
        borderRadius: 12,
        border: "none",
      }}
    >
      <Flex
        justify="space-between"
        align="flex-end"
        style={{ marginBottom: 8 }}
      >
        <Space>
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
        </Space>
        <Space direction="vertical" size={4} align="center">
          <Text style={{ fontSize: 12, lineHeight: 1 }}>Шаг</Text>
          <InputNumber
            value={change}
            onChange={(v) => setChange(Number(v) || 0)}
            step={50}
            min={-10000}
            max={10000}
            size="small"
          />
        </Space>
      </Flex>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "stretch",
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
                style={{
                  flex: "1 1 220px",
                  minWidth: 220,
                  maxWidth: 300,
                }}
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
                  className="cardHover"
                  style={{
                    background: isLeader
                      ? "linear-gradient(135deg, rgba(82, 196, 26, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%)"
                      : isLast
                      ? "linear-gradient(135deg, rgba(255, 77, 79, 0.15) 0%, rgba(239, 68, 68, 0.1) 100%)"
                      : "linear-gradient(135deg, rgba(124, 58, 237, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
                    border: isLeader
                      ? "1px solid rgba(82, 196, 26, 0.4)"
                      : isLast
                      ? "1px solid rgba(255, 77, 79, 0.4)"
                      : "1px solid rgba(124, 58, 237, 0.3)",
                    borderRadius: 12,
                    boxShadow: isLeader
                      ? "0 0 0 1px rgba(82,196,26,0.2), 0 8px 25px rgba(34,197,94,0.15)"
                      : isLast
                      ? "0 0 0 1px rgba(255,77,79,0.2), 0 8px 25px rgba(239,68,68,0.15)"
                      : "0 0 0 1px rgba(124,58,237,0.2), 0 8px 25px rgba(124,58,237,0.1)",
                    cursor: deleteMode ? "pointer" : "default",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Flex
                    vertical
                    align="center"
                    gap={8}
                    style={{ textAlign: "center" }}
                  >
                    {/* Имя игрока */}
                    <Text strong style={{ fontSize: 16, color: "#EAEAFF" }}>
                      {p.name}
                    </Text>

                    {deleteMode && (
                      <Text
                        type="danger"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 4,
                          fontSize: 12,
                        }}
                      >
                        <ExclamationCircleOutlined /> Нажмите для удаления
                      </Text>
                    )}

                    {/* Баллы крупно */}
                    <Text
                      style={{
                        fontSize: 32,
                        fontWeight: 700,
                        color: "#EAEAFF",
                        lineHeight: 1,
                        margin: "8px 0",
                      }}
                    >
                      {p.score}
                    </Text>

                    {/* Кнопки управления */}
                    <Flex gap={8} align="center" style={{ marginTop: 4 }}>
                      <Button
                        icon={<MinusOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScoreChange(p.id, -Math.abs(change));
                        }}
                        style={{
                          borderRadius: 8,
                          background: "rgba(255, 77, 79, 0.1)",
                          borderColor: "rgba(255, 77, 79, 0.3)",
                          color: "#ff6b6b",
                        }}
                      />
                      {/* Отображение шага изменения между кнопками */}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#EAEAFF",
                          minWidth: 40,
                          textAlign: "center",
                        }}
                      >
                        {change}
                      </Text>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleScoreChange(p.id, Math.abs(change));
                        }}
                        style={{
                          borderRadius: 8,
                          background: "rgba(82, 196, 26, 0.2)",
                          borderColor: "rgba(82, 196, 26, 0.4)",
                          color: "#52c41a",
                        }}
                      />
                    </Flex>

                    {typeof quickPoints === "number" && quickPoints !== 0 && (
                      <Text
                        type="success"
                        style={{ marginTop: 4, fontSize: 12 }}
                      >
                        +{quickPoints}
                      </Text>
                    )}
                  </Flex>
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
        cancelText="Отменить"
        title="Введите имя игрока"
      >
        <Space direction="vertical" style={{ width: "100%" }}>
          <input
            ref={inputRef}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAdd();
            }}
            maxLength={maxLen}
            style={{
              width: "100%",
              padding: 8,
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: 6,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              color: "#EAEAFF",
              fontSize: 14,
              boxSizing: "border-box",
            }}
            placeholder="Имя игрока"
          />
          <Text type={newName.length > maxLen ? "danger" : undefined}>
            {newName.length}/{maxLen}
          </Text>
        </Space>
      </Modal>
    </Flex>
  );
};
