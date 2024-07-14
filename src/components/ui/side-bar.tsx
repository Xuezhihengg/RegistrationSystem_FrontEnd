import Link from "next/link";
import { path } from "@/utils/path";
import { Card } from "@nextui-org/card";
import SideBarItem from "@/components/ui/side-bar-item";

export default function SideBar() {
  return (
    <div className="flex flex-col w-48 min-h-[100vh] bg-primary  ">
      <Link
        className="text-xl text-center text-white my-4"
        href={path.signup()}
      >
        研究生监考报名系统
      </Link>
      <SideBarItem href={path.signup()}>监考报名</SideBarItem>
      <SideBarItem href={path.approve()}>报名审批</SideBarItem>
      <SideBarItem href={path.manage()}>监考管理</SideBarItem>
    </div>
  );
}
