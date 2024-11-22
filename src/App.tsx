import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import { ButtonType, TaskType } from "./types/types";
import { FiltersContext, TaskContext } from "./context/MyContext";

const BUTTONS = [
  {
    value: "all",
    title: "All",
    isSelected: true,
  },
  {
    value: "completed",
    title: "Completed",
    isSelected: false,
  },
  {
    value: "incomplete",
    title: "Incomplete",
    isSelected: false,
  },
];

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [buttons, setButtons] = useState<ButtonType[]>(BUTTONS);
  const [currentFilter, setCurrentFilter] = useState<string>("all");
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <TaskContext.Provider
      value={{ tasks, setTasks, searchValue, setSearchValue }}
    >
      <FiltersContext.Provider
        value={{ buttons, setButtons, currentFilter, setCurrentFilter }}
      >
        <div className="flex justify-center">
          <div className="max-w-[1440px] w-full">
            <Todo />
          </div>
        </div>
      </FiltersContext.Provider>
    </TaskContext.Provider>
  );
}

export default App;
