import Link from "next/link";
import { path } from "@/utils/path";
import React from "react";

export default function SideBarItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="py-5 bg-primary hover:bg-blue-700 text-white text-center "
    >
      {children}
    </Link>
  );
}
