import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@store/store";
import {
  selectTodos,
  Todo,
  TodoStatusEnum,
} from "@store/slices/todo/todo.slice";
import { Button } from "@components/buttons";
import { useNavigate } from "react-router-dom";
import {
  deleteTodo,
  fetchTodos,
  updateTodo,
} from "@store/slices/todo/todo.actions";
import { Badge } from "@components/badge";
const IndexTodoPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const todos = useAppSelector(selectTodos);
  const [offset, setOffset] = useState<number>(0);
  const navigateToCreateTodo = () => navigate("create");

  const onEdit = (todoId: number) => navigate(`edit/${todoId}`);
  const onUpdate = (todo: Todo, status: TodoStatusEnum) => {
    try {
      dispatch(
        updateTodo({
          id: todo.id,
          title: todo.title,
          description: todo.description,
          status,
        })
      );
    } catch (e) {}
  };
  const onDelete = (todoId: number) => {
    try {
      dispatch(
        deleteTodo({
          id: todoId,
        })
      );
    } catch (e) {}
  };
  const onNextPage = () => {
    setOffset(offset + 10);
  };
  const onPreviousPage = () => {
    if (offset - 10 < 0) return;
    setOffset(offset - 10);
  };
  useEffect(() => {
    dispatch(fetchTodos(offset));
  }, [offset]);
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex flex-row self-end">
        <Button onClick={navigateToCreateTodo} classList="bg-green-600">
          Add a new Task
        </Button>
      </div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Done At</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.length === 0 && (
            <tr>
              <td colSpan={6}>
                <p className="p-4">You have not added a task yet!</p>
              </td>
            </tr>
          )}
          {todos.map((todo: Todo) => (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>
                {todo.status === "Pending" && (
                  <Badge type="gray">{todo.status}</Badge>
                )}
                {todo.status === "In Progress" && (
                  <Badge type="info">{todo.status}</Badge>
                )}
                {todo.status === "Done" && (
                  <Badge type="success">{todo.status}</Badge>
                )}
              </td>
              <td>{todo.done_at}</td>
              <td>
                <div className="flex flex-row items-center justify-center gap-2">
                  <Button
                    classList="!bg-gray-600 !hover:bg-gray-800"
                    onClick={() => onUpdate(todo, 0)}
                  >
                    Set as Pending
                  </Button>
                  <Button
                    classList="!bg-blue-600 !hover:bg-blue-800"
                    onClick={() => onUpdate(todo, 5)}
                  >
                    Set as In Progress
                  </Button>
                  <Button
                    classList="bg-green-600 hover:bg-green-800"
                    onClick={() => onUpdate(todo, 10)}
                  >
                    Set as Done
                  </Button>
                  <Button
                    classList="bg-blue-600 hover:bg-blue-800"
                    onClick={() => onEdit(todo.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    classList="bg-red-600 hover:bg-red-800"
                    onClick={() => onDelete(todo.id)}
                  >
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-row items-center justify-center gap-2">
        <Button disabled={offset === 0 ? true : false} onClick={onPreviousPage}>Previos Page</Button>
        <Button disabled={todos.length < 10}  onClick={onNextPage}>
          Next Page
        </Button>
      </div>
    </div>
  );
};

export default IndexTodoPage;
