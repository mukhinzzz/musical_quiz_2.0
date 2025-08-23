import { useEffect } from "react";
import { ContestGrid } from "../components/ContestGrid";
import { contestsData } from "../data/contests";
import { useGameStore } from "../store/game";

export const HomePage = () => {
  const setContests = useGameStore((s) => s.setContests);
  const hasContests = useGameStore((s) => s.contests.length > 0);
  useEffect(() => {
    if (!hasContests) setContests(contestsData);
  }, [setContests, hasContests]);
  return <ContestGrid />;
};
