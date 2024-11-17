import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-screen w-full flex-col">
      <Navbar />
      <div className="relative">{children}</div>
    </div>
  );
};

export default layout;
