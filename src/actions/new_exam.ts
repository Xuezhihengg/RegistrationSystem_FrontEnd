"use server";

import { FormState, RangeValue } from "@/entity/entity";
import { v4 as uuidv4 } from "uuid";
import * as v from "valibot";
import { NewExamSchema } from "@/entity/form-schema";
import { createNewExam } from "@/api/serve_api";
import { revalidateTag } from "next/cache";

export async function newExamAction(
  bindData: { timeRangeValue: RangeValue; batchId: string },
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const newExamId: string = uuidv4();
  const newExamDate = formData.get("date");
  const newExam = {
    examId: newExamId,
    batchId: bindData.batchId,
    examName: formData.get("examName"),
    address: formData.get("address"),
    campus: formData.get("campus"),
    startTime:
      newExamDate && bindData.timeRangeValue.start
        ? newExamDate + "T" + bindData.timeRangeValue.start
        : undefined,
    endTime:
      newExamDate && bindData.timeRangeValue.end
        ? newExamDate + "T" + bindData.timeRangeValue.end
        : undefined,
  };
  const result = v.safeParse(NewExamSchema, newExam);
  if (!result.success) {
    return {
      message: "表单校验不通过",
      error: true,
    };
  }
  try {
    await createNewExam(result.output);
  } catch (error) {
    return {
      message: "创建新考试失败",
      error: true,
    };
  }

  revalidateTag("examList");
  return {
    message: "成功创建新考试",
    error: false,
  };
}
