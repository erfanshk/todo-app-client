import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@store/store";
import {
  deleteTodo,
  fetchTodo,
  fetchTodos,
  storeTodo,
  updateTodo,
} from "./todo.actions";
import { ApiResponse } from "@utils/api";
import {
  TodosResponse,
  TodosShowResponse,
  TodosStoreResponse,
} from "./todo.api";

export type TodoStatus = "Pending" | "In Progress" | "Done" | null;
export type TodoStatusEnum = 0 | 5 | 10;
interface Pagination {
  offset: number;
  limit: number;
}

export interface Todo {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  statusPure: TodoStatusEnum;
  done_at: string;
}

interface TodoState {
  selectedId: number | null;
  query: string | null;
  todos: Todo[];
  pagination: Pagination;
}

const initialState = {
  selectedId: null,
  query: null,
  todos: [],
  pagination: {
    offset: 0,
    limit: 10,
  },
} as TodoState;

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        fetchTodos.fulfilled,
        (state: TodoState, action: PayloadAction<TodosResponse>) => {
          state.todos = action.payload.data;
        }
      )
      .addCase(
        fetchTodo.fulfilled,
        (state: TodoState, action: PayloadAction<TodosShowResponse>) => {
          const todoIndex = state.todos.findIndex(
            (todo: Todo) => Number(todo.id) === Number(action.payload.data.id)
          );
          if (todoIndex === -1) {
            state.todos.push(action.payload.data);
          }
        }
      )
      .addCase(
        storeTodo.fulfilled,
        (state: TodoState, action: PayloadAction<TodosStoreResponse>) => {
          state.todos = [action.payload.data, ...state.todos];
        }
      )
      .addCase(
        updateTodo.fulfilled,
        (state: TodoState, action: PayloadAction<TodosStoreResponse>) => {
          const todoIndex = state.todos.findIndex(
            (todo: Todo) => Number(todo.id) === Number(action.payload.data.id)
          );
          if (todoIndex > -1) {
            state.todos[todoIndex] = action.payload.data;
          }
        }
      )
      .addCase(
        deleteTodo.fulfilled,
        (state: TodoState, action: PayloadAction<{ data: { id: number } }>) => {
          const todoIndex = state.todos.findIndex(
            (todo: Todo) => Number(todo.id) === Number(action.payload.data.id)
          );

          if (todoIndex > -1) {
            state.todos.splice(todoIndex, 1);
          }
        }
      );
  },
});

export const selectTodos = (state: RootState) => state.todo.todos;
export default todoSlice.reducer;
