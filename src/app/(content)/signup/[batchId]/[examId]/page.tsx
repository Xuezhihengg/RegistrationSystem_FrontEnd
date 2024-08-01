"use client";

import {
  Checkbox,
  Input,
  Select,
  SelectItem,
  Chip,
  Avatar,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Button } from "@nextui-org/button";
import MainBody from "@/components/ui/main-body";
import {
  useBatchDetail,
  useExamDetail,
  useNameList,
  useProfile,
} from "@/api/client_api";
import { Skeleton } from "@nextui-org/skeleton";
import { findOutDisabledKeys } from "@/utils/utils";
import { newSignupAction } from "@/actions/new_signup";
import { host } from "@/api/request_path";
import { useFormState } from "react-dom";
import { useToast } from "@/utils/hooks";
import { router } from "next/client";
import { useRouter } from "next/navigation";

export default function NewSignUpPage({
  params,
}: {
  params: { batchId: string; examId: string };
}) {
  const { batchDetail, isLoading: batchDetailIsLoading } = useBatchDetail(
    params.batchId,
  );
  const { examDetail, isLoading: examDetailIsLoading } = useExamDetail(
    params.examId,
  );
  const { profile } = useProfile("P009");
  const { nameList, error, isLoading } = useNameList(params.examId);
  const disabledKeys: string[] = findOutDisabledKeys(nameList);

  const [isPromise, setIsPromise] = useState<boolean>(false);

  const [state, formAction] = useFormState(newSignupAction, {
    message: "",
    error: false,
  });
  useToast(state);

  const router = useRouter();
  const submitHandler = () => {
    if (state.error) return;
    setTimeout(() => {
      router.back();
    }, 800);
  };

  const detailSkeleton = (
    <Skeleton className="rounded-md h-6 w-16">
      <div></div>
    </Skeleton>
  );
  return (
    <MainBody>
      <div className="text-xl mb-6">研究生招生考试监考报名表</div>
      <form action={formAction} className="px-6">
        <div className="grid grid-cols-2 gap-4 items-center">
          <p>所选考试场次</p>
          <div className="flex justify-around">
            <div className="flex items-center">
              <p className="mr-4">批次名称:</p>
              {batchDetailIsLoading ? (
                detailSkeleton
              ) : (
                <Chip radius="sm" color="primary">
                  {batchDetail?.batchName}
                </Chip>
              )}
            </div>
            <div className="flex items-center">
              <p className="mr-4">考试名称:</p>
              {examDetailIsLoading ? (
                detailSkeleton
              ) : (
                <Chip radius="sm" color="secondary">
                  {examDetail?.examName}
                </Chip>
              )}
            </div>
          </div>
          <Input
            aria-label="personnelId"
            name="personnelId"
            type="text"
            className="hidden"
            value={profile?.personnelId}
          ></Input>
          <Input
            aria-label="examId"
            name="examId"
            type="text"
            className="hidden"
            value={params.examId}
          ></Input>
          <Input
            aria-label="invitedBy"
            name="invitedBy"
            type="text"
            className="hidden"
            value={"no_one"}
          ></Input>
          <label htmlFor="name">姓名</label>
          <Input type="text" isDisabled value={profile?.personnelName}></Input>
          <label htmlFor="unit">所在单位</label>
          <Input type="text" isDisabled value={profile?.unit}></Input>
          <label htmlFor="personnelId">工号</label>
          <Input type="text" isDisabled value={profile?.personnelId}></Input>
          <label htmlFor="edu_background">学历</label>
          <Input type="text" isDisabled value={profile?.eduBackground}></Input>
          <label htmlFor="phone">联系电话</label>
          <Input type="text" isDisabled value={profile?.phone}></Input>
          <label htmlFor="avatar">上传电子照片</label>
          <Avatar
            className="flex flex-col justify-center items-center p-4 w-40 h-40 bg-neutral-100"
            src={host + "/" + profile?.photo}
            radius="sm"
          />
          <label htmlFor="duty">职责</label>
          <Select
            name="duty"
            placeholder="请选择意向职责"
            isRequired
            required
            disabledKeys={disabledKeys}
          >
            <SelectItem key="主监考">主监考</SelectItem>
            <SelectItem key="副监考">副监考</SelectItem>
          </Select>
          <label htmlFor="promise">申请人承诺</label>
          <Checkbox
            required
            className="ml-1"
            isSelected={isPromise}
            onValueChange={setIsPromise}
            isRequired
          >
            本人自愿参加
          </Checkbox>
          <Button
            type="submit"
            color={
              disabledKeys.length === 2 || !isPromise ? "default" : "primary"
            }
            className="w-40 mt-2"
            isDisabled={disabledKeys.length === 2 || !isPromise}
            onPress={submitHandler}
          >
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
