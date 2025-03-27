import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons";
import Header from "../components/header";

const AppsPage = () => {
  const navigate = useNavigate();
  const navigateToTodoApp = () => navigate("todos");
  return (
    <Header title="Your Apps">
      <div className="flex flex-row gap-2">
        <Button onClick={navigateToTodoApp} classList={"p-8"}>
          Task Management
        </Button>
      </div>
    </Header>
  );
};

export default AppsPage;
