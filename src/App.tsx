import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppsPage from "./pages/apps";
import NotFound from "./pages/not-found";
import TodoRoutes from "./pages/todos/routes";
import IndexTodoPage from "./pages/todos";
import CreateTodoPage from "./pages/todos/create";
import { Toast } from "@components/toast";
import EditTodoPage from "@pages/todos/edit";

function App() {
  return (
    <div className="w-full min-h-dvh bg-gray-100 flex flex-col ">
      <Router>
        <Routes>
          <Route index element={<AppsPage />} />
          <Route path="todos/*" element={<TodoRoutes />}>
            <Route index element={<IndexTodoPage />}></Route>
            <Route path={"create"} element={<CreateTodoPage />}></Route>
            <Route path={"edit/:id"} element={<EditTodoPage />}></Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Toast />
    </div>
  );
}

export default App;
