"use client";

import { ReactNode, useEffect, useState } from "react";
import { Card } from "@nextui-org/card";

export default function Modal({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: any;
}) {
  const [InOrOut, setInOrOut] = useState<boolean>(false);
  const [OpenOrClose, setOpenOrClose] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setInOrOut(false);
      setTimeout(() => setOpenOrClose(false), 800);
    } else {
      setInOrOut(true);
      setOpenOrClose(true);
    }
  }, [isOpen]);
  return (
    <div
      className={`fixed top-0 left-0 w-full h-full flex items-center justify-center z-40 ${OpenOrClose ? "" : "hidden"}`}
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black opacity-50 ${InOrOut ? "animate-modalBGIn" : "animate-modalBGOut"}`}
        onClick={onClose}
      ></div>
      <Card
        className={`w-full max-w-md gap-2 p-6 animate-modalIn ${InOrOut ? "animate-modalIn" : "animate-modalOut"}`}
      >
        {children}
      </Card>
    </div>
  );
}
