import Logo from "@/components/Logo";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className=" mr-4 z-10 ">
        <Logo />
      </div>
      <div className="mt-12 ">{children}</div>
    </div>
  );
};

export default layout;
