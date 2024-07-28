"use client";

import { usePathname } from "next/navigation";
import { Breadcrumbs, BreadcrumbItem, User } from "@nextui-org/react";
import { path } from "@/utils/path";
import avatar from "@/../public/avatar/argentina.png";

export default function Header() {
  const pathname: string = usePathname();

  const personnelDetails = {
    name: "薛志恒",
    role: "教务科主任",
    avatar: avatar,
  };

  function getTitle(pathname: string) {
    switch (true) {
      //>>>>>> /signup <<<<<<
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
            // 匹配 /signup/[batchId] 格式的路径
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
            // 匹配 /signup/[batchId]/[examId] 格式的路径
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
      //>>>>>> /signup <<<<<<

      //>>>>>> /approve <<<<<<
      case pathname.startsWith("/approve"):
        if (pathname === "/approve") {
          return (
            <Breadcrumbs>
              <BreadcrumbItem href={path.approve()}>报名审批</BreadcrumbItem>
            </Breadcrumbs>
          );
        }
        break;
      //>>>>>> /approve <<<<<<

      //>>>>>> /manage <<<<<<
      case pathname.startsWith("/manage"):
        if (pathname === "/manage") {
          return (
            <Breadcrumbs>
              <BreadcrumbItem>监考管理</BreadcrumbItem>
            </Breadcrumbs>
          );
        } else {
          const segments: string[] = pathname.split("/");
          if (segments.length === 3) {
            // 匹配 /manage/[batchId] 格式的路径
            const batchId: string = segments[2];
            return (
              <Breadcrumbs>
                <BreadcrumbItem href={path.manage()}>监考管理</BreadcrumbItem>
                <BreadcrumbItem href={path.manageDetail(batchId)}>
                  监考批次详情
                </BreadcrumbItem>
              </Breadcrumbs>
            );
          } else {
            const batchId: string = segments[2];
            const content: string = segments[3];
            // 匹配 /manage/[batchId]/nameList/[examId] 格式的路径
            if (content === "nameList") {
              const examId: string = segments[4];
              return (
                <Breadcrumbs>
                  <BreadcrumbItem href={path.manage()}>监考管理</BreadcrumbItem>
                  <BreadcrumbItem href={path.manageDetail(batchId)}>
                    监考批次详情
                  </BreadcrumbItem>
                  <BreadcrumbItem href={path.showNameList(batchId, examId)}>
                    报名名单
                  </BreadcrumbItem>
                </Breadcrumbs>
              );
              // 匹配 /manage/[batchId]/newExam 格式的路径
            } else if (content === "newExam") {
              return (
                <Breadcrumbs>
                  <BreadcrumbItem href={path.manage()}>监考管理</BreadcrumbItem>
                  <BreadcrumbItem href={path.manageDetail(batchId)}>
                    监考批次详情
                  </BreadcrumbItem>
                  <BreadcrumbItem href={path.newExam(batchId)}>
                    新增考试
                  </BreadcrumbItem>
                </Breadcrumbs>
              );
            }
          }
        }
      //>>>>>> /manage <<<<<<
      case pathname.startsWith("/invite"):
        if (pathname === "/invite") {
          return (
            <Breadcrumbs>
              <BreadcrumbItem>邀请报名</BreadcrumbItem>
            </Breadcrumbs>
          );
        }
        break;
    }
  }

  return (
    <div className="flex justify-between items-center animate-slideDown">
      <User
        className="justify-start pl-6 h-14 "
        name={personnelDetails.name}
        description={personnelDetails.role}
        avatarProps={avatar}
      ></User>
      <div className="mr-6">{getTitle(pathname)}</div>
    </div>
  );
}
