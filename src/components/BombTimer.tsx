import { useEffect, useRef, useState } from "react";
import { Button, Card, Space } from "antd";
import {
  CloseOutlined,
  PlayCircleOutlined,
  PauseCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useGameStore } from "../store/game";

// Импортируем звуки
import tickSound from "../assets/tickSound.mp3";
import boomSound from "../assets/boomSound.mp3";

export const BombTimer = () => {
  const bombTimerVisible = useGameStore((s) => s.bombTimerVisible);
  const bombTimerSeconds = useGameStore((s) => s.bombTimerSeconds);
  const bombTimerRunning = useGameStore((s) => s.bombTimerRunning);
  const bombTimerTargetSeconds = useGameStore((s) => s.bombTimerTargetSeconds);
  const bombTimerExploded = useGameStore((s) => s.bombTimerExploded);
  const setBombTimerVisible = useGameStore((s) => s.setBombTimerVisible);
  const setBombTimerSeconds = useGameStore((s) => s.setBombTimerSeconds);
  const setBombTimerExploded = useGameStore((s) => s.setBombTimerExploded);
  const startBombTimer = useGameStore((s) => s.startBombTimer);
  const pauseBombTimer = useGameStore((s) => s.pauseBombTimer);
  const resetBombTimer = useGameStore((s) => s.resetBombTimer);

  const [position, setPosition] = useState(() => ({
    x: window.innerWidth - 290,
    y: window.innerHeight - 230,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef<HTMLDivElement>(null);
  const tickAudioRef = useRef<HTMLAudioElement | null>(null);
  const boomAudioRef = useRef<HTMLAudioElement | null>(null);

  // Создаем аудио элементы
  useEffect(() => {
    tickAudioRef.current = new Audio(tickSound);
    tickAudioRef.current.loop = true;
    boomAudioRef.current = new Audio(boomSound);

    return () => {
      if (tickAudioRef.current) {
        tickAudioRef.current.pause();
        tickAudioRef.current = null;
      }
      if (boomAudioRef.current) {
        boomAudioRef.current.pause();
        boomAudioRef.current = null;
      }
    };
  }, []);

  // Управление звуком тиканья
  useEffect(() => {
    if (bombTimerRunning && !bombTimerExploded && tickAudioRef.current) {
      tickAudioRef.current.play().catch((err) => {
        console.log("Ошибка воспроизведения звука тиканья:", err);
      });
    } else if (tickAudioRef.current) {
      tickAudioRef.current.pause();
      tickAudioRef.current.currentTime = 0;
    }
  }, [bombTimerRunning, bombTimerExploded]);

  // Таймер
  useEffect(() => {
    let timer: any;
    if (bombTimerRunning && !bombTimerExploded) {
      timer = setInterval(() => {
        const newSeconds = bombTimerSeconds + 1;
        setBombTimerSeconds(newSeconds);

        // Проверяем, достигли ли целевого времени
        if (newSeconds >= bombTimerTargetSeconds) {
          // Бомба взорвалась!
          setBombTimerExploded(true);
          pauseBombTimer();

          // Останавливаем звук тиканья и воспроизводим взрыв
          if (tickAudioRef.current) {
            tickAudioRef.current.pause();
            tickAudioRef.current.currentTime = 0;
          }
          if (boomAudioRef.current) {
            boomAudioRef.current.play().catch((err) => {
              console.log("Ошибка воспроизведения звука взрыва:", err);
            });
          }
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [
    bombTimerRunning,
    bombTimerSeconds,
    bombTimerTargetSeconds,
    bombTimerExploded,
    setBombTimerSeconds,
    setBombTimerExploded,
    pauseBombTimer,
  ]);

  // Обработка изменения размера окна
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.min(prev.x, window.innerWidth - 290),
        y: Math.min(prev.y, window.innerHeight - 230),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Обработка перетаскивания
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!timerRef.current) return;
    const rect = timerRef.current.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;

      setPosition({
        x: Math.max(10, Math.min(newX, window.innerWidth - 290)),
        y: Math.max(10, Math.min(newY, window.innerHeight - 230)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  if (!bombTimerVisible) return null;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div
      ref={timerRef}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1000,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
      }}
    >
      <Card
        className="contestCard"
        size="small"
        style={{
          minWidth: "280px",
          boxShadow: bombTimerExploded
            ? "0 8px 32px rgba(255, 77, 79, 0.6)"
            : "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: bombTimerExploded
            ? "2px solid rgba(255, 77, 79, 0.8)"
            : "1px solid rgba(234, 88, 12, 0.5)",
          animation: bombTimerExploded ? "explode 0.5s ease-out" : "none",
        }}
        styles={{
          header: {
            backgroundColor: "transparent",
            borderBottom: bombTimerExploded
              ? "1px solid rgba(255, 77, 79, 0.3)"
              : "1px solid rgba(234, 88, 12, 0.2)",
            color: bombTimerExploded ? "#ff4d4f" : "#fb923c",
            fontSize: "14px",
            fontWeight: 600,
            padding: "8px 12px",
            cursor: "grab",
          },
          body: {
            backgroundColor: "transparent",
            padding: "12px",
            textAlign: "center",
          },
        }}
        title={
          <div
            onMouseDown={handleMouseDown}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>{bombTimerExploded ? "💥 ВЗРЫВ! 💥" : "💣 Бомба"}</span>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setBombTimerVisible(false);
                // Останавливаем все звуки при закрытии
                if (tickAudioRef.current) {
                  tickAudioRef.current.pause();
                  tickAudioRef.current.currentTime = 0;
                }
                if (boomAudioRef.current) {
                  boomAudioRef.current.pause();
                  boomAudioRef.current.currentTime = 0;
                }
              }}
              style={{
                color: bombTimerExploded ? "#ff4d4f" : "#fb923c",
                border: "none",
                padding: 0,
                minWidth: "auto",
                height: "auto",
              }}
            />
          </div>
        }
      >
        {/* Большой дисплей таймера */}
        <div
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: bombTimerExploded ? "#ff4d4f" : "#fb923c",
            marginBottom: "12px",
            fontFamily: "monospace",
            textShadow: bombTimerExploded
              ? "0 0 20px rgba(255, 77, 79, 0.8)"
              : bombTimerRunning
              ? "0 0 10px rgba(251, 146, 60, 0.5)"
              : "none",
            transition: "all 0.3s ease",
          }}
        >
          {formatTime(bombTimerSeconds)}
        </div>

        {bombTimerExploded && (
          <div
            style={{
              fontSize: "18px",
              fontWeight: 600,
              color: "#ff4d4f",
              marginBottom: "16px",
              animation: "pulse 1s ease-in-out infinite",
            }}
          >
            БОМБА ВЗОРВАЛАСЬ!
          </div>
        )}

        {/* Кнопки управления */}
        <Space size="small" direction="vertical" style={{ width: "100%" }}>
          {!bombTimerRunning && !bombTimerExploded && bombTimerSeconds === 0 && (
            <Button
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
              onClick={startBombTimer}
              style={{
                background: "linear-gradient(135deg, #ea580c, #fb923c)",
                borderColor: "#ea580c",
                width: "100%",
              }}
            >
              Завести бомбу
            </Button>
          )}

          {bombTimerRunning && !bombTimerExploded && (
            <Button
              size="small"
              icon={<PauseCircleOutlined />}
              onClick={pauseBombTimer}
              style={{
                background: "linear-gradient(135deg, #faad14, #ffc53d)",
                borderColor: "#faad14",
                color: "#000",
                width: "100%",
              }}
            >
              Пауза
            </Button>
          )}

          {!bombTimerRunning && bombTimerSeconds > 0 && !bombTimerExploded && (
            <Button
              type="primary"
              size="small"
              icon={<PlayCircleOutlined />}
              onClick={() => useGameStore.setState({ bombTimerRunning: true })}
              style={{
                background: "linear-gradient(135deg, #ea580c, #fb923c)",
                borderColor: "#ea580c",
                width: "100%",
              }}
            >
              Продолжить
            </Button>
          )}

          {(bombTimerSeconds > 0 || bombTimerExploded) && (
            <Button
              size="small"
              icon={<ReloadOutlined />}
              onClick={() => {
                resetBombTimer();
                // Останавливаем все звуки при сбросе
                if (tickAudioRef.current) {
                  tickAudioRef.current.pause();
                  tickAudioRef.current.currentTime = 0;
                }
                if (boomAudioRef.current) {
                  boomAudioRef.current.pause();
                  boomAudioRef.current.currentTime = 0;
                }
              }}
              style={{
                width: "100%",
              }}
            >
              Сбросить
            </Button>
          )}
        </Space>
      </Card>

      {/* CSS анимации */}
      <style>{`
        @keyframes explode {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};
