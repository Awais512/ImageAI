import React from "react";

import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { cn } from "@/lib/utils";

interface ShapeToolProps {
  icon: LucideIcon | IconType;
  iconClassnane?: string;
  onClick: () => void;
}

const ShapeTool = ({ icon: Icon, iconClassnane, onClick }: ShapeToolProps) => {
  return (
    <button onClick={onClick} className="aspect-square border rounded-md p-5">
      <Icon className={cn("h-full w-full", iconClassnane)} />
    </button>
  );
};

export default ShapeTool;
