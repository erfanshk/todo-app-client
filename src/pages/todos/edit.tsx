import { Button } from "@components/buttons";
import { Input } from "@components/inputs";
import { Select } from "@components/select";
import { errorToast } from "@store/slices/toast/toast.slice";
import {
  fetchTodo,
  storeTodo,
  updateTodo,
} from "@store/slices/todo/todo.actions";
import {
  TodosStoreRequest,
  TodosUpdateRequest,
} from "@store/slices/todo/todo.api";
import { Todo } from "@store/slices/todo/todo.slice";
import { RootState, useAppDispatch, useAppSelector } from "@store/store";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditTodoPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const selectedTodo = useAppSelector((state: RootState) =>
    state.todo.todos.find((todo: Todo) => todo.id === Number(id))
  );
  const [form, setForm] = useState<TodosUpdateRequest>({
    id: 0,
    title: "",
    description: "",
    status: 0,
  });
  const onTitleChange = (event: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      title: event.target.value,
    }));
  };
  const onDescriptionChange = (event: any) => {
    setForm((prevForm) => ({
      ...prevForm,
      description: event.target.value,
    }));
  };
  const onSubmit = async () => {
    if (!form.title || !form.description) {
      dispatch(errorToast("Please input title and description"));
      return;
    }
    try {
      await dispatch(updateTodo(form)).unwrap();
      navigate("/todos");
    } catch (error) {}
  };
  const statusOptions = [
    { value: 0, text: "Pending" },
    { value: 5, text: "In Progress" },
    { value: 10, text: "Done" },
  ];
  const onStatusChange = (event: any) => {
    setForm(prevForm=>({
      ...prevForm,
      status: event.target.value
    }))
  };
  useEffect(() => {
    if (!id) return;
    if (selectedTodo) return;
    dispatch(fetchTodo({ id: Number(id) }));
  }, [id]);
  useEffect(() => {
    if (!selectedTodo) return;
    setForm({
      id: selectedTodo.id,
      title: selectedTodo.title,
      description: selectedTodo.description,
      status: selectedTodo.statusPure,
    });
  }, [selectedTodo]);
  return (
    <div className="flex flex-col gap-4 items-stretch justify-center border border-gray-200 p-4 rounded-md bg-gray-200">
      <h1 className="text-xl font-semibold">Update Task</h1>
      <Input
        type="text"
        label="Title"
        onChange={onTitleChange}
        value={form.title}
      />
      <Input
        type="text"
        label="Description"
        onChange={onDescriptionChange}
        value={form.description}
      />
      <Select options={statusOptions} selected={form.status} onChange={onStatusChange} />
    
      <Button onClick={onSubmit} classList="bg-green-600">
        Update
      </Button>
    </div>
  );
};

export default EditTodoPage;
