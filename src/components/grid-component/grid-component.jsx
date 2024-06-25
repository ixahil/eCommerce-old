import { cn } from "@/utils/cn";
import { SubTitle, Title } from "../ui";

const GridComponent = ({ icon, heading, content, className }) => {
  return (
    <div className={cn("p-4 xl:p-8 flex flex-col gap-6", className)}>
      <div className="flex gap-2 sm:gap-6 items-center">
        <div className="p-1 rounded-full bg-black ">{icon}</div>
        <Title>{heading}</Title>
      </div>
      <SubTitle className={"font-semibold"}>{content}</SubTitle>
    </div>
  );
};

export default GridComponent;
