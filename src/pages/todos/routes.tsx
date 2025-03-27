import { Outlet } from "react-router-dom";
import Header from "../../components/header";

const TodoRoutes = () => {

  return (
    <Header title="Task Management App">
      <Outlet />
    </Header>
  );
};

export default TodoRoutes;
