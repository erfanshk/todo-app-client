import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "./buttons";

interface HeaderProps {
  title: string;
  children: any;
}

const Header = (props: any) => {

    const navigate = useNavigate()
    const goBack = () => navigate(-1)
    const location = useLocation()
  return (
    <div className="flex flex-col gap-8 items-center justify-center pt-8 p-4">
        <div className="flex flex-row justify-between w-full">
        {location.pathname !== '/' && (<Button onClick={goBack} classList="!bg-gray-200 !text-black px-4">{"Back"}</Button>)}
        <h1 className="text-3xl font-bold self-end">{props.title}</h1>
        </div>
      {props.children}
    </div>
  );
};

export default Header;
