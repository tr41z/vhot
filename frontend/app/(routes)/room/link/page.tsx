import { InputWithButton } from "@/components/link/input";
import React from "react";

const JoinFromLinkPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[75vh]">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col text-center md:flex-row">
          <p className="uppercase text-base md:text-lg mr-2 tracking-widest bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 bg-clip-text text-transparent">
            Join any room by just providing ID
          </p>
          <p className="uppercase text-base md:text-lg tracking-widest bg-gradient-to-b from-slate-200 via-slate-400 to-slate-600 bg-clip-text text-transparent">
            shared by the host
          </p>
        </div>
        <InputWithButton />
      </div>
    </div>
  );
};

export default JoinFromLinkPage;
