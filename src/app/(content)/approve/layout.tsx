import React from "react";

export default function ApproveTableLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {modal}
      {children}
    </>
  );
}
