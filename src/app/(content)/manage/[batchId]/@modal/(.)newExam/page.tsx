"use client";

import {
  DatePicker,
  Divider,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewExamModal() {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();
  const modalClose = () => {
    setIsOpen(false);
    setTimeout(() => router.back(), 800);
  };
  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full flex items-center justify-center z-40"
      }
    >
      <div
        className={`absolute top-0 left-0 w-full h-full bg-black opacity-50 ${isOpen ? "animate-modalBGIn" : "animate-modalBGOut"}`}
        onClick={modalClose}
      ></div>
      <Card
        className={`w-full max-w-md gap-2 p-6 animate-modalIn ${isOpen ? "animate-modalIn" : "animate-modalOut"}`}
      >
        <div className="text-xl font-medium mb-4">新增考试</div>
        <form className="flex flex-col gap-2">
          <Input label="考试科目" name="exam_name" isRequired />
          <Input label="考试地点" name="address" isRequired />
          <Select label="所在校区" name="campus" isRequired>
            <SelectItem key="兴庆校区">兴庆校区</SelectItem>
            <SelectItem key="雁塔校区">雁塔校区</SelectItem>
            <SelectItem key="创新港校区">创新港校区</SelectItem>
          </Select>
          <DatePicker label="考试日期" name="date" isRequired />
          <div className="flex gap-2">
            <TimeInput label="开始时间" isRequired />
            <TimeInput label="结束时间" isRequired />
          </div>
        </form>
        <Divider className="mt-2" />
        <div className="flex justify-end gap-2">
          <Button color="danger" variant="light" onPress={modalClose}>
            取消
          </Button>
          <Button type="submit" color="primary" onPress={modalClose}>
            提交
          </Button>
        </div>
      </Card>
    </div>
  );
}
