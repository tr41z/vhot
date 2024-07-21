"use client";

import React from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export function InputWithButton() {
  const [inputValue, setInputValue] = React.useState("");

  const handleInputChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const url = `http://localhost:3000/event/${encodeURIComponent(inputValue)}`;
    window.location.href = url;
  };

  return (
    <form
      className="flex flex-col w-full max-w-sm md:max-w-4xl items-center mt-5 space-y-3"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Enter event link..."
        id="event_id"
        value={inputValue}
        onChange={handleInputChange}
        className="p-2 border rounded-lg shadow-sm h-9 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-label="Event Link Input"
      />
      <Button
        type="submit"
        className="w-full rounded-lg bg-slate-600 h-9 hover:bg-gray-400 hover:text-slate-900 transition ease-in-out duration-150 uppercase tracking-widest font-light"
        aria-label="Search Button"
      >
        Search
      </Button>
    </form>
  );
}
