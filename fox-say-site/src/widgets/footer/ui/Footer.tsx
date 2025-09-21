import { CURRENT_YEAR } from "@/shared/lib/contsts";
import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="flex justify-center p-4 mt-auto border-t border-gray-200">
      <p>Copyright © {CURRENT_YEAR}. FoxSay</p>
    </footer>
  );
};
