"use client";

import MainBody from "@/components/ui/main-body";
import { Card } from "@nextui-org/card";
import { RiErrorWarningFill } from "react-icons/ri";
import { Checkbox, Divider, Select, SelectItem } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function InvitePage() {
  const [selfFinish, setSelfFinish] = useState<boolean>(true);
  const router = useRouter();
  return (
    <MainBody>
      <div className="text-xl font-medium mb-4">邀约</div>
      <Card radius="sm" className="bg-blue-300 p-2 mx-3">
        <div className="flex items-center px-4 gap-4">
          <RiErrorWarningFill />
          <p className="text-red-950">通过邀约渠道，不受监考批次时间限制！</p>
        </div>
      </Card>
      <form className="mt-4 p-4">
        <div className=" grid grid-cols-3 gap-8 items-center">
          <label htmlFor="batchId">监考批次</label>
          <Select
            className="col-span-2"
            name="batchId"
            placeholder="请选择监考批次"
            isRequired
          >
            <SelectItem key="1">batch_1</SelectItem>
            <SelectItem key="2">batch_2</SelectItem>
            <SelectItem key="3">batch_3</SelectItem>
          </Select>
          <label htmlFor="methods">选择方式</label>
          <div className="col-span-2 flex justify-around">
            <Checkbox
              name="self-finish"
              isSelected={selfFinish}
              onClick={() => setSelfFinish(!selfFinish)}
            >
              自走流程
            </Checkbox>
            <Checkbox
              name="help-finish"
              isSelected={!selfFinish}
              onClick={() => setSelfFinish(!selfFinish)}
            >
              帮助报名
            </Checkbox>
          </div>
          <Input
            size="lg"
            className="col-span-3"
            placeholder="请输入姓名/工号/学号模糊查询"
          ></Input>
        </div>
      </form>
      <Divider className="mt-2" />
      <div className="mt-4 flex justify-end gap-4">
        <Button
          color="danger"
          variant="light"
          className="w-36"
          onPress={router.back}
        >
          取消
        </Button>
        <Button
          type="submit"
          color="primary"
          className="w-36"
          onPress={router.back}
        >
          提交
        </Button>
      </div>
    </MainBody>
  );
}
