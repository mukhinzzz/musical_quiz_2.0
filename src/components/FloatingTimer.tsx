import { useEffect, useRef, useState } from "react";
import { Button, Card, InputNumber, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useGameStore } from "../store/game";

export const FloatingTimer = () => {
  const timerVisible = useGameStore((s) => s.timerVisible);
  const timerSeconds = useGameStore((s) => s.timerSeconds);
  const timerRunning = useGameStore((s) => s.timerRunning);
  const setTimerVisible = useGameStore((s) => s.setTimerVisible);
  const setTimerSeconds = useGameStore((s) => s.setTimerSeconds);
  const setTimerRunning = useGameStore((s) => s.setTimerRunning);
  const resetTimer = useGameStore((s) => s.resetTimer);

  const [position, setPosition] = useState(() => ({
    x: window.innerWidth - 290, // 280px ширина + 10px отступ
    y: window.innerHeight - 230, // примерная высота таймера + 30px отступ
  }));
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const timerRef = useRef<HTMLDivElement>(null);

  // Таймер
  useEffect(() => {
    let timer: any;
    if (timerRunning && timerSeconds > 0) {
      timer = setInterval(() => {
        setTimerSeconds(timerSeconds - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [timerRunning, timerSeconds, setTimerSeconds]);

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

      // Ограничиваем позицию границами экрана
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

  if (!timerVisible) return null;

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
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(124, 58, 237, 0.4)",
        }}
        styles={{
          header: {
            backgroundColor: "transparent",
            borderBottom: "1px solid rgba(124, 58, 237, 0.15)",
            color: "#EAEAFF",
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
            <span>Таймер</span>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                setTimerVisible(false);
              }}
              style={{
                color: "#EAEAFF",
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
            fontSize: "36px",
            fontWeight: 700,
            color: timerRunning && timerSeconds <= 10 ? "#ff4d4f" : "#EAEAFF",
            marginBottom: "12px",
            fontFamily: "monospace",
            textShadow:
              timerRunning && timerSeconds <= 10
                ? "0 0 15px rgba(255, 77, 79, 0.5)"
                : "none",
            transition: "all 0.3s ease",
          }}
        >
          {Math.floor(timerSeconds / 60)}:
          {(timerSeconds % 60).toString().padStart(2, "0")}
        </div>

        {/* Настройка времени */}
        <div style={{ marginBottom: "12px" }}>
          <InputNumber
            value={timerSeconds}
            onChange={(v) => setTimerSeconds(Number(v) || 0)}
            addonAfter="сек"
            min={0}
            max={3600}
            size="small"
            disabled={timerRunning}
            style={{ width: "120px" }}
          />
        </div>

        {/* Кнопки управления */}
        <Space size="small">
          {!timerRunning ? (
            <Button
              type="primary"
              size="small"
              onClick={() => setTimerRunning(true)}
              disabled={timerSeconds === 0}
              style={{
                background: "linear-gradient(135deg, #52c41a, #73d13d)",
                borderColor: "#52c41a",
                minWidth: "60px",
              }}
            >
              Старт
            </Button>
          ) : (
            <Button
              size="small"
              onClick={() => setTimerRunning(false)}
              style={{
                background: "linear-gradient(135deg, #faad14, #ffc53d)",
                borderColor: "#faad14",
                color: "#000",
                minWidth: "60px",
              }}
            >
              Пауза
            </Button>
          )}
          <Button
            size="small"
            onClick={resetTimer}
            style={{ minWidth: "60px" }}
          >
            Сброс
          </Button>
        </Space>
      </Card>
    </div>
  );
};
