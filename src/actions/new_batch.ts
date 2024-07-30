"use server";

import { RangeValue, FormState } from "@/entity/entity";
import { v4 as uuidv4 } from "uuid";
import { createNewBatch } from "@/api/serve_api";

export async function newBatchAction(
  dateRangeValue: RangeValue,
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const newBatchId: string = uuidv4();
  formData.append("batchId", newBatchId);
  formData.append("startDate", dateRangeValue.start || "");
  formData.append("endDate", dateRangeValue.end || "");
  try {
    await createNewBatch(formData);
  } catch (error) {
    return {
      message: "创建新批次失败",
      error: true,
    };
  }
  return {
    message: "成功创建批次",
    error: false,
  };
}
