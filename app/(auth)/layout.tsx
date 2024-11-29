import Logo from "@/components/Logo";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center">
      <div className=" mr-4 z-10 ">
        <Logo />
      </div>
      <div className="mt-12 ">{children}</div>
      <div className="text-center mt-4 text-gray-600">
        Developed by{" "}
        <a
          href="https://nirajpahadi.com.np"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Niraj Pahadi
        </a>
      </div>
    </div>
  );
};

export default layout;
