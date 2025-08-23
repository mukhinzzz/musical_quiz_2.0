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
  App,
} from "antd";
import {
  PlusOutlined,
  MinusOutlined,
  UserAddOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  UpOutlined,
  DownOutlined,
  MenuOutlined,
  AppstoreOutlined,
  LeftOutlined,
  RightOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useGameStore } from "../store/game";

const { Text } = Typography;

// Компонент анимированного счетчика
const AnimatedScore = ({
  score,
  isAnimating,
  animationData,
}: {
  score: number;
  isAnimating: boolean;
  animationData?: { from: number; to: number };
}) => {
  const [displayScore, setDisplayScore] = useState(score);

  useEffect(() => {
    if (isAnimating && animationData) {
      const { from, to } = animationData;
      const diff = to - from;
      const duration = 300;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Эффект быстрой смены цифр
        if (progress < 0.8) {
          const randomOffset =
            Math.floor(Math.random() * Math.abs(diff) * 2) - Math.abs(diff);
          setDisplayScore(from + randomOffset);
        } else {
          // В конце показываем правильное значение
          const currentScore = from + diff * progress;
          setDisplayScore(Math.round(currentScore));
        }

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDisplayScore(to);
        }
      };

      animate();
    } else {
      setDisplayScore(score);
    }
  }, [score, isAnimating, animationData]);

  return <>{displayScore}</>;
};

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
  const playersBarCollapsed = useGameStore((s) => s.playersBarCollapsed);
  const playersBarVertical = useGameStore((s) => s.playersBarVertical);
  const setPlayersBarCollapsed = useGameStore((s) => s.setPlayersBarCollapsed);
  const setPlayersBarVertical = useGameStore((s) => s.setPlayersBarVertical);
  const resetGameState = useGameStore((s) => s.resetGameState);

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
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [clickedCard, setClickedCard] = useState<string | null>(null);
  const [animatingScores, setAnimatingScores] = useState<
    Record<string, { from: number; to: number }>
  >({});
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceTimerRef = useRef<number | null>(null);

  // Используем хук для модальных окон
  const { modal } = App.useApp();

  // Функция для сброса состояния игры
  const handleResetGame = useCallback(() => {
    console.log("handleResetGame вызвана"); // Отладка

    modal.confirm({
      title: "Новый квиз",
      content:
        "Вы уверены, что хотите начать новый квиз? Все данные текущей игры будут удалены.",
      okText: "Да, начать новый квиз",
      cancelText: "Отмена",
      okType: "danger",
      centered: true,
      onOk: () => {
        console.log("Подтверждение нажато, сбрасываем состояние"); // Отладка
        resetGameState();
      },
      onCancel: () => {
        console.log("Отмена нажата"); // Отладка
      },
    });
  }, [resetGameState, modal]);

  const maxLen = 20;

  // Определяем лидеров и аутсайдеров по счету
  const scores = players.map((p) => p.score);
  const maxScore = Math.max(...scores);
  const minScore = Math.min(...scores);
  const allScoresEqual = maxScore === minScore;

  const leaderIds = allScoresEqual
    ? []
    : players.filter((p) => p.score === maxScore).map((p) => p.id);
  const lastIds = allScoresEqual
    ? []
    : players.filter((p) => p.score === minScore).map((p) => p.id);

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

  // Функция изменения счета с debounce пересортировкой и анимацией
  const handleScoreChange = useCallback(
    (playerId: string, delta: number) => {
      // Найдем текущий счет игрока
      const player = players.find((p) => p.id === playerId);
      if (player) {
        const fromScore = player.score;
        const toScore = player.score + delta;

        // Запускаем анимацию счетчика
        setAnimatingScores((prev) => ({
          ...prev,
          [playerId]: { from: fromScore, to: toScore },
        }));

        // Убираем анимацию через время
        setTimeout(() => {
          setAnimatingScores((prev) => {
            const newState = { ...prev };
            delete newState[playerId];
            return newState;
          });
        }, 300);
      }

      adjustScore(playerId, delta);
      debouncedReorder();
    },
    [adjustScore, debouncedReorder, players]
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
        width: playersBarVertical ? (playersBarCollapsed ? 40 : 280) : "100%",
        height: playersBarVertical ? "auto" : "auto",
        maxHeight: playersBarVertical ? "100vh" : "none",
        overflowX: playersBarVertical ? "visible" : "auto",
        overflowY: playersBarVertical ? "auto" : "visible",
        padding: playersBarVertical ? (playersBarCollapsed ? 8 : 12) : 16,
        borderRadius: playersBarVertical ? 12 : 12,
        border: "none",
        transition: "all 0.3s ease",
      }}
    >
      {/* Заголовок с кнопками управления */}
      <Flex
        justify={
          playersBarCollapsed && playersBarVertical ? "center" : "space-between"
        }
        align="flex-start"
        style={{ marginBottom: playersBarCollapsed ? 0 : 8 }}
      >
        <Flex gap={4} vertical={!playersBarCollapsed && !playersBarVertical}>
          {/* Кнопки управления - всегда горизонтально */}
          <Flex gap={4}>
            {/* Кнопка сворачивания/разворачивания */}
            <Tooltip title={playersBarCollapsed ? "Развернуть" : "Свернуть"}>
              <Button
                size="small"
                icon={
                  playersBarCollapsed ? (
                    playersBarVertical ? (
                      <RightOutlined />
                    ) : (
                      <UpOutlined />
                    )
                  ) : playersBarVertical ? (
                    <LeftOutlined />
                  ) : (
                    <DownOutlined />
                  )
                }
                onClick={() => setPlayersBarCollapsed(!playersBarCollapsed)}
              />
            </Tooltip>

            {/* Кнопка переключения режима */}
            {!playersBarCollapsed && (
              <Tooltip
                title={
                  playersBarVertical
                    ? "Горизонтальный режим"
                    : "Вертикальный режим"
                }
              >
                <Button
                  size="small"
                  icon={
                    playersBarVertical ? <AppstoreOutlined /> : <MenuOutlined />
                  }
                  onClick={() => setPlayersBarVertical(!playersBarVertical)}
                />
              </Tooltip>
            )}
          </Flex>

          {/* Инпут шага для горизонтального режима - под кнопками */}
          {!playersBarCollapsed && !playersBarVertical && (
            <div style={{ textAlign: "left", marginTop: 4 }}>
              <Text
                style={{
                  fontSize: 12,
                  lineHeight: 1,
                  color: "rgba(234, 234, 255, 0.7)",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Шаг
              </Text>
              <InputNumber
                value={change}
                onChange={(v) => setChange(Number(v) || 0)}
                step={50}
                min={-10000}
                max={10000}
                size="small"
                style={{
                  width: 80,
                  fontSize: 12,
                }}
              />
            </div>
          )}
        </Flex>

        {/* Элементы управления для горизонтального режима */}
        {!playersBarCollapsed && !playersBarVertical && (
          <Space direction="horizontal" size={8}>
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
            <Tooltip title="Начать новый квиз (сбросить все данные)">
              <Button
                icon={<ReloadOutlined />}
                onClick={() => {
                  console.log("Кнопка 'Новый квиз' нажата"); // Отладка
                  handleResetGame();
                }}
              >
                Новый квиз
              </Button>
            </Tooltip>
          </Space>
        )}

        {/* Инпут шага для вертикального режима - перемещаем на место заголовка */}
        {!playersBarCollapsed && playersBarVertical && (
          <div style={{ textAlign: "center" }}>
            <Text
              style={{
                fontSize: 11,
                lineHeight: 1,
                color: "rgba(234, 234, 255, 0.7)",
                display: "block",
                marginBottom: 4,
              }}
            >
              Шаг
            </Text>
            <InputNumber
              value={change}
              onChange={(v) => setChange(Number(v) || 0)}
              step={50}
              min={-10000}
              max={10000}
              size="small"
              style={{
                width: 70,
                fontSize: 12,
              }}
            />
          </div>
        )}
      </Flex>

      {/* Кнопки управления для вертикального режима */}
      {!playersBarCollapsed && playersBarVertical && (
        <Flex
          justify="center"
          align="center"
          style={{ marginBottom: 8, gap: 4 }}
        >
          <Space direction="horizontal" size={4}>
            <Button
              type="primary"
              icon={<UserAddOutlined />}
              onClick={() => setAddOpen(true)}
              size="small"
              style={{ fontSize: 11, height: 28, minWidth: 80 }}
            >
              Добавить
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
                size="small"
                style={{ fontSize: 11, height: 28, minWidth: 80 }}
              >
                Удалить
              </Button>
            </Tooltip>
          </Space>
        </Flex>
      )}
      {/* Карточки игроков - показываем только если не свернуто */}
      {!playersBarCollapsed && (
        <div
          style={{
            display: "flex",
            flexDirection: playersBarVertical ? "column" : "row",
            flexWrap: playersBarVertical ? "nowrap" : "wrap",
            gap: playersBarVertical ? 6 : 12,
            alignItems: "stretch",
            flex: 1,
            overflowY: playersBarVertical ? "auto" : "visible",
          }}
        >
          <AnimatePresence initial={false}>
            {players.map((p) => {
              const isLeader = leaderIds.includes(p.id);
              const isLast = lastIds.includes(p.id) && players.length > 1;
              return (
                <motion.div
                  key={p.id}
                  layout
                  transition={{ type: "spring", stiffness: 500, damping: 40 }}
                  style={{
                    flex: playersBarVertical ? "none" : "1 1 220px",
                    minWidth: playersBarVertical ? "auto" : 220,
                    maxWidth: playersBarVertical ? "none" : 300,
                    width: playersBarVertical ? "100%" : "auto",
                  }}
                >
                  {playersBarVertical ? (
                    // Компактная карточка для вертикального режима
                    <Card
                      hoverable
                      size="small"
                      onClick={() => {
                        setClickedCard(p.id);
                        setTimeout(() => setClickedCard(null), 150);

                        if (deleteMode) {
                          removePlayerById(p.id);
                        } else if (quickPoints && quickPoints !== 0) {
                          handleScoreChange(p.id, quickPoints);
                        }
                      }}
                      onMouseEnter={() => setHoveredCard(p.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                      className=""
                      style={{
                        background: isLeader
                          ? "linear-gradient(90deg, rgba(82, 196, 26, 0.15) 0%, rgba(34, 197, 94, 0.1) 100%)"
                          : isLast
                          ? "linear-gradient(90deg, rgba(255, 77, 79, 0.15) 0%, rgba(239, 68, 68, 0.1) 100%)"
                          : "linear-gradient(90deg, rgba(124, 58, 237, 0.15) 0%, rgba(99, 102, 241, 0.1) 100%)",
                        border: isLeader
                          ? "1px solid rgba(82, 196, 26, 0.4)"
                          : isLast
                          ? "1px solid rgba(255, 77, 79, 0.4)"
                          : "1px solid rgba(124, 58, 237, 0.3)",
                        borderRadius: 8,
                        boxShadow: isLeader
                          ? "0 0 0 1px rgba(82,196,26,0.2), 0 4px 12px rgba(34,197,94,0.1)"
                          : isLast
                          ? "0 0 0 1px rgba(255,77,79,0.2), 0 4px 12px rgba(239,68,68,0.1)"
                          : "0 0 0 1px rgba(124,58,237,0.2), 0 4px 12px rgba(124,58,237,0.1)",
                        cursor: deleteMode
                          ? "pointer"
                          : quickPoints && quickPoints !== 0
                          ? "pointer"
                          : "default",
                        backdropFilter: "blur(10px)",
                        padding: "6px",
                        position: "relative",
                        overflow: "visible",
                        transform:
                          clickedCard === p.id ? "scale(0.95)" : "scale(1)",
                        transition: "transform 0.15s ease",
                      }}
                    >
                      <Flex align="center" gap={8}>
                        {/* Левая часть: Имя */}
                        <Text
                          strong
                          style={{
                            fontSize: 13,
                            color: "#EAEAFF",
                            flex: 1,
                            lineHeight: 1.2,
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                          }}
                        >
                          {p.name}
                        </Text>

                        {/* Центральная часть: Счет */}
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 700,
                            color: "#EAEAFF",
                            lineHeight: 1,
                            minWidth: 40,
                            textAlign: "center",
                          }}
                        >
                          <AnimatedScore
                            score={p.score}
                            isAnimating={!!animatingScores[p.id]}
                            animationData={animatingScores[p.id]}
                          />
                        </Text>

                        {/* Правая часть: Кнопки */}
                        <Flex gap={2} align="center">
                          <Button
                            size="small"
                            icon={<MinusOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScoreChange(p.id, -Math.abs(change));
                            }}
                            style={{
                              borderRadius: 4,
                              background: "rgba(255, 77, 79, 0.1)",
                              borderColor: "rgba(255, 77, 79, 0.3)",
                              color: "#ff6b6b",
                              minWidth: "auto",
                              width: 24,
                              height: 24,
                              padding: 0,
                              fontSize: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                          <Button
                            size="small"
                            icon={<PlusOutlined />}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleScoreChange(p.id, Math.abs(change));
                            }}
                            style={{
                              borderRadius: 4,
                              background: "rgba(82, 196, 26, 0.2)",
                              borderColor: "rgba(82, 196, 26, 0.4)",
                              color: "#52c41a",
                              minWidth: "auto",
                              width: 24,
                              height: 24,
                              padding: 0,
                              fontSize: 10,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          />
                        </Flex>
                      </Flex>

                      {deleteMode && (
                        <Text
                          type="danger"
                          style={{
                            fontSize: 10,
                            textAlign: "center",
                            marginTop: 4,
                          }}
                        >
                          <ExclamationCircleOutlined /> Удалить
                        </Text>
                      )}

                      {/* Анимированный лейбл quick points в левом верхнем углу */}
                      {typeof quickPoints === "number" &&
                        quickPoints !== 0 &&
                        hoveredCard === p.id && (
                          <div
                            style={{
                              position: "absolute",
                              top: 4,
                              left: 4,
                              background:
                                "linear-gradient(135deg, #52c41a, #73d13d)",
                              color: "white",
                              fontSize: 10,
                              fontWeight: 600,
                              padding: "0px 3px",
                              borderRadius: 6,
                              boxShadow: "0 2px 8px rgba(82, 196, 26, 0.3)",
                              zIndex: 10,
                              animation: "quickPointsSlide 0.2s ease-out",
                              border: "1px solid rgba(255, 255, 255, 0.2)",
                            }}
                          >
                            +{quickPoints}
                          </div>
                        )}
                    </Card>
                  ) : (
                    // Обычная карточка для горизонтального режима
                    <Card
                      hoverable
                      size="small"
                      onClick={() => {
                        setClickedCard(p.id);
                        setTimeout(() => setClickedCard(null), 150);

                        if (deleteMode) {
                          removePlayerById(p.id);
                        } else if (quickPoints && quickPoints !== 0) {
                          handleScoreChange(p.id, quickPoints);
                        }
                      }}
                      onMouseEnter={() => setHoveredCard(p.id)}
                      onMouseLeave={() => setHoveredCard(null)}
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
                        cursor: deleteMode
                          ? "pointer"
                          : quickPoints && quickPoints !== 0
                          ? "pointer"
                          : "default",
                        backdropFilter: "blur(10px)",
                        position: "relative",
                        overflow: "visible",
                        transform:
                          clickedCard === p.id ? "scale(0.95)" : "scale(1)",
                        transition: "transform 0.15s ease",
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
                          <AnimatedScore
                            score={p.score}
                            isAnimating={!!animatingScores[p.id]}
                            animationData={animatingScores[p.id]}
                          />
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

                        {/* Анимированный лейбл quick points в левом верхнем углу */}
                        {typeof quickPoints === "number" &&
                          quickPoints !== 0 &&
                          hoveredCard === p.id && (
                            <div
                              style={{
                                position: "absolute",
                                top: 8,
                                left: 8,
                                background:
                                  "linear-gradient(135deg, #52c41a, #73d13d)",
                                color: "white",
                                fontSize: 11,
                                fontWeight: 600,
                                padding: "1px 4px",
                                borderRadius: 8,
                                boxShadow: "0 4px 12px rgba(82, 196, 26, 0.3)",
                                zIndex: 10,
                                animation: "quickPointsSlide 0.2s ease-out",
                                border: "1px solid rgba(255, 255, 255, 0.2)",
                              }}
                            >
                              +{quickPoints}
                            </div>
                          )}
                      </Flex>
                    </Card>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}

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
