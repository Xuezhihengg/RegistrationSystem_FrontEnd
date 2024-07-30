"use client";

import {
  DatePicker,
  DateValue,
  Divider,
  Select,
  SelectItem,
  TimeInput,
} from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "@/components/ui/modal";
import { newExamAction } from "@/actions/new_exam";
import { useFormState } from "react-dom";
import { TimeValue } from "@react-types/datepicker";
import toast from "react-hot-toast";

export default function NewExamModal({
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

  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();
  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setNewExamName("");
      setNewExamAddress("");
      setNewExamAddress("");
      setNewExamDate(undefined);
      setNewExamStartTime(undefined);
      setNewExamEndTime(undefined);
      router.back();
    }, 800);
  };

  const submitModal = () => {
    if (newExamName === "" || newExamAddress === "" || newExamCampus === "") {
      return;
    }
    closeModal();
  };

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

  useEffect(() => {
    if (state.message == "") return;
    if (state.error) {
      toast.error(state.message);
    } else {
      toast.success(state.message);
    }
  }, [state]);

  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <div className="text-xl font-medium mb-4">新增考试</div>
      <form action={formAction} className="flex flex-col gap-2">
        <Input
          label="考试科目"
          aria-label="考试科目"
          name="examName"
          value={newExamName}
          onValueChange={setNewExamName}
          isRequired
          required
        />
        <Input
          label="考试地点"
          aria-label="考试地点"
          name="address"
          value={newExamAddress}
          onValueChange={setNewExamAddress}
          isRequired
          required
        />
        <Select
          label="所在校区"
          aria-label="所在校区"
          name="campus"
          selectedKeys={newExamCampus}
          onSelectionChange={(campus) => setNewExamCampus(campus as string)}
          isRequired
          required
        >
          <SelectItem key="兴庆校区">兴庆校区</SelectItem>
          <SelectItem key="雁塔校区">雁塔校区</SelectItem>
          <SelectItem key="创新港校区">创新港校区</SelectItem>
        </Select>
        <DatePicker
          label="考试日期"
          aria-label="考试日期"
          name="date"
          value={newExamDate}
          onChange={setNewExamDate}
          isRequired
        />
        <div className="flex gap-2">
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
        <Divider className="mt-2" />
        <div className="flex justify-end gap-2">
          <Button color="danger" variant="light" onPress={closeModal}>
            取消
          </Button>
          <Button type="submit" color="primary" onPress={submitModal}>
            提交
          </Button>
        </div>
      </form>
    </Modal>
  );
}
