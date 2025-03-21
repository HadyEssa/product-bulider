import { ReactNode } from "react";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
children: ReactNode;
className?: string;
width: "w-full" | "w-fit"
}

const Buttons = ({ children, className, width="w-full" ,...rest}: IProps) => {
  return (
    <button className={`${className} p-2 rounded-md text-white  ${width}`} {...rest}>
      {children}
    </button>
  );
};

export default Buttons