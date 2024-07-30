"use server";

import { DateRange } from "@/entity/entity";
import { v4 as uuidv4 } from "uuid";
import { createNewBatch } from "@/api/serve_api";

export async function newBatch(
  dateRangeValue: DateRange,
  prevState: { message: string; error: boolean },
  formData: FormData,
) {
  const newBatchId: string = uuidv4();
  formData.append("batchId", newBatchId);
  formData.append("startDate", dateRangeValue.startDate);
  formData.append("endDate", dateRangeValue.endDate);
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
