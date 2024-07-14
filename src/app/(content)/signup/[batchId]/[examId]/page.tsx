"use client";

import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  DatePicker,
} from "@nextui-org/react";
import React from "react";
import { Card } from "@nextui-org/card";
import { Button } from "@nextui-org/button";
import MainBody from "@/components/ui/main-body";

export default function NewSignUpPage({
  params,
}: {
  params: { batchId: string; examId: string };
}) {
  const [isMale, setIsMale] = React.useState<boolean>(true);

  return (
    <MainBody>
      <div className="text-xl mb-6">研究生招生考试监考报名表</div>
      <form action="" className="px-6">
        <div className="grid grid-cols-2 gap-4 items-center">
          <p>所选考试场次</p>
          <p>
            batchId:{params.batchId} && examId:{params.examId}
          </p>
          <label htmlFor="name">姓名</label>
          <Input
            name="name"
            type="text"
            required
            placeholder="请输入姓名"
          ></Input>
          <label htmlFor="unit">所在单位</label>
          <Input
            name="unit"
            type="text"
            required
            placeholder="请输入所在单位"
          ></Input>
          <label htmlFor="gender-male">性别</label>
          <div className="flex justify-around">
            <Checkbox
              name="gender-male"
              isSelected={isMale}
              onClick={() => setIsMale(!isMale)}
            >
              男
            </Checkbox>
            <Checkbox
              name="gender-female"
              isSelected={!isMale}
              onClick={() => setIsMale(!isMale)}
            >
              女
            </Checkbox>
          </div>
          <label htmlFor="personnelId">工号</label>
          <Input
            name="personnelId"
            type="text"
            required
            placeholder="请输入所在工号"
          ></Input>
          <label htmlFor="edu_background">学历</label>
          <Select name="edu_background" placeholder="请选择学历" isRequired>
            <SelectItem key="博士生">博士生</SelectItem>
            <SelectItem key="研究生">研究生</SelectItem>
            <SelectItem key="本科生">本科生</SelectItem>
          </Select>
          <label htmlFor="phone">联系电话</label>
          <Input
            name="phone"
            type="text"
            required
            placeholder="请输入联系电话"
          ></Input>
          <label htmlFor="birth">出生年月</label>
          <DatePicker name="birth"></DatePicker>
          <label htmlFor="avatar">上传电子照片</label>
          <Card
            shadow="none"
            className="flex flex-col justify-center items-center p-4 w-40 h-40 bg-neutral-100 hover:bg-neutral-200 hover:cursor-pointer "
          >
            <div>点击上传照片</div>
          </Card>
          <label htmlFor="campus">校区</label>
          <Select name="campus" placeholder="请选择意向校区" isRequired>
            <SelectItem key="兴庆校区">兴庆校区</SelectItem>
            <SelectItem key="雁塔校区">雁塔校区</SelectItem>
            <SelectItem key="创新港校区">创新港校区</SelectItem>
          </Select>
          <label htmlFor="promise">申请人承诺</label>
          <Checkbox required className="ml-1" name="promise">
            本人自愿参加
          </Checkbox>
          <Button type="submit" color="primary" className="w-40 mt-2">
            提交报名
          </Button>
          <p className="text-sm text-gray-500">
            本人自愿参加研究生入学考试监考工作，认真学习掌握工作纪律要求，严格遵守《国家教育考试考务安全保密工作规定》，切实遵守监考工作守则，按照考务工作安排，
            完成监考工作。
          </p>
        </div>
      </form>
    </MainBody>
  );
}
