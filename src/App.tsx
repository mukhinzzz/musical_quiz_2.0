import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { ContestPage } from "./pages/ContestPage";
import { TaskPage } from "./pages/TaskPage";
import { MainLayout } from "./layout/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/contest/:id" element={<ContestPage />} />
          <Route
            path="/contest/:contestId/task/:taskId"
            element={<TaskPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
