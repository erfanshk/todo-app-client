import { createAsyncThunk } from "@reduxjs/toolkit";
import TodoApi, {
  TodosDeleteRequest,
  TodosResponse,
  TodosShowRequest,
  TodosShowResponse,
  TodosStoreRequest,
  TodosStoreResponse,
  TodosUpdateRequest,
} from "./todo.api";

export const fetchTodos = createAsyncThunk(
  "todos/fetchAll",
  async (offset:number): Promise<TodosResponse> => await TodoApi.index(offset)
);
export const fetchTodo = createAsyncThunk(
  "todos/fetchSingle",
  async (data: TodosShowRequest): Promise<TodosShowResponse> =>
    await TodoApi.show(data)
);
export const storeTodo = createAsyncThunk(
  "todos/store",
  async (data: TodosStoreRequest, { dispatch }): Promise<TodosStoreResponse> =>
    await TodoApi.store(data)
);
export const updateTodo = createAsyncThunk(
  "todos/update",
  async (data: TodosUpdateRequest, { dispatch }): Promise<TodosStoreResponse> =>
    await TodoApi.update(data)
);
export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (data: TodosDeleteRequest, { dispatch }): Promise<TodosStoreResponse> =>
    await TodoApi.delete(data)
);
