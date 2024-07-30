import SideBar from "@/components/ui/side-bar";
import Header from "@/components/ui/header";
import { Toaster } from "react-hot-toast";

export default function ContentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex flex-col w-full">
        <Toaster />
        <Header />
        <div className="bg-[#E0E0E0] h-full">{children}</div>
      </div>
    </div>
  );
}
