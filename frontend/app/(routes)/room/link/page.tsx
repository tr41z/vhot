import { InputWithButton } from "@/components/link/input";
import React from "react";

const JoinFromIdPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[75vh]">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col text-center md:flex-row">
          <p className="uppercase text-base md:text-xl mr-2 tracking-widest bg-gradient-to-b from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
            Join any room by just providing ID
          </p>
          <p className="uppercase text-base md:text-xl tracking-widest bg-gradient-to-b from-gray-800 via-gray-600 to-gray-500 bg-clip-text text-transparent">
            shared by the host
          </p>
        </div>
        <InputWithButton />
      </div>
    </div>
  );
};

export default JoinFromIdPage;
