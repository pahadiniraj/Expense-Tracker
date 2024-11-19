import { GiPiggyBank } from "react-icons/gi";
import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2  w-full justify-center  p-2 "
    >
      <GiPiggyBank className="h-11 w-11 text-amber-500 mb-2" />
      <p className="text-3xl font-bold leading-tight tracking-tighter text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text">
        BudgetTracker
      </p>
    </Link>
  );
};

export const LogoMobile = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2  w-full justify-center  p-2 "
    >
      <p className="text-3xl font-bold leading-tight tracking-tighter text-transparent bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text">
        BudgetTracker
      </p>
    </Link>
  );
};

export default Logo;
