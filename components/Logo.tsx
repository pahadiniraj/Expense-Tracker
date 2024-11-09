import { GiPiggyBank } from "react-icons/gi";
import React from "react";

const Logo = () => {
  return (
    <a
      href="/"
      className="flex items-center gap-2  w-full justify-center  p-2 "
    >
      <GiPiggyBank className="h-11 w-11 text-amber-500 mb-2" />
      <p className="text-3xl font-bold leading-tight tracking-tighter text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text">
        BudgetTracker
      </p>
    </a>
  );
};

export default Logo;
