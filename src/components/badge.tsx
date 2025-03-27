type BadgeTypeEnum = "gray" | "info" | "success";
interface BadgeProps {
  type: BadgeTypeEnum;
  children: any;
}

export const Badge = (props: BadgeProps) => {
  const color = () => {
    switch (props.type) {
      case "gray":
        return "bg-gray-600";

      case "info":
        return "bg-blue-600";
      case "success":
        return "bg-green-600";
    }
  };
  return <div className={"p-2 text-xs text-white rounded-full " + color()}>{props.children}</div>;
};
