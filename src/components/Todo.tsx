import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useMemo,
  useState,
} from "react";
import Tasks from "./Tasks";
import Filters from "./Filters";
import { TaskContext } from "../context/MyContext";
import { TaskType } from "../types/types";
import { FiSearch } from "react-icons/fi";

const debounce = (fn: Dispatch<SetStateAction<string>>, delay: number) => {
  let timerId: NodeJS.Timeout;

  return (arg: string) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => fn(arg), delay);
  };
};

const Todo = () => {
  const { tasks, setTasks, setSearchValue } = useContext(TaskContext);
  const [newTask, setNewTask] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [validationText, setValidationText] = useState<string>("");

  const handleAddTask = () => {
    if (newTask !== "") {
      const task: TaskType = {
        isCompleted: false,
        title: newTask,
      };

      setTasks([...tasks, task]);
      setNewTask("");
    } else {
      setValidationText("This field is required!");
    }
  };

  const debouncedHandler = useMemo(
    () => debounce(setSearchValue, 500),
    [setSearchValue]
  );

  const handleDebounce = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setSearch(target.value);
    debouncedHandler(target.value);
  };

  return (
    <div className="px-4 sm:px-32 py-20">
      <div className="mb-10 flex justify-between gap-4 md:gap-10 md:items-center max-md:flex-col">
        <p className="text-2xl font-medium">Today</p>
        <div className="w-full relative">
          <input
            placeholder="Search"
            className="border border-gray-400 rounded-full py-2 pl-10 w-full"
            value={search}
            onChange={handleDebounce}
          />
          <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-3">
            <FiSearch className="w-6 h-6 text-gray-400" />
          </div>
        </div>
        <Filters />
      </div>

      <Tasks />

      <div>
        <input
          placeholder="Type something"
          className="w-full rounded-md border border-gray-400 py-2 px-3"
          value={newTask}
          onChange={(e) => {
            setNewTask(e.target.value);
            setValidationText("");
          }}
        />
        <p className="text-red-400 text-sm mb-4">{validationText}</p>
        <button
          className="py-2 w-full bg-black text-white rounded-md"
          onClick={handleAddTask}
        >
          Add Task
        </button>
      </div>
    </div>
  );
};

export default Todo;
