import { Loader } from "lucide-react";
import React from "react";

const loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Loader className="animate-spin text-blue-500" size={40} />
    </div>
  );
};

export default loading;
