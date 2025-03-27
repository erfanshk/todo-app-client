import { Button } from "@components/buttons";
import { Input } from "@components/inputs";
import { errorToast, successToast } from "@store/slices/toast/toast.slice";
import { storeTodo } from "@store/slices/todo/todo.actions";
import { TodosStoreRequest } from "@store/slices/todo/todo.api";
import { Todo } from "@store/slices/todo/todo.slice";
import { useAppDispatch } from "@store/store";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateTodoPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState<TodosStoreRequest>({
    title: "",
    description: "",
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
      await dispatch(storeTodo(form)).unwrap();
      navigate("/todos");
    } catch (error) {}
  };
  return (
    <div className="flex flex-col gap-4 items-stretch justify-center border border-gray-200 p-4 rounded-md bg-gray-200">
      <h1 className="text-xl font-semibold">Add a new Task</h1>
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
      <Button onClick={onSubmit} classList="bg-green-600">
        Add
      </Button>
    </div>
  );
};

export default CreateTodoPage;
