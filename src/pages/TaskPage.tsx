import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Flex,
  Space,
  Typography,
  InputNumber,
  message,
} from "antd";
import { useGameStore } from "../store/game";

const { Title, Text, Paragraph } = Typography;

export const TaskPage = () => {
  const { contestId, taskId } = useParams();
  const navigate = useNavigate();
  const contest = useGameStore((s) =>
    s.contests.find((c) => c.id === contestId)
  );
  const markPlayed = useGameStore((s) => s.markTaskPlayed);
  const reorderPlayersByScore = useGameStore((s) => s.reorderPlayersByScore);

  const [timeSec, setTimeSec] = useState<number>(() => contest?.timeSec ?? 0);
  const [running, setRunning] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const task = contest?.tasks.find((t) => t.id === taskId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [stopIdx, setStopIdx] = useState(0);

  useEffect(() => {
    let timer: any;
    if (running && timeSec > 0) {
      timer = setInterval(() => setTimeSec((s) => (s > 0 ? s - 1 : 0)), 1000);
    }
    return () => clearInterval(timer);
  }, [running, timeSec]);

  useEffect(() => {
    if (!task?.question.music || !audioRef.current) return;
    const stops = task.question.music.stops ?? [];
    const onTime = () => {
      if (!audioRef.current) return;
      const current = audioRef.current.currentTime;
      if (stopIdx < stops.length && current >= stops[stopIdx]) {
        audioRef.current.pause();
        setStopIdx((i) => i + 1);
      }
    };
    const el = audioRef.current;
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, [task, stopIdx]);

  if (!contest || !task)
    return <div style={{ padding: 12 }}>Задание не найдено</div>;

  const q = task.question;
  const a = task.answer;

  const resetTimer = () => {
    setTimeSec(contest.timeSec ?? 60);
    setRunning(false);
  };

  const handleShowAnswer = () => setShowAnswer(true);

  const onBack = () => {
    // Возврат к конкурсам без отметки сыгранности
    navigate(`/`);
  };

  const onTaskDone = () => {
    markPlayed(contest.id, task.id);
    reorderPlayersByScore();
    navigate(`/`);
  };

  return (
    <div className="page-section">
      {/* Заголовок с баллами */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 32,
          gap: "16px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <Title
            level={1}
            style={{ margin: 0, fontSize: "42px", fontWeight: 700 }}
          >
            {contest.title} - {task.order}
          </Title>
          <Text style={{ fontSize: "16px", color: "#B4B4CC" }}>
            {contest.description}
          </Text>
        </div>
        <div
          className="contestCard-points-label"
          style={{
            position: "static",
            margin: 0,
            fontSize: "18px",
            padding: "8px 16px",
            borderRadius: "12px",
          }}
        >
          +{contest.points}
        </div>
      </div>

      {/* Карточка с вопросом */}
      <Card
        className="contestCard taskPageCard"
        title="Вопрос"
        style={{
          marginBottom: 24,
          maxWidth: "800px",
          margin: "0 auto 24px auto",
        }}
        styles={{
          header: {
            backgroundColor: "transparent",
            borderBottom: "1px solid rgba(124, 58, 237, 0.15)",
            color: "#EAEAFF",
            fontSize: "18px",
            fontWeight: 600,
          },
          body: {
            backgroundColor: "transparent",
          },
        }}
      >
        {q.text && (
          <Paragraph
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: "#EAEAFF",
              marginBottom: q.photo || q.music ? 16 : 0,
            }}
          >
            {q.text}
          </Paragraph>
        )}

        {q.photo && (
          <div
            style={{
              textAlign: "center",
              marginBottom: q.music ? 20 : 0,
            }}
          >
            <img
              src={q.photo}
              alt="question"
              style={{
                maxWidth: "100%",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        )}

        {q.music && (
          <div
            className="glass"
            style={{
              padding: "16px",
              borderRadius: "12px",
              backgroundColor: "rgba(124, 58, 237, 0.05)",
            }}
          >
            <audio
              ref={audioRef}
              controls
              src={q.music.link}
              style={{ width: "100%" }}
            />
          </div>
        )}
      </Card>

      {/* Таймер */}
      <Card
        className="contestCard taskPageCard"
        title="Таймер"
        style={{
          marginBottom: 24,
          maxWidth: "600px",
          margin: "0 auto 24px auto",
        }}
        styles={{
          header: {
            backgroundColor: "transparent",
            borderBottom: "1px solid rgba(124, 58, 237, 0.15)",
            color: "#EAEAFF",
            fontSize: "18px",
            fontWeight: 600,
          },
          body: {
            backgroundColor: "transparent",
            textAlign: "center",
          },
        }}
      >
        {/* Большой дисплей таймера */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: running && timeSec <= 10 ? "#ff4d4f" : "#EAEAFF",
            marginBottom: "20px",
            fontFamily: "monospace",
            textShadow:
              running && timeSec <= 10
                ? "0 0 20px rgba(255, 77, 79, 0.5)"
                : "none",
            transition: "all 0.3s ease",
          }}
        >
          {Math.floor(timeSec / 60)}:
          {(timeSec % 60).toString().padStart(2, "0")}
        </div>

        {/* Настройка времени */}
        <div style={{ marginBottom: "20px" }}>
          <InputNumber
            value={timeSec}
            onChange={(v) => setTimeSec(Number(v) || 0)}
            addonAfter="сек"
            min={0}
            max={3600}
            size="large"
            disabled={running}
            style={{ marginRight: "12px" }}
          />
        </div>

        {/* Кнопки управления таймером */}
        <Space size="large">
          {!running ? (
            <Button
              type="primary"
              size="large"
              onClick={() => setRunning(true)}
              disabled={timeSec === 0}
              style={{
                background: "linear-gradient(135deg, #52c41a, #73d13d)",
                borderColor: "#52c41a",
                minWidth: "140px",
              }}
            >
              Старт таймера
            </Button>
          ) : (
            <Button
              size="large"
              onClick={() => setRunning(false)}
              style={{
                background: "linear-gradient(135deg, #faad14, #ffc53d)",
                borderColor: "#faad14",
                color: "#000",
                minWidth: "140px",
              }}
            >
              Пауза
            </Button>
          )}
          <Button
            size="large"
            onClick={resetTimer}
            style={{ minWidth: "140px" }}
          >
            Сбросить
          </Button>
        </Space>
      </Card>

      {/* Карточка с ответом */}
      {showAnswer && a && (
        <Card
          className="contestCard taskPageCard"
          title="Ответ"
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            border: "1px solid rgba(34, 197, 94, 0.3)",
            background:
              "linear-gradient(135deg, rgba(34, 197, 94, 0.08) 0%, rgba(34, 197, 94, 0.05) 100%)",
          }}
          styles={{
            header: {
              backgroundColor: "transparent",
              borderBottom: "1px solid rgba(34, 197, 94, 0.15)",
              color: "#4ADE80",
              fontSize: "18px",
              fontWeight: 600,
            },
            body: {
              backgroundColor: "transparent",
            },
          }}
        >
          {a.text && (
            <Paragraph
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: "#EAEAFF",
                marginBottom: a.photo || a.music ? 16 : 0,
              }}
            >
              {a.text}
            </Paragraph>
          )}

          {a.photo && (
            <div
              style={{
                textAlign: "center",
                marginBottom: a.music ? 20 : 0,
              }}
            >
              <img
                src={a.photo}
                alt="answer"
                style={{
                  maxWidth: "100%",
                  borderRadius: 12,
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                }}
              />
            </div>
          )}

          {a.music && (
            <div
              className="glass"
              style={{
                padding: "16px",
                borderRadius: "12px",
                backgroundColor: "rgba(34, 197, 94, 0.05)",
              }}
            >
              <audio controls src={a.music.link} style={{ width: "100%" }} />
            </div>
          )}
        </Card>
      )}

      {/* Кнопки управления в два ряда */}
      <div style={{ textAlign: "center", marginTop: 32 }}>
        {/* Верхний ряд: основные действия */}
        <div style={{ marginBottom: 16 }}>
          <Space size="large">
            {a && (
              <Button
                type="primary"
                size="large"
                onClick={handleShowAnswer}
                disabled={showAnswer}
                style={{
                  background: showAnswer
                    ? undefined
                    : "linear-gradient(135deg, #722ed1, #9254de)",
                  borderColor: showAnswer ? undefined : "#722ed1",
                  minWidth: "180px",
                  height: "50px",
                  fontSize: "16px",
                }}
              >
                {showAnswer ? "Ответ показан" : "Показать ответ"}
              </Button>
            )}
            <Button
              type="primary"
              size="large"
              onClick={onTaskDone}
              style={{
                background: "linear-gradient(135deg, #52c41a, #73d13d)",
                borderColor: "#52c41a",
                minWidth: "180px",
                height: "50px",
                fontSize: "16px",
              }}
            >
              Задание выполнено
            </Button>
          </Space>
        </div>

        {/* Нижний ряд: навигация */}
        <div>
          <Space size="large">
            <Button
              size="large"
              onClick={() => navigate(`/contest/${contest.id}`)}
              style={{
                minWidth: "180px",
                height: "45px",
                fontSize: "15px",
              }}
            >
              К заданиям
            </Button>
            <Button
              size="large"
              onClick={onBack}
              style={{
                minWidth: "180px",
                height: "45px",
                fontSize: "15px",
              }}
            >
              К конкурсам
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};
