"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem, User } from "@nextui-org/react";
import { path } from "@/utils/path";

export default function Header() {
  const pathname: string = usePathname();

  const personnelDetails = {
    name: "薛志恒",
    role: "教务科主任",
    avatar: "../../../public/avatar/argentina.png",
  };

  function getTitle(pathname: string) {
    switch (true) {
      case pathname.startsWith("/signup"):
        if (pathname === "/signup") {
          return (
            <Breadcrumbs>
              <BreadcrumbItem>监考报名</BreadcrumbItem>
            </Breadcrumbs>
          );
        } else {
          const segments: string[] = pathname.split("/");
          if (segments.length === 3) {
            // 匹配 /signup/* 格式的路径
            const batchId: string = segments[2];
            return (
              <Breadcrumbs>
                <BreadcrumbItem href={path.signup()}>监考报名</BreadcrumbItem>
                <BreadcrumbItem href={path.signupDetail(batchId)}>
                  监考批次详情
                </BreadcrumbItem>
              </Breadcrumbs>
            );
          } else if (segments.length === 4) {
            // 匹配 /signup/*/ * 格式的路径
            const batchId: string = segments[2];
            const examId: string = segments[3];
            return (
              <Breadcrumbs>
                <BreadcrumbItem href={path.signup()}>监考报名</BreadcrumbItem>
                <BreadcrumbItem href={path.signupDetail(batchId)}>
                  监考批次详情
                </BreadcrumbItem>
                <BreadcrumbItem href={path.newSignup(batchId, examId)}>
                  提交报名
                </BreadcrumbItem>
              </Breadcrumbs>
            );
          }
        }
        break;
      case pathname.startsWith("/approve"):
        if (pathname === "/approve") {
          return (
            <Breadcrumbs>
              <BreadcrumbItem>报名审批</BreadcrumbItem>
            </Breadcrumbs>
          );
        }
        return <div></div>;
    }
  }

  return (
    <div className="flex justify-between items-center animate-slideDown">
      <User
        className="justify-start pl-6 h-14 "
        name={personnelDetails.name}
        description={personnelDetails.role}
        avatarProps={{ src: personnelDetails.avatar }}
      ></User>
      <div className="mr-6">{getTitle(pathname)}</div>
    </div>
  );
}
