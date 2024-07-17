"use client";

import MainBody from "@/components/ui/main-body";
import { Input } from "@nextui-org/input";
import {
  DatePicker,
  Divider,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";

export default function NewExamPage() {
  return (
    <MainBody>
      <div className="text-xl font-medium mb-4">新增考试</div>
      <form className="grid grid-cols-3 gap-4 items-center">
        <label htmlFor="exam_name">考试科目</label>
        <Input
          size="lg"
          name="exam_name"
          placeholder="请输入考试科目..."
          isRequired
          className="col-span-2"
        />
        <label htmlFor="address">考试地点</label>
        <Input
          size="lg"
          name="address"
          placeholder="请输入考试地点..."
          isRequired
          className="col-span-2"
        />
        <label htmlFor="campus">校区</label>
        <Select
          size="lg"
          name="campus"
          isRequired
          placeholder="请选择校区..."
          className="col-span-2"
        >
          <SelectItem key="兴庆校区">兴庆校区</SelectItem>
          <SelectItem key="雁塔校区">雁塔校区</SelectItem>
          <SelectItem key="创新港校区">创新港校区</SelectItem>
        </Select>
        <label htmlFor="date">考试日期</label>
        <DatePicker size="lg" name="date" isRequired className="col-span-2" />
        <label htmlFor="date">考试时间</label>
        <div className="flex gap-2 col-span-2">
          <TimeInput label="开始时间" isRequired />
          <TimeInput label="结束时间" isRequired />
        </div>
      </form>
      <div className="mt-4 flex justify-end gap-4">
        <Button color="danger" variant="light" className="w-36">
          取消
        </Button>
        <Button type="submit" color="primary" className="w-36">
          提交
        </Button>
      </div>
    </MainBody>
  );
}
