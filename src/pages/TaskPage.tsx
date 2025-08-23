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
    // При выходе отметим карточку как сыгранную
    markPlayed(contest.id, task.id);
    navigate(`/`);
  };

  return (
    <div style={{ padding: 12 }}>
      <Space style={{ marginBottom: 12 }}>
        <Button onClick={() => navigate(`/contest/${contest.id}`)}>
          К заданиям
        </Button>
        <Button onClick={onBack} type="primary">
          К конкурсам
        </Button>
      </Space>
      <Title level={3} style={{ marginTop: 0 }}>
        {contest.title}
      </Title>
      <Text>{contest.description}</Text>
      <div style={{ marginTop: 8 }}>
        <Text strong>Цена: {contest.points} баллов</Text>
      </div>

      <div style={{ marginTop: 16 }}>
        {q.text && <Paragraph style={{ fontSize: 16 }}>{q.text}</Paragraph>}
        {q.photo && (
          <div style={{ margin: "12px 0" }}>
            <img
              src={q.photo}
              alt="question"
              style={{ maxWidth: "100%", borderRadius: 8 }}
            />
          </div>
        )}
        {q.music && (
          <Card size="small" style={{ maxWidth: 720 }}>
            <audio
              ref={audioRef}
              controls
              src={q.music.link}
              style={{ width: "100%" }}
            />
          </Card>
        )}
      </div>

      <Space style={{ marginTop: 16 }}>
        <InputNumber
          value={timeSec}
          onChange={(v) => setTimeSec(Number(v) || 0)}
          addonAfter="сек"
          min={0}
          max={3600}
        />
        {!running ? (
          <Button type="primary" onClick={() => setRunning(true)}>
            Старт таймера
          </Button>
        ) : (
          <Button onClick={() => setRunning(false)}>
            Приостановить таймер
          </Button>
        )}
        <Button onClick={resetTimer}>Сбросить таймер</Button>
        {a && <Button onClick={handleShowAnswer}>Показать ответ</Button>}
      </Space>

      {showAnswer && a && (
        <Card style={{ marginTop: 16 }} title="Ответ">
          {a.text && <Paragraph style={{ fontSize: 16 }}>{a.text}</Paragraph>}
          {a.photo && (
            <div style={{ margin: "12px 0" }}>
              <img
                src={a.photo}
                alt="answer"
                style={{ maxWidth: "100%", borderRadius: 8 }}
              />
            </div>
          )}
          {a.music && (
            <Card size="small" style={{ maxWidth: 720 }}>
              <audio controls src={a.music.link} style={{ width: "100%" }} />
            </Card>
          )}
        </Card>
      )}
    </div>
  );
};
