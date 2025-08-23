import { useEffect } from "react";
import { ContestGrid } from "../components/ContestGrid";
import { contestsData } from "../data/contests";
import { useGameStore } from "../store/game";

export const HomePage = () => {
  const setContests = useGameStore((s) => s.setContests);
  useEffect(() => {
    setContests(contestsData);
  }, [setContests]);
  return <ContestGrid />;
};
