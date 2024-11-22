import { createContext, Dispatch, SetStateAction } from "react";
import { ButtonType, TaskType } from "../types/types";

export const TaskContext = createContext<{
  tasks: TaskType[];
  setTasks: Dispatch<SetStateAction<TaskType[]>>;
  searchValue: string;
  setSearchValue: Dispatch<SetStateAction<string>>;
}>({
  tasks: [],
  setTasks: () => {},
  searchValue: "",
  setSearchValue: () => {},
});

export const FiltersContext = createContext<{
  buttons: ButtonType[];
  setButtons: Dispatch<SetStateAction<ButtonType[]>>;
  currentFilter: string;
  setCurrentFilter: Dispatch<SetStateAction<string>>;
}>({
  buttons: [],
  setButtons: () => {},
  currentFilter: "",
  setCurrentFilter: () => {},
});
