import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Space, Typography } from "antd";
import {
  ClockCircleOutlined,
  PlayCircleOutlined,
  FireOutlined,
} from "@ant-design/icons";
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
  const initTimer = useGameStore((s) => s.initTimer);
  const timerVisible = useGameStore((s) => s.timerVisible);
  const setTimerVisible = useGameStore((s) => s.setTimerVisible);
  const bombTimerVisible = useGameStore((s) => s.bombTimerVisible);
  const setBombTimerVisible = useGameStore((s) => s.setBombTimerVisible);
  const startBombTimer = useGameStore((s) => s.startBombTimer);

  const [showAnswer, setShowAnswer] = useState(false);
  const [isPlayingFragment, setIsPlayingFragment] = useState(false);

  const task = contest?.tasks.find((t) => t.id === taskId);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const lastStopTimeRef = useRef<number>(-1);
  const fragmentTimeoutRef = useRef<number | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Функция для озвучивания текста
  const speakText = (text: string) => {
    // Останавливаем предыдущую озвучку, если она есть
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "ru-RU";
    utterance.rate = 0.9; // Немного медленнее для четкости
    utterance.pitch = 1;

    // Пытаемся найти голос Максим (приоритет)
    const voices = window.speechSynthesis.getVoices();

    // Приоритет 1: Максим (мем про кожаных ублюдков)
    let selectedVoice = voices.find(
      (voice) =>
        voice.name.toLowerCase().includes("maxim") ||
        voice.name.toLowerCase().includes("maksim") ||
        voice.name.toLowerCase().includes("максим")
    );

    // Приоритет 2: Другие мужские русские голоса
    if (!selectedVoice) {
      selectedVoice = voices.find(
        (voice) =>
          voice.lang.startsWith("ru") &&
          (voice.name.toLowerCase().includes("male") ||
            voice.name.toLowerCase().includes("мужской") ||
            voice.name.toLowerCase().includes("yuri") ||
            voice.name.toLowerCase().includes("pavel"))
      );
    }

    // Приоритет 3: Любой русский голос
    if (!selectedVoice) {
      selectedVoice = voices.find((voice) => voice.lang.startsWith("ru"));
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice;
      console.log("Выбран голос:", selectedVoice.name);
    }

    speechSynthesisRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Функция для остановки озвучивания
  const stopSpeaking = () => {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
  };

  // Инициализация таймера при открытии задания
  useEffect(() => {
    if (contest?.timeSec) {
      initTimer(contest.timeSec);
    }
  }, [contest?.timeSec, initTimer]);

  // Автоматическое озвучивание вопроса при открытии
  useEffect(() => {
    if (task?.question.text) {
      // Небольшая задержка для загрузки голосов
      const timer = setTimeout(() => {
        // Убеждаемся, что голоса загружены
        if (window.speechSynthesis.getVoices().length === 0) {
          window.speechSynthesis.onvoiceschanged = () => {
            speakText(task.question.text!);
          };
        } else {
          speakText(task.question.text!);
        }
      }, 300);

      return () => {
        clearTimeout(timer);
        stopSpeaking();
      };
    }
  }, [task?.id]); // Запускаем при изменении задания

  // Управление воспроизведением с помощью пробела
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Проверяем, что нажат пробел и нет активного поля ввода
      if (
        event.code === "Space" &&
        event.target === document.body &&
        audioRef.current &&
        task?.question.music
      ) {
        event.preventDefault(); // Предотвращаем скролл страницы

        if (audioRef.current.paused) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    return () => document.removeEventListener("keydown", handleKeyPress);
  }, [task?.question.music]);

  useEffect(() => {
    if (!task?.question.music || !audioRef.current) return;
    const stops = task.question.music.stops ?? [];

    const onTime = () => {
      if (!audioRef.current) return;
      const current = audioRef.current.currentTime;

      // Сбросить последний стоп если перемотали назад
      if (current < lastStopTimeRef.current) {
        lastStopTimeRef.current = -1;
      }

      // Найти ближайший стоп, который мы достигли, но еще не обработали
      const reachedStops = stops.filter(
        (stop) => current >= stop && stop > lastStopTimeRef.current
      );

      if (reachedStops.length > 0) {
        // Берем минимальный из достигнутых стопов
        const nextStop = Math.min(...reachedStops);
        audioRef.current.pause();
        lastStopTimeRef.current = nextStop;
      }
    };

    const el = audioRef.current;
    el.addEventListener("timeupdate", onTime);
    return () => el.removeEventListener("timeupdate", onTime);
  }, [task]);

  if (!contest || !task)
    return <div style={{ padding: 12 }}>Задание не найдено</div>;

  const q = task.question;
  const a = task.answer;

  const handleShowAnswer = () => setShowAnswer(true);

  // Функция для воспроизведения отрывка
  const playFragment = () => {
    if (!audioRef.current || !task?.question.music) return;

    const music = task.question.music;
    const startTime = music.startTime ?? 0;
    const endTime = music.endTime;

    // Очищаем предыдущий таймаут если он есть
    if (fragmentTimeoutRef.current) {
      clearTimeout(fragmentTimeoutRef.current);
    }

    // Устанавливаем время начала
    audioRef.current.currentTime = startTime;
    audioRef.current.play();
    setIsPlayingFragment(true);

    // Если есть endTime, устанавливаем таймаут для остановки
    if (endTime && endTime > startTime) {
      const duration = (endTime - startTime) * 1000; // переводим в миллисекунды
      fragmentTimeoutRef.current = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlayingFragment(false);
        }
      }, duration);
    }
  };

  // Обработчик событий аудио для отслеживания окончания воспроизведения
  useEffect(() => {
    if (!audioRef.current) return;

    const handlePause = () => {
      setIsPlayingFragment(false);
      if (fragmentTimeoutRef.current) {
        clearTimeout(fragmentTimeoutRef.current);
      }
    };

    const handleEnded = () => {
      setIsPlayingFragment(false);
      if (fragmentTimeoutRef.current) {
        clearTimeout(fragmentTimeoutRef.current);
      }
    };

    const audio = audioRef.current;
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
      if (fragmentTimeoutRef.current) {
        clearTimeout(fragmentTimeoutRef.current);
      }
    };
  }, [task]);

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
      {/* Заголовок с лейблом баллов */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
          gap: "12px",
        }}
      >
        <Title
          level={1}
          style={{ margin: 0, fontSize: "48px", fontWeight: 700 }}
        >
          {contest.title} - {task.order}
        </Title>
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

      <Text
        style={{
          display: "block",
          marginBottom: 40,
          fontSize: "18px",
          lineHeight: 1.6,
          textAlign: "center",
          maxWidth: "600px",
          margin: "0 auto 40px auto",
        }}
      >
        {contest.description}
      </Text>

      {/* Карточка с вопросом */}
      <Card
        className="contestCard taskPageCard"
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>Вопрос</span>
            <div style={{ display: "flex", gap: "8px" }}>
              {contest.contestType === "bomb" && !bombTimerVisible && (
                <Button
                  type="text"
                  size="small"
                  icon={<FireOutlined />}
                  onClick={() => {
                    startBombTimer();
                    setBombTimerVisible(true);
                  }}
                  style={{
                    color: "#fb923c",
                    border: "none",
                    padding: "4px 8px",
                    height: "auto",
                    fontSize: "12px",
                  }}
                >
                  Завести бомбу
                </Button>
              )}
              {!timerVisible && (
                <Button
                  type="text"
                  size="small"
                  icon={<ClockCircleOutlined />}
                  onClick={() => {
                    if (contest?.timeSec) {
                      initTimer(contest.timeSec);
                    } else {
                      setTimerVisible(true);
                    }
                  }}
                  style={{
                    color: "#EAEAFF",
                    border: "none",
                    padding: "4px 8px",
                    height: "auto",
                    fontSize: "12px",
                  }}
                >
                  Показать таймер
                </Button>
              )}
            </div>
          </div>
        }
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
              style={{
                width: "100%",
                marginBottom:
                  q.music.startTime !== undefined &&
                  q.music.endTime !== undefined
                    ? "16px"
                    : "0",
              }}
            />
            {q.music.startTime !== undefined &&
              q.music.endTime !== undefined && (
                <div style={{ textAlign: "center" }}>
                  <Button
                    type="primary"
                    size="small"
                    icon={<PlayCircleOutlined />}
                    onClick={playFragment}
                    loading={isPlayingFragment}
                    style={{
                      background: "linear-gradient(135deg, #722ed1, #9254de)",
                      borderColor: "#722ed1",
                      fontSize: "12px",
                    }}
                  >
                    {isPlayingFragment
                      ? "Воспроизводится..."
                      : "Слушать отрывок"}
                  </Button>
                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "11px",
                      color: "#B4B4CC",
                    }}
                  >
                    {q.music.startTime}с - {q.music.endTime}с
                  </div>
                </div>
              )}
          </div>
        )}
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
