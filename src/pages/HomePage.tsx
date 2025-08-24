import { useEffect, useState } from "react";
import { Typography } from "antd";
import { ContestGrid } from "../components/ContestGrid";
import { contestsData } from "../data/contests";
import { useGameStore } from "../store/game";

const { Title } = Typography;

export const HomePage = () => {
  const setContests = useGameStore((s) => s.setContests);
  const hasContests = useGameStore((s) => s.contests.length > 0);
  const presentationMode = useGameStore((s) => s.presentationMode);
  const presentationStep = useGameStore((s) => s.presentationStep);
  const nextPresentationStep = useGameStore((s) => s.nextPresentationStep);
  const endPresentation = useGameStore((s) => s.endPresentation);

  const [currentText, setCurrentText] = useState("");
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    if (!hasContests) setContests(contestsData);
  }, [setContests, hasContests]);

  // Автоматическое переключение текстов презентации
  useEffect(() => {
    if (!presentationMode) return;

    let timeout: number;

    if (presentationStep === "title") {
      setCurrentText("Музыкальный квиз");
      setShowText(true);
      // Для первого шага не запускаем автоматический переход - ждем клика
    } else if (presentationStep === "round") {
      setCurrentText("Раунд 3");
      setShowText(true);
      timeout = setTimeout(() => {
        setShowText(false);
        setTimeout(() => nextPresentationStep(), 800);
      }, 4000);
    } else if (presentationStep === "intro") {
      setCurrentText("Представляем конкурсы...");
      setShowText(true);
      timeout = setTimeout(() => {
        setShowText(false);
        setTimeout(() => nextPresentationStep(), 800);
      }, 4000);
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [presentationMode, presentationStep, nextPresentationStep]);

  // Обработчик клика для презентации
  const handleClick = () => {
    if (presentationMode) {
      if (presentationStep === "title") {
        setShowText(false);
        setTimeout(() => nextPresentationStep(), 800);
      } else if (presentationStep === "finished") {
        endPresentation();
      }
    }
  };

  // Если режим презентации активен
  if (presentationMode) {
    return (
      <div
        className="page-section"
        onClick={handleClick}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: presentationStep === "finished" ? "pointer" : "default",
        }}
      >
        {/* Анимированные текстовые блоки */}
        {(presentationStep === "title" ||
          presentationStep === "round" ||
          presentationStep === "intro") && (
          <div
            style={{
              textAlign: "center",
              opacity: showText ? 1 : 0,
              transition: "opacity 0.8s ease-in-out",
            }}
          >
            <Title
              level={1}
              style={{
                margin: 0,
                fontSize: "64px",
                fontWeight: 700,
                color: "#EAEAFF",
              }}
            >
              {currentText}
            </Title>
            {presentationStep === "title" && (
              <div
                style={{
                  marginTop: 30,
                  color: "#B4B4CC",
                  fontSize: "16px",
                  opacity: showText ? 0.8 : 0,
                  transition: "opacity 0.8s ease-in-out 1s",
                }}
              >
                Нажмите в любом месте для продолжения
              </div>
            )}
          </div>
        )}

        {/* Показ конкурсов */}
        {presentationStep === "contests" && (
          <ContestGrid presentationMode={true} />
        )}

        {/* Финальное сообщение */}
        {presentationStep === "finished" && (
          <div style={{ textAlign: "center" }}>
            <Title
              level={1}
              style={{
                margin: 0,
                fontSize: "72px",
                fontWeight: 700,
                color: "#4ADE80",
                textShadow: "0 0 20px rgba(74, 222, 128, 0.5)",
              }}
            >
              ВПЕРЕД!
            </Title>
            <div style={{ marginTop: 20, color: "#B4B4CC", fontSize: "18px" }}>
              Нажмите, чтобы продолжить
            </div>
          </div>
        )}
      </div>
    );
  }

  // Обычный режим (не презентация)
  return (
    <div className="page-section">
      {/* Заголовок */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 40,
        }}
      >
        <Title
          level={1}
          style={{ margin: 0, fontSize: "48px", fontWeight: 700 }}
        >
          Выберите конкурс
        </Title>
      </div>

      <ContestGrid />
    </div>
  );
};
