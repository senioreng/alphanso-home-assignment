import React, { useContext } from "react";
import {
  MdClose,
  MdOutlineCheckCircleOutline,
  MdOutlineCircle,
} from "react-icons/md";
import { FiltersContext, TaskContext } from "../context/MyContext";
import { TaskType } from "../types/types";

const Tasks = () => {
  const { tasks, setTasks, searchValue } = useContext(TaskContext);
  const { currentFilter } = useContext(FiltersContext);

  const handleDelete = (index: number) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleComplete = (index: number) => {
    setTasks((prev: TaskType[]) =>
      prev.map((task: TaskType, xIndex: number) => {
        return {
          ...task,
          isCompleted: index === xIndex ? !task.isCompleted : task.isCompleted,
        };
      })
    );
  };

  return (
    <div>
      {tasks
        .filter((task: TaskType) =>
          currentFilter === "all"
            ? true
            : task.isCompleted ===
              (currentFilter === "incomplete" ? false : true)
        )
        .filter((task: TaskType) =>
          task.title.toLowerCase().includes(searchValue.toLowerCase())
        )
        .map((task: TaskType, index: number) => (
          <div
            key={`task_${index}`}
            className={`flex justify-between px-3 py-2 border rounded-md mb-4 items-center ${
              task.isCompleted
                ? "border-green-500 bg-green-100"
                : "border-gray-400 bg-gray-100"
            }`}
            onClick={() => handleComplete(index)}
          >
            <div className="flex gap-2 items-center">
              {task.isCompleted ? (
                <MdOutlineCheckCircleOutline className="text-green-500" />
              ) : (
                <MdOutlineCircle className="text-gray-400" />
              )}
              <p>{task.title}</p>
            </div>
            <div onClick={() => handleDelete(index)}>
              <MdClose className="text-gray-400" />
            </div>
          </div>
        ))}
    </div>
  );
};

export default Tasks;
