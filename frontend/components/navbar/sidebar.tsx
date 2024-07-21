import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import StyledLink from "./styledLink";
import { Rajdhani } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Rajdhani({
  weight: "500",
  subsets: ["latin"],
});

const MobileSidebar = () => {
  return (
    <div className="absolute left-5 top-5">
      <Sheet>
        <SheetTrigger>
          <Button variant="ghost" size="icon" className="md:hidden text-black">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side={"top"}>
          <SheetHeader>
            <SheetTitle>
              <div
                className={cn(
                  "flex w-full justify-center",
                  font.className
                )}
              >
                Menu
              </div>
            </SheetTitle>
            <SheetDescription>
              <div className="flex flex-wrap w-full justify-center text-black">
                <StyledLink href="/dashboard" text="Dashboard" />
                <StyledLink href="/about" text="About Us" />
                <StyledLink href="/room/link" text="Join Room" />
                <StyledLink href="/room/create" text="Create Room" />
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
