import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { clearToast } from "@store/slices/toast/toast.slice";
import { Button } from "@components/buttons";
import { useAppSelector } from "@store/store";
import { selectToast } from "@store/slices/toast/toast.slice";

export const Toast = () => {
  const dispatch = useDispatch();
  const { message, type, timer } = useAppSelector(selectToast);
  const [color, setColor] = useState<string>("");

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    switch (type) {
      case "success":
        setColor("bg-green-600");
        break;
      case "error":
        setColor("bg-red-600");
        break;
    }
  }, [type]);
  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      dispatch(clearToast());
    }, timer);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [message]);

  if (message === null) return;

  return (
    <div
      className={
        "fixed top-0 md:top-10 mx-auto inset-x-0 w-full sm:w-3/4 md:w-1/2 max-w-[480px]  flex items-center justify-center z-[60]"
      }
    >
      <div
        className={
          "flex items-center justify-between text-white m-0 md:m-4 md:rounded-lg  max-w-[482px] w-full " +
          color
        }
      >
        <p className={"p-[18px] "}>{message}</p>
        <Button
          classList={"p-[18px] bg-gray-100 rounded-none rounded-r-md"}
          onClick={() => dispatch(clearToast())}
        >
          Close
        </Button>
      </div>
    </div>
  );
};
