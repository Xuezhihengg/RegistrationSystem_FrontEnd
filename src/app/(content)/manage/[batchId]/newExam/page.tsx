"use client";

import MainBody from "@/components/ui/main-body";
import { Input } from "@nextui-org/input";
import {
  DatePicker,
  DateValue,
  Divider,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { Button } from "@nextui-org/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TimeValue } from "@react-types/datepicker";
import { newExamAction } from "@/actions/new_exam";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { useToast } from "@/utils/hooks";

export default function NewExamPage({
  params,
}: {
  params: { batchId: string };
}) {
  const [newExamName, setNewExamName] = useState<string>("");
  const [newExamAddress, setNewExamAddress] = useState<string>("");
  const [newExamCampus, setNewExamCampus] = useState<string>("");
  const [newExamDate, setNewExamDate] = useState<DateValue | undefined>(
    undefined,
  );
  const [newExamStartTime, setNewExamStartTime] = useState<
    TimeValue | undefined
  >(undefined);
  const [newExamEndTime, setNewExamEndTime] = useState<TimeValue | undefined>(
    undefined,
  );

  const router = useRouter();

  const newExamActionWithTime = newExamAction.bind(null, {
    timeRangeValue: {
      start: newExamStartTime?.toString(),
      end: newExamEndTime?.toString(),
    },
    batchId: params.batchId,
  });

  const [state, formAction] = useFormState(newExamActionWithTime, {
    message: "",
    error: false,
  });

  const submitHandler = () => {
    if (state.error) return;
    setTimeout(() => {
      router.back();
    }, 800);
  };

  useToast(state);

  return (
    <MainBody>
      <div className="text-xl font-medium mb-4">新增考试</div>
      <form action={formAction}>
        <div className="grid grid-cols-3 gap-4 items-center">
          <label htmlFor="exam_name">考试科目</label>
          <Input
            aria-label="考试科目"
            size="lg"
            name="examName"
            placeholder="请输入考试科目..."
            value={newExamName}
            onValueChange={setNewExamName}
            isRequired
            required
            className="col-span-2"
          />
          <label htmlFor="address">考试地点</label>
          <Input
            aria-label="考试地点"
            size="lg"
            name="address"
            placeholder="请输入考试地点..."
            value={newExamAddress}
            onValueChange={setNewExamAddress}
            isRequired
            required
            className="col-span-2"
          />
          <label htmlFor="campus">校区</label>
          <Select
            aria-label="所在校区"
            size="lg"
            name="campus"
            selectedKeys={newExamCampus}
            onSelectionChange={(campus) => setNewExamCampus(campus as string)}
            isRequired
            required
            placeholder="请选择校区..."
            className="col-span-2"
          >
            <SelectItem key="兴庆校区">兴庆校区</SelectItem>
            <SelectItem key="雁塔校区">雁塔校区</SelectItem>
            <SelectItem key="创新港校区">创新港校区</SelectItem>
          </Select>
          <label htmlFor="date">考试日期</label>
          <DatePicker
            aria-label="考试日期"
            size="lg"
            name="date"
            isRequired
            value={newExamDate}
            onChange={setNewExamDate}
            className="col-span-2"
          />
          <label htmlFor="date">考试时间</label>
          <div className="flex gap-2 col-span-2">
            <TimeInput
              label="开始时间"
              aria-label="开始时间"
              value={newExamStartTime}
              onChange={setNewExamStartTime}
              hourCycle={24}
              isRequired
            />
            <TimeInput
              label="结束时间"
              aria-label="结束时间"
              value={newExamEndTime}
              onChange={setNewExamEndTime}
              hourCycle={24}
              isRequired
            />
          </div>
        </div>
        <Divider className="mt-4" />
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
            onPress={submitHandler}
          >
            提交
          </Button>
        </div>
      </form>
    </MainBody>
  );
}
