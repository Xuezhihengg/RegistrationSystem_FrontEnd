import { ReactNode } from "react";

export default function MainBody({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col bg-white m-3 rounded-2xl p-6  animate-slideUp">
      {children}
    </div>
  );
}
